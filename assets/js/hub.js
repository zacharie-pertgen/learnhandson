// The Quillfish home screen: the world map and island list, built from data/islands.json.
// A new island is one new entry in that file.
import { esc } from "./text.js";

const ROOT = document.documentElement.dataset.root || "./";
const STATUS = { open: ["ready", "Open"], soon: ["soon", "Coming next"], fog: ["", "In the fog"] };

const data = await fetch(ROOT + "data/islands.json").then((r) => r.json());

document.querySelector("#map").innerHTML = mapSVG(data.islands);
document.querySelector("#islands").innerHTML = data.islands.map((i) => {
  const [cls, label] = STATUS[i.status];
  const body = `<span class="pill ${cls}">${label}</span>
    <h3 style="margin-top:10px">${esc(i.name)}</h3>
    <p class="meta">${esc(i.program)}${i.status !== "fog" ? ` · ${i.words.map(esc).join(" · ")}` : ""}</p>
    <p style="margin:0">${esc(i.pitch)}</p>`;
  return i.status === "open"
    ? `<a class="card stretch" href="${ROOT + i.path}">${body}</a>`
    : `<div class="card ${i.status === "fog" ? "is-fogged" : ""}">${body}</div>`;
}).join("");

function mapSVG(islands) {
  const shape = (x, y, s) => `M${x - 30 * s},${y + 8 * s} L${x - 12 * s},${y - 14 * s} L${x + 16 * s},${y - 12 * s} L${x + 32 * s},${y + 6 * s} L${x + 6 * s},${y + 16 * s} Z`;
  const isles = islands.map((i) => {
    const { x, y } = i.map;
    const lit = i.status === "open";
    return `<g>
      ${i.status === "fog" ? "" : `<circle cx="${x}" cy="${y}" r="58" fill="url(#clear)"/>`}
      <path d="${shape(x, y, 1)}" fill="${lit ? "#6f9a5b" : i.status === "soon" ? "#7d8f74" : "#5d6876"}"/>
      ${lit ? `<rect x="${x - 3}" y="${y - 30}" width="6" height="18" fill="#efe9dc"/><circle cx="${x}" cy="${y - 32}" r="4" fill="#ffd27a"/>` : ""}
      ${i.status === "fog" ? `<ellipse cx="${x}" cy="${y}" rx="64" ry="30" fill="#aab4c2" opacity="0.75"/>` : ""}
      <text x="${x}" y="${y + 36}" text-anchor="middle" font-size="13" font-weight="600" fill="#e8edf4">${esc(i.name)}</text>
      <text x="${x}" y="${y + 51}" text-anchor="middle" font-size="11" fill="#b5c2d3">${esc(i.program)}</text></g>`;
  }).join("");
  return `<svg viewBox="0 0 720 320" role="img" aria-label="Map of the Lantern Isles. Lit islands are open, fogged ones are coming later.">
    <defs>
      <radialGradient id="clear"><stop offset="0" stop-color="#2a5878"/><stop offset="1" stop-color="#2a5878" stop-opacity="0"/></radialGradient>
      <radialGradient id="squall"><stop offset="0" stop-color="#3a4250"/><stop offset="1" stop-color="#3a4250" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="720" height="320" fill="#183a55"/>
    <rect width="720" height="320" fill="#8e9bad" opacity="0.28"/>
    <circle cx="400" cy="160" r="70" fill="url(#squall)"/>
    <text x="400" y="164" text-anchor="middle" font-size="11" fill="#c9d2de" opacity="0.8">Grey Squall</text>
    <path d="M160,120 C220,170 280,190 330,190" stroke="#e8d7b0" stroke-width="2" stroke-dasharray="4 6" fill="none" opacity="0.7"/>
    ${isles}
  </svg>`;
}
