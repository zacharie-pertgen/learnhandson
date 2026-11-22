// Guided companion: a lesson page used next to real Blender.
// Reads one tier's lesson file plus that version's keymap and manual links.
// Everything version-specific lives in data/<program>/<version>/, so a new
// Blender version is a new data folder, not new code.

import { rich, renderKeys, esc, isMac } from "./text.js";
import { checkAnswer, normalize } from "./flags.js";
import { load, save } from "./store.js";

const main = document.querySelector("main[data-lessons]");
const ROOT = document.documentElement.dataset.root || "./";
const url = (p) => ROOT + p;

const LANTERN_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M12 3v2M7 8h10l-1 10H8L7 8z"/><path d="M8 5h8l1 3H7z"/><path d="M12 11c1.2 1.4 1.2 3 0 4.2-1.2-1.2-1.2-2.8 0-4.2z" fill="currentColor"/><path d="M9 21h6"/></svg>`;
const TIER_NAMES = ["Nudge", "Specific", "Answer"];
const STUCK_AFTER_WRONG = 3;

let data, keymap, links, versionInfo;
let state, profile;
let ctx;

const stateKey = () => `${data.program}/${data.version}/${data.tier}`;
const lessonState = (id) => (state.lessons[id] ??= { found: false, hints: 0, wrong: 0, tasks: [], followupDone: false, confirmOpen: false });
const persist = () => save(stateKey(), state);

async function boot() {
  const [d, k, l, v] = await Promise.all(
    [main.dataset.lessons, main.dataset.keymap, main.dataset.links, main.dataset.versions].map((p) => fetch(url(p)).then((r) => {
      if (!r.ok) throw new Error(`${p}: ${r.status}`);
      return r.json();
    })),
  );
  data = d; keymap = k; links = l;
  versionInfo = v.versions.find((x) => x.id === data.version);
  state = load(stateKey(), { lessons: {}, startedAt: Date.now(), lit: false });
  profile = load("profile", { pointer: "mouse", numpad: true });
  ctx = { keymap, links, profile };
  window.addEventListener("hashchange", render);
  render();
}

function currentId() {
  const id = location.hash.slice(1);
  if (id === "finale" || data.lessons.some((l) => l.id === id)) return id;
  return "l0";
}

function go(id) {
  if (location.hash.slice(1) === id) render();
  else location.hash = id;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ------------------------------------------------------------------ render --
function render() {
  ctx.profile = profile;
  const id = currentId();
  main.innerHTML = `
    <div class="lesson-layout">
      <aside class="lesson-nav" aria-label="Lessons">${navHTML(id)}</aside>
      <article class="lesson" id="lesson" tabindex="-1">${id === "finale" ? finaleHTML() : lessonHTML(data.lessons.find((l) => l.id === id))}</article>
    </div>`;
  wireNav();
  if (id === "finale") wireFinale();
  else wireLesson(data.lessons.find((l) => l.id === id));
  document.title = `${id === "finale" ? "Light the beacon" : data.lessons.find((l) => l.id === id).title} · ${data.island}`;
}

function navHTML(activeId) {
  const items = data.lessons.map((l) => {
    const s = lessonState(l.id);
    const letter = l.check.type === "yesno" ? (s.found ? "✓" : "0") : s.found ? revealedLetter(l) : l.number;
    const star = s.found && s.hints === 0 && l.check.type !== "yesno" ? `<span class="star" title="Clear Sky: no hints">★<span class="sr-only"> Clear Sky</span></span>` : "";
    return `<li><button type="button" data-go="${l.id}" ${l.id === activeId ? 'aria-current="step"' : ""}>
      <span class="slot ${s.found ? "found" : ""}" aria-hidden="true">${esc(letter)}</span>
      <span class="nav-title">${esc(l.title)}<small>${l.minutes} min${s.found ? " · done" : ""}</small></span>${star}</button></li>`;
  }).join("");
  const lit = state.lit;
  return `
    <p class="eyebrow">${esc(data.island)} · ${esc(data.title)}</p>
    <ol>${items}
      <li><button type="button" data-go="finale" ${activeId === "finale" ? 'aria-current="step"' : ""}>
        <span class="slot ${lit ? "found" : ""}" aria-hidden="true">${lit ? "★" : "?"}</span>
        <span class="nav-title">Light the beacon<small>Finale</small></span></button></li>
    </ol>
    <div class="settings-box">
      <fieldset>
        <legend>I navigate with</legend>
        <label><input type="radio" name="pointer" value="mouse" ${profile.pointer === "mouse" ? "checked" : ""}> A mouse (middle button)</label>
        <label><input type="radio" name="pointer" value="trackpad" ${profile.pointer === "trackpad" ? "checked" : ""}> A trackpad</label>
      </fieldset>
      <label><input type="checkbox" name="numpad" ${profile.numpad ? "" : "checked"}> No number pad (Emulate Numpad on)</label>
      <p class="muted" style="margin:8px 0 0">Keys shown for Blender ${esc(data.version)}${versionInfo ? ` LTS, tested with ${esc(versionInfo.testedWith)}` : ""}. <a href="${url(`blender/${data.version}/`)}">Change version</a></p>
    </div>`;
}

function wireNav() {
  main.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => go(b.dataset.go)));
  main.querySelectorAll('input[name="pointer"]').forEach((r) => r.addEventListener("change", () => {
    profile.pointer = r.value; save("profile", profile); render();
  }));
  main.querySelector('input[name="numpad"]').addEventListener("change", (e) => {
    profile.numpad = !e.target.checked; save("profile", profile); render();
  });
}

