# Learn Hands-On: The Lantern Isles

Free, hands-on lessons for real tools. Each program is an island in the Lantern Isles. Find six hidden flags, spell the island's word, and relight its lantern to push back the Fog.

| Island | Program | Status |
|---|---|---|
| Signal Island | Blender 5.2 LTS | Intro tier "Relight the Beacon" (BEACON): companion route ready |
| The Harbor | Git | Coming next |
| Kiteworks, Tide Archive, Static Relay, Clockwork Port, Mirage Reef | Unity, SQL, Bash, PowerShell, Unreal | Planned |

Design docs: [docs/](docs/) (lesson outlines, world bible, keepsakes and voyages).

---

## Put it online with GitHub Pages (about 5 minutes)

1. **Create the repo:** on GitHub, click **New repository**, name it `learnhandson`, set it to **Public** (free Pages needs public), and do **not** add a README.
2. **Commit and push this folder** from a terminal inside it:
   ```bash
   git init -b main
   git add .
   git commit -m "First version"
   git remote add origin https://github.com/<your-username>/learnhandson.git
   git push -u origin main
   ```
3. **Turn on Pages:** repo **Settings > Pages**. Under **Build and deployment**, pick **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. Wait a minute, then open `https://<your-username>.github.io/learnhandson/`.

## Run it on your computer

The pages load JSON files, so open them through a tiny local server, not by double-clicking:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## How it's organized

```
index.html                      The Quillfish: world map and island list (from data/islands.json)
blender/index.html              Always redirects to the newest pinned version
blender/5.2/index.html          Signal Island: tiers, routes, version picker
blender/5.2/intro/index.html    Guided companion for the Intro tier
harbor/                         Git island placeholder
assets/css/site.css             Shared styles for every island
assets/js/companion.js          The lesson app (any program, any version, any tier)
assets/js/text.js               Turns lesson text tokens into keys and links
assets/js/flags.js              Flag checking (answers stored as hashes)
assets/js/store.js              Progress store (memory only for now; localStorage is step 4)
data/islands.json               Every island in the series
data/blender/versions.json      Which Blender versions have lessons
data/blender/5.2/keymap.json    Every key, per action id, with trackpad / no-numpad / Mac variants
data/blender/5.2/links.json     Every manual link, pinned to /manual/en/5.2/
data/blender/5.2/lessons/intro.json   The six lessons + finale
starter/blender/5.2/intro/      Starter .blend scenes (generated, don't edit by hand)
scripts/                        Scene builder, scene checks, data checks, link checker, flag hasher
docs/                           Design docs
```

### Lesson text tokens

- `{k:view.top}` shows that action's keys for the reader's device (mouse or trackpad, numpad or not, Mac).
- `[[R]]` shows a literal key cap.
- `**bold**` is bold.

### Adding a new Blender version (for example 6.2)

1. Copy `data/blender/5.2/` to `data/blender/6.2/`. Fix any changed keys in `keymap.json` and change `5.2` to `6.2` in `links.json` and the lesson file's `version`, `salt`s and `starterBase`.
2. Copy `blender/5.2/` to `blender/6.2/` and change the `5.2` paths in its two HTML files.
3. Rebuild the scenes with Blender 6.2: `blender --background --python scripts/build_scenes.py -- starter/blender/6.2/intro`, then check them with `scripts/verify_scenes.py`.
4. Re-hash the flags with the new salts: `node scripts/hash-flag.mjs blender/6.2/intro/l1 B` (and so on).
5. Add 6.2 to `data/blender/versions.json` and point `blender/index.html` at `6.2/`.
6. Run `node scripts/check-data.mjs`. Leave the 5.2 folders as they are: old versions stay online.

### Checks

```bash
node scripts/check-data.mjs      # keymap ids, link ids, starter files, flag hashes
node scripts/check-links.mjs     # every manual link still loads (needs internet)
blender --background --python scripts/verify_scenes.py -- starter/blender/5.2/intro   # puzzle and face-count checks
```

`.github/workflows/checks.yml` runs the first two on every push and weekly.

### What was verified

- Every key in the Intro tier was checked against the default keymap shipped in **Blender 5.2.4 LTS** (left-click select).
- The starter scenes were built and checked with Blender 5.2.4 LTS: each flag is only readable with the lesson's skill, the Lesson 2 Ctrl I route selects only crates, R X 90 stands the Lesson 3 pole up with its letter facing Front view, and the face counts match (Lesson 5: 14, or 18 with the loop cut; Lesson 6: 24 vertices, 22 faces, with 18 and 14 for missing steps).
- Manual links could not be loaded from the build machine. Run `node scripts/check-links.mjs` once after pushing (CI also runs it).

### A note on flags

Answers are stored as SHA-256 hashes so they aren't visible at a glance. Anyone determined can still brute-force a single letter. That's fine: it's a game, not a lock.

## Next steps (from the plan)

3. Three.js simulated viewport (the "In the browser" route)
4. Save progress with localStorage (swap the backend in `assets/js/store.js`)
5. Deploy and share
