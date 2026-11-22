// Checks every manual URL in data/*/*/links.json still loads. Run in CI weekly, or before a release.
// Usage: node scripts/check-links.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
let bad = 0, total = 0;
for (const program of readdirSync("data").filter((d) => existsSync(`data/${d}/versions.json`))) {
  for (const v of JSON.parse(readFileSync(`data/${program}/versions.json`, "utf8")).versions) {
    const links = JSON.parse(readFileSync(`data/${program}/${v.id}/links.json`, "utf8"));
    for (const [id, l] of Object.entries(links.links)) {
      const url = links.base + l.path;
      total++;
      try {
        const res = await fetch(url, { method: "GET", redirect: "follow" });
        if (!res.ok) { bad++; console.log("BROKEN", res.status, id, url); }
        else console.log("ok", id);
      } catch (e) { bad++; console.log("ERROR", id, url, e.message); }
    }
  }
}
console.log(`${total - bad}/${total} links ok`);
process.exit(bad ? 1 : 0);