function revealedLetter(lesson) {
  // Letters are never stored in plain text, except Lesson 6, which the app reveals itself.
  const s = lessonState(lesson.id);
  return s.letter || lesson.check.revealLetter || "✓";
}

function lessonHTML(lesson) {
  const s = lessonState(lesson.id);
  const r = (t) => rich(t, ctx);
  const n = data.lessons.indexOf(lesson);
  const prev = data.lessons[n - 1];
  const next = data.lessons[n + 1];
  const starter = lesson.starter
    ? `<a class="btn primary" href="${url(data.starterBase + lesson.starter)}" download>Download starter scene</a>
       <p>Open it in Blender ${esc(data.version)} (File &gt; Open).${lesson.starterNote ? " " + r(lesson.starterNote) : ""}</p>`
    : `<p>${r(lesson.starterNote || "")}</p>`;

  return `
    <header class="lesson-head">
      <p class="eyebrow">Lesson ${lesson.number}${lesson.check.type === "flag" || lesson.check.type === "count" ? " · find the flag" : ""}</p>
      <h1>${esc(lesson.title)}</h1>
      <p class="meta">About ${lesson.minutes} minutes · ${esc(lesson.goal)}</p>
    </header>

    <blockquote class="story">“${esc(lesson.story)}”<cite>${esc(data.narrator)}</cite></blockquote>

    <section class="card section starter" aria-label="Starter scene">${starter}</section>

    <section class="section">
      <h2>What you'll learn</h2>
      <ul class="concepts">${lesson.concepts.map((c) => `<li>${r(c)}</li>`).join("")}</ul>
    </section>

    <section class="card section">
      <h2>Keys for this lesson</h2>
      <table class="keytable"><tbody>
        ${lesson.keys.map((id) => {
          const a = keymap.actions[id];
          return `<tr><th scope="row">${esc(a.label)}</th><td>${renderKeys(a, profile)}${a.note ? `<span class="note">${esc(a.note)}</span>` : ""}</td></tr>`;
        }).join("")}
      </tbody></table>
      ${isMac ? `<p class="muted" style="margin:10px 0 0">On a Mac, Blender uses Ctrl (not Cmd) for these.</p>` : ""}
    </section>

    ${lesson.build ? buildHTML(lesson) : tasksHTML(lesson)}

    ${lesson.id === "l0" ? deviceHTML() : ""}

    <section class="card section check" aria-labelledby="check-h">${checkHTML(lesson)}</section>

    <section class="card section hints" aria-labelledby="hints-h">${hintsHTML(lesson)}</section>

    <section class="section">
      <h2>Official manual (Blender ${esc(data.version)})</h2>
      <div class="manual-links">${lesson.manual.map((id) => {
        const l = links.links[id];
        return `<a href="${links.base}${l.path}" target="_blank" rel="noopener">${esc(l.title)} ↗</a>`;
      }).join("")}</div>
    </section>

    <nav class="lesson-footer" aria-label="Lesson navigation">
      ${prev ? `<button class="btn ghost" data-go="${prev.id}">← ${esc(prev.title)}</button>` : "<span></span>"}
      ${next ? `<button class="btn ${s.found ? "primary" : ""}" data-go="${next.id}">${esc(next.title)} →</button>` : `<button class="btn ${s.found ? "primary" : ""}" data-go="finale">Light the beacon →</button>`}
    </nav>`;
}

