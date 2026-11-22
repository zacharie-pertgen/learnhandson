// "I'm using Blender ___" picker. Each version lives at blender/<id>/.
// Unknown versions go to the nearest version we have, with a notice.
import { esc } from "./text.js";

const ROOT = document.documentElement.dataset.root || "./";
const box = document.querySelector("[data-version-picker]");
const program = box.dataset.program;
const here = box.dataset.current;
const info = await fetch(`${ROOT}data/${program}/versions.json`).then((r) => r.json());

const num = (v) => {
  const [a, b = 0] = String(v).trim().split(".").map((x) => parseInt(x, 10));
  return Number.isNaN(a) ? NaN : a * 100 + (Number.isNaN(b) ? 0 : b);
};

export function nearest(typed) {
  const n = num(typed);
  if (Number.isNaN(n)) return null;
  return info.versions.reduce((best, v) => (Math.abs(num(v.id) - n) < Math.abs(num(best.id) - n) ? v : best));
}

box.innerHTML = `
  <label for="ver" style="font-weight:600">I'm using Blender</label>
  <select id="ver">${info.versions.map((v) => `<option value="${v.id}" ${v.id === here ? "selected" : ""}>${esc(v.label)}</option>`).join("")}<option value="other">Another version…</option></select>
  <span id="other" hidden><label class="sr-only" for="other-in">Your Blender version</label><input id="other-in" class="plain" type="text" placeholder="e.g. 5.3" size="6"> <button class="btn small" id="other-go">Go</button></span>
  <div id="ver-note" role="status" aria-live="polite"></div>`;

const sel = box.querySelector("#ver");
const note = box.querySelector("#ver-note");
sel.addEventListener("change", () => {
  box.querySelector("#other").hidden = sel.value !== "other";
  if (sel.value !== "other" && sel.value !== here) location.href = `${ROOT}${program}/${sel.value}/`;
});
box.querySelector("#other-go").addEventListener("click", () => {
  const typed = box.querySelector("#other-in").value;
  const v = nearest(typed);
  if (!v) { note.innerHTML = `<p class="notice">Type a version number like 5.3 (Help &gt; About Blender shows it).</p>`; return; }
  const exact = num(v.id) === num(typed);
  note.innerHTML = exact ? "" : `<p class="notice">We don't have lessons pinned to Blender ${esc(typed)} yet, so we're using <strong>${esc(v.label)}</strong>, the closest. The basic keys rarely change between versions.</p>`;
  if (v.id !== here) setTimeout(() => (location.href = `${ROOT}${program}/${v.id}/`), exact ? 0 : 2200);
});
