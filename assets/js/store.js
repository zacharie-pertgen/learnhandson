// Progress store. Step 1 keeps progress in memory only (it resets on reload).
// Step 4 of the plan swaps `backend` for localStorage without touching any caller.

const memory = new Map();
const backend = {
  read: (key) => memory.get(key),
  write: (key, value) => memory.set(key, value),
};

const listeners = new Set();

export function load(key, fallback) {
  const v = backend.read(key);
  return v === undefined ? structuredClone(fallback) : structuredClone(v);
}

export function save(key, value) {
  backend.write(key, structuredClone(value));
  listeners.forEach((fn) => fn(key, value));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const persistent = false; // flips to true in step 4