function tasksHTML(lesson) {
  const s = lessonState(lesson.id);
  return `<section class="section">
    <h2>Do it in Blender</h2>
    <ol class="tasks">${lesson.tasks.map((t, i) => `
      <li><input type="checkbox" id="t-${lesson.id}-${i}" data-task="${i}" ${s.tasks[i] ? "checked" : ""}>
      <label for="t-${lesson.id}-${i}"><span>${rich(t, ctx)}</span></label></li>`).join("")}
    </ol></section>`;
}

function buildHTML(lesson) {
  const s = lessonState(lesson.id);
  s.shown ??= [];
  return `<section class="section">
    <h2>Build it from memory</h2>
    <ol class="build-steps">${lesson.build.map((b, i) => `
      <li><span><strong>${i + 1}.</strong> ${rich(b.goal, ctx)}</span>
      ${s.shown[i] ? `<span class="show">${rich(b.show, ctx)}</span>` : `<button class="btn small ghost" data-show="${i}">Show me</button>`}</li>`).join("")}
    </ol></section>`;
}

function deviceHTML() {
  const opt = (pointer, numpad, label) => {
    const on = profile.pointer === pointer && profile.numpad === numpad;
    return `<button type="button" class="btn ${on ? "primary" : ""}" data-device="${pointer},${numpad}" aria-pressed="${on}">${label}</button>`;
  };
  return `<section class="card section">
    <h2>What are you using?</h2>
    <p>This picks the right keys for every lesson. You can change it any time in the sidebar.</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      ${opt("mouse", true, "Mouse + full keyboard")}
      ${opt("mouse", false, "Mouse, no number pad")}
      ${opt("trackpad", false, "Laptop trackpad")}
    </div></section>`;
}

function checkHTML(lesson) {
  const s = lessonState(lesson.id);
  const c = lesson.check;
  const r = (t) => rich(t, ctx);
  if (c.type === "yesno") {
    return `<h2 id="check-h">Check</h2>
      <p>${r(c.question)}</p>
      ${s.found ? `<div class="feedback show ok" role="status">${esc(lesson.reward)} stamped. Welcome to Signal Island.</div>` : `
      <form onsubmit="return false"><button type="button" class="btn primary" data-yes>Yes, I see it</button><button type="button" class="btn" data-no>No</button></form>
      <div class="feedback" role="status" aria-live="polite"></div>`}`;
  }
  const found = s.found;
  const head = `<h2 id="check-h">${c.type === "count" ? "Count the faces" : "Find the flag"}</h2>`;
  if (found) {
    return `${head}
      <div class="flag-reveal"><span class="big" aria-hidden="true">${esc(revealedLetter(lesson))}</span>
      <div><strong>Flag ${lesson.number} found: ${esc(revealedLetter(lesson))}.</strong><br>
      <span class="muted">${s.hints === 0 ? "★ Clear Sky, no hints used." : `Found with ${s.hints} hint${s.hints === 1 ? "" : "s"}.`}</span></div></div>
      ${c.followup ? followupHTML(lesson) : ""}`;
  }
  return `${head}
    <p>${r(c.prompt)}</p>
    <form data-flag>
      <label class="sr-only" for="ans">${c.type === "count" ? "Face count" : "Flag letter"}</label>
      <input id="ans" type="text" ${c.type === "count" ? 'inputmode="numeric" class="wide" maxlength="5"' : 'maxlength="2" autocapitalize="characters"'} autocomplete="off" spellcheck="false" required>
      <button class="btn primary" type="submit">${c.type === "count" ? "Check count" : "Check flag"}</button>
    </form>
    <div class="feedback" role="status" aria-live="polite"></div>`;
}

