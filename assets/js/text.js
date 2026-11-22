// Turns lesson text into HTML.
//   **bold**        -> <strong>
//   [[R]]           -> a literal key cap
//   {k:action.id}   -> that action's keys from the version's keymap, for the reader's device
//   {m:link-id}     -> a link to that page of the pinned manual version

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const isMac = /Mac|iPhone|iPad/.test(globalThis.navigator?.platform || globalThis.navigator?.userAgent || "");

function keyCap(k) {
  const label = isMac && k === "Alt" ? "Option" : k;
  return `<kbd>${esc(label)}</kbd>`;
}

// "Ctrl + Shift + Z" -> three key caps. Phrases like "Overlays menu > Statistics" stay plain text.
export function combo(str) {
  if (/[>:]/.test(str) || /^(Drag|Header|View menu|Select >)/.test(str)) return `<span>${esc(str)}</span>`;
  return str.split(" + ").map(keyCap).join('<span class="plus">+</span>');
}

export function keysFor(action, profile) {
  if (!action) return [];
  let keys = action.keys;
  if (profile.pointer === "trackpad" && action.trackpad) keys = action.trackpad;
  if (!profile.numpad && action.nonumpad) keys = action.nonumpad;
  if (isMac && action.mac) keys = [...keys, ...action.mac];
  return keys;
}

export function renderKeys(action, profile) {
  return keysFor(action, profile).map(combo).join('<span class="keys-or">or</span>');
}

export function rich(text, ctx) {
  let html = esc(text);
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[\[(.+?)\]\]/g, (_, k) => keyCap(k));
  html = html.replace(/\{k:([\w.]+)\}/g, (_, id) => {
    const a = ctx.keymap.actions[id];
    if (!a) {
      console.warn("Unknown keymap id", id);
      return `<mark>${esc(id)}</mark>`;
    }
    return renderKeys(a, ctx.profile);
  });
  html = html.replace(/\{m:([\w-]+)\}/g, (_, id) => {
    const l = ctx.links.links[id];
    return l ? `<a href="${ctx.links.base}${l.path}" target="_blank" rel="noopener">${esc(l.title)}</a>` : esc(id);
  });
  return html;
}

export { esc };
