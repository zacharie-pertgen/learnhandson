// Prints the hash the site stores for a flag answer, so answers never sit in the page as plain text.
// Usage: node scripts/hash-flag.mjs <salt> <answer>
// Example: node scripts/hash-flag.mjs blender/5.2/intro/l1 B
// The salt is the lesson's "salt" field in its JSON. The site computes the same hash in assets/js/flags.js.
import { createHash } from "node:crypto";
const [salt, answer] = process.argv.slice(2);
if (!salt || !answer) { console.error("Usage: node scripts/hash-flag.mjs <salt> <answer>"); process.exit(1); }
const norm = answer.trim().toUpperCase();
console.log(createHash("sha256").update(`learnhandson|${salt}|${norm}`).digest("hex"));