function followupHTML(lesson) {
  const f = lesson.check.followup;
  const s = lessonState(lesson.id);
  if (s.followupDone) return `<div class="feedback show ok" role="status" style="margin-top:16px">${esc(f.success)}</div>`;
  return `<div style="margin-top:18px">
    <p>${rich(f.question, ctx)}${f.optional ? ' <span class="pill">optional</span>' : ""}</p>
    <form data-followup>
      <label class="sr-only" for="fu">Your answer</label>
      <input id="fu" type="text" inputmode="decimal" class="wide" maxlength="6" autocomplete="off" required>
      <button class="btn" type="submit">Check</button>
    </form>
    <div class="feedback" data-fu-feedback role="status" aria-live="polite"></div></div>`;
}

function hintsHTML(lesson) {
  const s = lessonState(lesson.id);
  const shown = lesson.hints.slice(0, s.hints);
  const more = s.hints < lesson.hints.length;
  const stuck = s.wrong >= STUCK_AFTER_WRONG && more && !s.found;
  return `<h2 id="hints-h">Need a hint?</h2>
    <p class="muted" style="margin:0 0 10px">Hints are optional and never cost you the flag. Lessons finished without one earn a ★ Clear Sky star.</p>
    ${shown.length ? `<ol class="hint-list">${shown.map((h, i) => `<li><span class="tier">Hint ${i + 1} · ${TIER_NAMES[i]}</span>${rich(h, ctx)}</li>`).join("")}</ol>` : ""}
    ${s.confirmOpen ? `
      <div class="hint-confirm" role="alertdialog" aria-labelledby="hc-q">
        <p id="hc-q"><strong>Light the lantern for a hint?</strong> This lesson won't earn its Clear Sky star.</p>
        <button class="btn primary small" data-hint-confirm>Light it</button>
        <button class="btn small" data-hint-cancel>Not yet</button>
      </div>` : more ? `<p style="margin:12px 0 0"><button class="btn lantern-btn ${stuck ? "pulse" : ""}" data-hint>${LANTERN_ICON} ${s.hints === 0 ? "Light the lantern" : `Next hint (${s.hints + 1} of ${lesson.hints.length})`}</button></p>
      ${stuck ? `<p class="stuck-note">The lantern's here if you want it.</p>` : ""}` : `<p class="muted" style="margin:12px 0 0">That's every hint for this lesson.</p>`}`;
}

