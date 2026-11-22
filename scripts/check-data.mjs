// Data checks that run in CI (no network needed):
// - every key id a lesson uses exists in that version's keymap
// - every manual link id exists in that version's links file
// - every starter scene a lesson points at exists
// - every flag hash is solvable (catches typos in hashes) and the JS fallback hash matches Node's
// Usage: node scripts/check-data.mjs
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { _test } from "../assets/js/flags.js";

let fails = 0;
const fail = (m) => { fails++; console.log("FAIL", m); };
const json = (p) => JSON.parse(readFileSync(p, "utf8"));
const sha = (s) => createHash("sha256").update(s).digest("hex");

if (_test.sha256Fallback(new TextEncoder().encode("learnhandson|x|Y")) !== sha("learnhandson|x|Y")) fail("fallback SHA-256 differs from Node");

for (const program of readdirSync("data").filter((d) => existsSync(`data/${d}/versions.json`))) {
  const versions = json(`data/${program}/versions.json`);
  for (const v of versions.versions) {
    const dir = `data/${program}/${v.id}`;
    if (!existsSync(`${program}/${v.id}/index.html`)) fail(`${program}/${v.id}/index.html missing`);
    const keymap = json(`${dir}/keymap.json`);
    const links = json(`${dir}/links.json`);
    for (const file of readdirSync(`${dir}/lessons`)) {
      const tier = json(`${dir}/lessons/${file}`);
      const where = `${dir}/lessons/${file}`;
      const text = JSON.stringify(tier);
      for (const [, id] of text.matchAll(/\{k:([\w.]+)\}/g)) if (!keymap.actions[id]) fail(`${where}: unknown key id ${id}`);
      for (const [, id] of text.matchAll(/\{m:([\w-]+)\}/g)) if (!links.links[id]) fail(`${where}: unknown link id ${id}`);
      const solvable = (salt, hash) => {
        const tries = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
        for (let n = 0; n < 2000; n++) tries.push(String(n));
        return tries.some((t) => sha(`learnhandson|${salt}|${t}`) === hash);
      };
      for (const l of tier.lessons) {
        for (const id of l.keys) if (!keymap.actions[id]) fail(`${where} ${l.id}: unknown key id ${id}`);
        for (const id of l.manual) if (!links.links[id]) fail(`${where} ${l.id}: unknown link id ${id}`);
        if (l.starter && !existsSync(tier.starterBase + l.starter)) fail(`${where} ${l.id}: starter ${l.starter} missing`);
        if (l.hints.length !== 3) fail(`${where} ${l.id}: needs exactly 3 hints`);
        if (l.check.hash && !solvable(l.check.salt, l.check.hash)) fail(`${where} ${l.id}: flag hash doesn't match any 1-char or number answer`);
      }
      for (const url of Object.values(links.links)) if (!(links.base + url.path).includes(`/${v.id}/`)) fail(`${url.path} not pinned to ${v.id}`);
      console.log(`ok ${where}: ${tier.lessons.length} lessons`);
    }
  }
}
console.log(fails ? `${fails} problem(s)` : "All data checks passed");
process.exit(fails ? 1 : 0);