// ------------------------------------------------------------------- wire --
function wireLesson(lesson) {
  const s = lessonState(lesson.id);
  const $ = (sel) => main.querySelector(sel);

  main.querySelectorAll("[data-task]").forEach((cb) => cb.addEventListener("change", () => {
    s.tasks[+cb.dataset.task] = cb.checked; persist();
  }));
  main.querySelectorAll("[data-show]").forEach((b) => b.addEventListener("click", () => {
    s.shown[+b.dataset.show] = true; persist(); rerenderKeepScroll();
  }));
  main.querySelectorAll("[data-device]").forEach((b) => b.addEventListener("click", () => {
    const [pointer, numpad] = b.dataset.device.split(",");
    profile.pointer = pointer; profile.numpad = numpad === "true"; save("profile", profile); rerenderKeepScroll();
  }));

  // hints: the first one asks once, later ones open straight away
  $("[data-hint]")?.addEventListener("click", () => {
    if (s.hints === 0) s.confirmOpen = true;
    else s.hints++;
    persist(); rerenderKeepScroll("#hints-h");
  });
  $("[data-hint-confirm]")?.addEventListener("click", () => {
    s.confirmOpen = false; s.hints = 1; persist(); rerenderKeepScroll("#hints-h");
  });
  $("[data-hint-cancel]")?.addEventListener("click", () => {
    s.confirmOpen = false; persist(); rerenderKeepScroll("#hints-h");
  });

  const fb = $(".check .feedback");
  const say = (el, html, ok) => { el.className = `feedback show ${ok ? "ok" : "no"}`; el.innerHTML = html; };

  $("[data-yes]")?.addEventListener("click", () => { s.found = true; persist(); rerenderKeepScroll("#check-h"); });
  $("[data-no]")?.addEventListener("click", () => say(fb, rich(lesson.check.no, ctx), false));

  $("form[data-flag]")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = $("#ans");
    const raw = input.value;
    const c = lesson.check;
    if (!raw.trim()) return;
    if (await checkAnswer(c, raw)) {
      s.found = true;
      if (c.type === "flag") s.letter = normalize(raw, c.aliases);
      persist();
      rerenderKeepScroll("#check-h");
      return;
    }
    s.wrong++;
    persist();
    const key = normalize(raw, c.aliases);
    const reply = rich((c.wrong && c.wrong[key]) || c.wrongDefault, ctx);
    if (s.wrong === STUCK_AFTER_WRONG) {
      rerenderKeepScroll(); // shows the pulsing lantern offer (never opens a hint by itself)
      say(main.querySelector(".check .feedback"), reply, false);
      main.querySelector("#ans").value = raw;
      main.querySelector("#ans").select();
      return;
    }
    say(fb, reply, false);
    input.select();
  });

  $("form[data-followup]")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = lesson.check.followup;
    const raw = $("#fu").value.trim().replace("°", "");
    const n = Number(raw);
    const out = $("[data-fu-feedback]");
    if (raw === "" || Number.isNaN(n)) return say(out, "Type a number.", false);
    if (f.expect.includes(n) || (f.acceptAbove && n > f.acceptAbove)) {
      s.followupDone = true; persist(); rerenderKeepScroll("#check-h");
      return;
    }
    say(out, esc(f.replies?.[String(n)] || f.replyDefault), false);
  });
}

function rerenderKeepScroll(focusSel) {
  const y = window.scrollY;
  render();
  window.scrollTo(0, y);
  if (focusSel) main.querySelector(focusSel)?.focus?.({ preventScroll: true });
}

// ----------------------------------------------------------------- finale --
function finaleHTML() {
  const flagLessons = data.lessons.filter((l) => l.check.type !== "yesno");
  const slots = flagLessons.map((l) => {
    const s = lessonState(l.id);
    return `<span class="slot ${s.found ? "found" : ""}" title="Lesson ${l.number}">${s.found ? esc(revealedLetter(l)) : "?"}</span>`;
  }).join("");
  const foundCount = flagLessons.filter((l) => lessonState(l.id).found).length;
  const lit = state.lit;
  return `
    <header class="lesson-head">
      <p class="eyebrow">Finale</p>
      <h1>Light the beacon</h1>
      <p class="meta">${esc(data.finale.prompt)}</p>
    </header>
    <div class="finale-scene ${lit ? "lit" : ""}" id="scene">${sceneSVG()}</div>
    ${lit ? litHTML(flagLessons) : `
    <section class="card section check">
      <h2 id="check-h">Your flags</h2>
      <div class="word-slots" aria-label="${foundCount} of 6 flags found">${slots}</div>
      <p class="muted">${foundCount} of 6 flags found.${foundCount < 6 ? " You can try the word any time, but missing flags make it a guess." : ""}</p>
      <form data-word>
        <label class="sr-only" for="word">The beacon's word</label>
        <input id="word" type="text" class="wide" maxlength="${data.word.length}" autocomplete="off" spellcheck="false" required>
        <button class="btn primary" type="submit">Light it</button>
      </form>
      <div class="feedback" role="status" aria-live="polite"></div>
    </section>`}`;
}

function litHTML(flagLessons) {
  const hints = data.lessons.reduce((n, l) => n + lessonState(l.id).hints, 0);
  const stars = flagLessons.filter((l) => lessonState(l.id).found && lessonState(l.id).hints === 0).length;
  const mins = Math.max(1, Math.round(((state.litAt || Date.now()) - state.startedAt) / 60000));
  return `
    <section class="card section">
      ${data.finale.story.map((p) => `<p>${esc(p)}</p>`).join("")}
      <p><strong>Signal Island Ember</strong> earned. The Fog has cleared from the shore.</p>
      <div class="summary">
        <div class="stat"><b>${hints}</b><span>hints used</span></div>
        <div class="stat"><b>${stars} / 6</b><span>★ Clear Sky stars</span></div>
        <div class="stat"><b>${mins} min</b><span>this session</span></div>
      </div>
      <p style="margin-top:16px">${esc(data.finale.share)}</p>
      <p class="muted">Next on Signal Island: <strong>The Lantern's Reach</strong> (Intermediate, word KEEPER) is still in the fog. Coming soon.</p>
      <a class="btn" href="${url("")}">Back to the Quillfish</a>
    </section>`;
}

function wireFinale() {
  main.querySelector("form[data-word]")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const word = main.querySelector("#word").value;
    if (await checkAnswer(data.word, word)) {
      state.lit = true; state.litAt = Date.now(); persist();
      render();
      requestAnimationFrame(() => main.querySelector("#scene")?.classList.add("lit"));
      return;
    }
    const fb = main.querySelector(".check .feedback");
    fb.className = "feedback show no";
    fb.textContent = data.finale.wrongDefault;
  });
}

function sceneSVG() {
  // Original low-poly scene: island, lighthouse, beam, fog, and the Quillfish passing by.
  return `<svg viewBox="0 0 600 300" role="img" aria-label="${state.lit ? "The beacon is lit and the fog is clearing" : "Signal Island in the fog, beacon dark"}">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1626"/><stop offset="1" stop-color="#1d3550"/></linearGradient>
      <linearGradient id="beamG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffe2a3" stop-opacity="0.9"/><stop offset="1" stop-color="#ffe2a3" stop-opacity="0"/></linearGradient>
      <radialGradient id="glow"><stop offset="0" stop-color="#ffd27a" stop-opacity="0.7"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="600" height="300" fill="url(#sky)"/>
    <g fill="#cfd8e6" opacity="0.7"><circle cx="60" cy="40" r="1.2"/><circle cx="140" cy="70" r="1"/><circle cx="480" cy="34" r="1.4"/><circle cx="540" cy="90" r="1"/><circle cx="380" cy="56" r="1"/><circle cx="230" cy="30" r="1.1"/></g>
    <rect y="210" width="600" height="90" fill="#123049"/>
    <g class="beam"><polygon points="300,128 600,92 600,166" fill="url(#beamG)"/><polygon points="300,128 0,96 0,160" fill="url(#beamG)" transform="scale(1,1)" opacity="0.55"/><circle cx="300" cy="128" r="60" fill="url(#glow)"/></g>
    <polygon points="200,214 250,186 350,182 410,214" fill="#3c5a3a"/>
    <polygon points="190,216 410,216 380,238 220,238" fill="#5b4a36"/>
    <polygon points="288,190 312,190 307,136 293,136" fill="#e9e6df"/>
    <rect x="290" y="160" width="20" height="7" fill="#b8423a"/>
    <rect x="292" y="120" width="16" height="16" class="lamp"/>
    <polygon points="288,120 312,120 300,106" fill="#b8423a"/>
    <g class="ship"><polygon points="20,232 96,232 86,246 30,246" fill="#6b4a2e"/><rect x="56" y="196" width="3" height="36" fill="#d9cdb4"/><polygon points="59,198 59,228 86,226" fill="#efe6d2"/><polygon points="56,202 56,228 34,226" fill="#e2d6bd"/></g>
    <g class="fog" fill="#9aa7b8">
      <ellipse cx="120" cy="200" rx="170" ry="42" opacity="0.55"/><ellipse cx="460" cy="190" rx="190" ry="48" opacity="0.55"/>
      <ellipse cx="300" cy="150" rx="230" ry="60" opacity="0.5"/><ellipse cx="300" cy="236" rx="320" ry="40" opacity="0.6"/>
    </g>
  </svg>`;
}

boot().catch((err) => {
  console.error(err);
  main.innerHTML = `<div class="wrap"><div class="notice">The lesson couldn't load (${esc(err.message)}). If you opened this file straight from your computer, run a small local server instead: <code>python3 -m http.server</code> in the repo folder, then visit <code>http://localhost:8000</code>.</div></div>`;
});
