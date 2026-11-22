# Keepsakes and Voyages: Badges and Career Paths (Draft v0.1)

**Status:** v0.2, approved by Macs 2026-11-22 (decisions in section 14). Ready to build.
**Reads with:** [archipelago.md](archipelago.md), [blender-outline.md](blender-outline.md), [git-outline.md](git-outline.md).
**Scope:** works on a static site. Everything is computed in the browser from saved progress (localStorage). No server, no accounts.

---

## 1. Key terms

- **Keepsake:** the series name for a badge. Keepsakes wash aboard the Quillfish as you restore the isles.
- **Keepsake Shelf:** the cabin wall on the Quillfish home screen where keepsakes are displayed.
- **Tier:** a level of one island's content: Intro, Intermediate, Advanced. Each tier is a set of lessons.
- **Voyage:** the series name for an optional career path. A voyage is a recommended order of island tiers and lessons.
- **Leg:** one stop on a voyage (for example, "Signal Island, Intro tier").
- **Clear Sky:** finishing a lesson with zero hints. This is the existing "star per hint-free lesson".

---

## 2. Design rules (apply to every keepsake and voyage)

- **Never take a keepsake away.** Once earned, it stays, even if a lesson is rewritten or a new version ships.
- **Never lock content.** Voyages recommend. Every island and tier stays open to everyone.
- **No penalties for hints.** Hints only affect Clear Sky keepsakes, which are bonus.
- **Both routes count.** Simulated and companion routes earn the same keepsakes. Secrets have a way to be found on both.
- **Original only.** All names below are new and fit the Lantern Isles. No names from existing games or stories.
- **Not color alone.** Every keepsake has a distinct shape and a text label, so it reads for colorblind users.

---

## 3. Keepsake families (overview)

| Family | What it rewards | How many | Look |
|---|---|---|---|
| **Flag Stamps** | Finishing a lesson | 1 per lesson | Wax stamp with the flag letter |
| **Clear Sky Stars** | Finishing a lesson with no hints | 1 per lesson | Small gold star on the stamp |
| **Lantern Flames** | Finishing a tier | 3 per island | Lantern with growing flame |
| **Calm Water Ribbons** | Finishing a tier with no hints | 3 per island | Blue ribbon tied to the lantern |
| **Island Crests** | Finishing all 3 tiers of an island | 1 per island | Shield with the island's symbol |
| **Chart Pins** | Progress across islands | 6 (grows with series) | Brass map pin |
| **Fogbound Secrets** | Hidden actions and finds | 2 to 3 per island | Shown as a fog silhouette until found |
| **Voyage Compasses** | Career path milestones | 3 per voyage | Compass, needle points to the voyage's symbol |

---

## 4. Lesson keepsakes

### Flag Stamps (1 per lesson)
- **Earn:** enter the lesson's flag correctly.
- **Name:** "[Island] Stamp: [Letter]". Example: "Signal Island Stamp: B".
- **Look:** a wax stamp in the island's color with the letter pressed in. Higher tiers get a different stamp border (rope for Intro, chain for Intermediate, braided gold for Advanced).
- **Lesson 0 (Prologue / Boarding):** no flag, so it earns a **Boarding Pass** instead (one per island). Cheap win in the first 3 minutes.

### Clear Sky Stars (1 per lesson)
- **Earn:** finish the lesson without opening any hint tier.
- **Look:** a small gold star added to that lesson's stamp. No separate shelf slot, so the shelf stays tidy.
- **One-tap confirm (decided):** the first hint tier in each lesson opens only after one confirm tap ("Light the lantern for a hint?"), so a Clear Sky Star is never lost by accident. Later tiers in the same lesson open without a confirm.

---

## 5. Tier and island keepsakes

### Lantern Flames (1 per tier)
The island's lantern on the map gets brighter with each tier. This is the main visual reward.

| Tier | Keepsake name | Lantern on the map |
|---|---|---|
| Intro | **Ember** | Lantern lit, small flame. Fog pulls back from the island's shore. |
| Intermediate | **Glow** | Bigger flame, warm halo. Fog clears from the nearby sea lane. |
| Advanced | **Blaze** | Full flame with light rays. A sea lane opens toward the next island. |

- **Name pattern:** "Signal Island Ember", "Harbor Glow", and so on.
- **Tier words (approved):** each tier spells its own 6-letter word, shown on the lantern's base once that tier is done. Signal Island: BEACON, KEEPER, SIGNAL. Harbor: HARBOR, ANCHOR, VOYAGE. The Kiteworks word is proposed as GLIDER for its Intro tier.
- **Fits the world doc:** finishing the Intro tier is what "relights the lantern". Glow and Blaze make it stronger.

### Calm Water Ribbons (1 per tier, hint-free)
- **Earn:** every lesson in that tier earned a Clear Sky Star.
- **Look:** a blue ribbon tied to that tier's lantern.
- **Retry friendly:** replaying a lesson hint-free later upgrades it. The ribbon appears as soon as the last star lands.

### Island Crests (1 per island)
- **Earn:** Ember, Glow, and Blaze on one island.
- **Look:** a shield that hangs on the island on the map.

| Island | Crest | Symbol |
|---|---|---|
| Signal Island (Blender) | **Keeper's Crest** | Beacon tower |
| The Harbor (Git) | **Logbook Crest** | Open logbook with a branching ribbon |
| The Tide Archive (SQL) | **Archivist's Crest** | Stacked ledgers over a wave |
| The Static Relay (Bash) | **Relay Crest** | Radio mast with a pipe symbol |
| The Clockwork Port (PowerShell) | **Gearwright's Crest** | Crane hook inside a gear |
| The Mirage Reef (Unreal) | **Reefwalker's Crest** | Coral arch with a shimmer |
| The Kiteworks (Unity) | **Kitewright's Crest** | Kite over a gear-shaped frame |

---

## 6. Cross-island keepsakes (Chart Pins)

| Pin | Earn condition | Flavor line |
|---|---|---|
| **First Light** | Earn your first Ember on any island | "The fog blinked first." |
| **Two Lights** | Ember on 2 islands | "Ships can see from one light to the next." |
| **Island Hopper** | Finish at least one lesson on 4 islands | "Your boots have sand from everywhere." |
| **Lamplighter** | Ember on every released island | "Every lantern burns." |
| **Eye of the Squall** | Beat the series finale challenge | "The storm is quiet now." |
| **Clear Horizon** | Island Crest on every released island | "Nothing left in the fog." |

- **"Released" matters:** Lamplighter and Clear Horizon check only islands that exist on the site at the time. When a new island launches, already-earned pins stay. The pin gets a small "+1" marker that invites you to the new island instead.

---

## 7. Fogbound Secrets (hidden keepsakes)

- **On the shelf:** shown as a fog-wrapped silhouette with one riddle line. The name stays hidden until found.
- **Static-site friendly:** each secret is either a sim event (the app sees the action) or a **secret word** hidden in companion files that the player types into the "Found something?" box on the island page.
- **Rule:** secrets never block anything and never need hints.

### Signal Island (Blender)
| Secret | Riddle on shelf | How it's earned |
|---|---|---|
| **Under the Island** | "Not everything floats on top." | Sim: orbit the camera below the island in Lesson 1 to see a carving. Companion: the carving's word is under the island in the starter .blend. |
| **Second Chance** | "Some mistakes come back." | Sim: delete the oil barrel in Lesson 2, then undo it. Companion: a note on the barrel's underside has the word. |
| **Keeper's Lamp** | "Keep the old light." | Sim and companion: rename the Lesson 6 beacon object to the Old Keeper's hidden name (found on a sign in Lesson 3). |

### The Harbor (Git)
| Secret | Riddle on shelf | How it's earned |
|---|---|---|
| **Wick's Doodle** | "Wick hid more than one drawing." | A second doodle sits in an old commit in Lesson 6. `git show` reveals a word. Both routes. |
| **Escape Artist** | "Some doors only open with a colon." | Sim: open the commit editor and quit with `:wq`. Companion: the repo's `.git/description` file holds the word. |
| **Orrin's Old Chart** | "The captain never deletes a branch." | A long-forgotten branch in Lesson 3 has a commit with a word. `git branch -a` finds it. |

### Series secret
- **The Grey Letter:** each island hides one extra letter in its finale scene. Collect them all (shown in the chart room) to unlock a bonus keepsake. This can also solve the world doc's open "series code" detail. Decide the word once the third island is outlined.

---

## 8. Where keepsakes show up

### Quillfish home screen (Keepsake Shelf)
- **Layout:** a cozy cabin wall with shelves, one shelf per island, plus a top shelf for Chart Pins and a side cabinet for Voyage Compasses.
- **Unearned keepsakes:** shown as faint outlines with their earn condition (secrets show only the riddle).
- **Tap a keepsake:** a card with name, flavor line, date earned, route used, and a "Replay lesson" button.
- **Counter:** "23 of 61 keepsakes" at the top. Secrets count as "?" until found.

### World map (chart room)
- **Lanterns:** each island's lantern shows unlit, Ember, Glow, or Blaze.
- **Crests:** hang on islands with all 3 tiers done.
- **Ribbons:** a small blue ribbon on the lantern for each hint-free tier.
- **Active voyage:** a dotted route line through the voyage's islands (see section 11).

### Moment of earning
- **Toast:** a small card slides in: "A keepsake washed aboard: Signal Island Ember." Two seconds, dismissible, respects reduced motion.
- **Lesson finale screens:** show the flag stamp, star (if earned), and any new keepsakes together.

### Sharing (optional, static)
- **Share card:** a button draws a PNG on a canvas (map with lit lanterns plus keepsake count). Friends post it anywhere. No server needed.

---

## 9. Data model (static-site friendly)

### `data/keepsakes.json` (the catalog, shipped with the site)
```json
{
  "id": "blender.intro.ember",
  "family": "lantern",
  "name": "Signal Island Ember",
  "flavor": "The beacon wakes.",
  "icon": "icons/lantern-ember.svg",
  "secret": false,
  "rule": { "type": "tierComplete", "island": "blender", "tier": "intro" }
}
```

### Rule types (a small, fixed list keeps the code simple)
- `lessonComplete`, `lessonHintFree`
- `tierComplete`, `tierHintFree`
- `islandComplete`
- `countIslands` (with `"min"` and a `"what"`: lessonDone, ember, crest)
- `event` (a named sim event, for example `"blender.l2.undoBarrel"`)
- `secretWord` (compares a hash of the typed word, so the word isn't readable in the JSON)
- `voyageProgress` (with `"voyage"` and `"percent"`)

### Saved progress (localStorage key `lh.progress.v1`)
```json
{
  "lessons": {
    "blender.intro.1": { "done": true, "hintsUsed": 0, "route": "sim", "doneAt": "2026-11-22" }
  },
  "events": ["blender.l2.undoBarrel"],
  "secrets": ["git.wicksDoodle"],
  "earned": { "blender.intro.ember": "2026-11-22" },
  "voyage": "shaper"
}
```
- **Earned is stored, not only computed.** This is what makes "never take a keepsake away" work when lessons change.
- **IDs use island + tier + lesson number,** never the program version. A Blender 5.2 lesson and its 5.4 update share an ID, so keepsakes carry over.
- **Backup:** a "Copy my progress code" button (compressed JSON as text) and "Paste a code" to restore. This covers new devices and cleared browsers until real saved progress exists.

---

## 10. Voyages (career paths): how they work

### The pitch in the story
Bramble, the Quillfish navigator, keeps a drawer of **voyage charts**. Each chart is a route through the isles for a kind of work you might want to do. Pick one, or sail free.

### The flow
1. **Offer, don't push.** After Lesson 0 on any island, a small card: "Bramble has charts for different kinds of work. Want to look?" Buttons: "Show me" and "Maybe later". Also always reachable from the home screen.
2. **Review.** Each voyage has a preview page (section 12 shows the content): who it's for, what you'll be able to do, the legs in order, rough time, and which islands are still in fog (not built yet).
3. **Pick or skip.** "Set this course" or "Sail free". One active voyage at a time. Switching is free and keeps all progress, because lessons count toward every voyage they belong to.
4. **Follow.** The home screen shows a "Next stop" button for the active voyage. The map shows the route.

### Leg types
- **Core leg:** counts toward voyage completion.
- **Side harbor:** optional extra that fits the job. Shown with a dotted outline. Doesn't block completion.
- **Focus lessons:** inside a leg, some lessons get a small compass mark and a "Why this matters for the job" line. All lessons in the tier still count.

### Progress
- **Percent:** core lessons done divided by core lessons in released islands.
- **Legs in fog:** islands not built yet show as fogged on the route with "Coming later". They don't count against your percent until they launch.

### Voyage Compasses (path keepsakes, 3 per voyage)
| Keepsake | Earn |
|---|---|
| **[Voyage] Bearing** | Set the course and finish its first core lesson |
| **[Voyage] Midpoint** | 50% of core legs done |
| **[Voyage] Compass** | 100% of core legs on released islands |
- A new island added to a voyage later adds a new leg. The Compass stays earned and gets a "+ new waters" marker.

---

## 11. Voyage display

- **Home screen:** a slim banner under the Quillfish: voyage name, progress bar, "Next stop: Harbor Intro, Lesson 3".
- **World map:** dotted route line between the voyage's islands in order. Done legs turn solid. Side harbors show as small branching dashes.
- **Voyage page:** the full chart, every leg with its lessons, checkmarks, focus marks, and the 3 compass keepsakes.
- **Sail free mode:** no banner, no route line. Map and shelf look the same otherwise.

---

## 12. The voyages

Time assumes each tier is about one hour, like the current Intro tiers. Adjust once Intermediate and Advanced are outlined.

**Island key:** Signal (Blender), Harbor (Git), Tide (SQL), Relay (Bash), Port (PowerShell), Reef (Unreal), Kiteworks (Unity).

### 1. The Shaper's Voyage (3D artist)
- **For:** people who want to model props, characters, or scenes.
- **You'll be able to:** model clean low-poly assets, keep versions of your work, and see them in a game engine.
- **Core legs:**
  1. Signal Intro
  2. Harbor Intro (version your .blend files)
  3. Signal Intermediate
  4. Signal Advanced
- **Side harbors:** Reef Intro (bring assets into Unreal), Kiteworks Intro.
- **Focus lessons:** Signal Intro L5 "Hollow the lantern" (core modeling tools), Signal Intro L6 "Build the beacon", Harbor Intro L6 "Wick's Bad Day" (rescue a broken file).
- **Rough time:** about 4 hours core.

### 2. The Playmaker's Voyage (game developer)
- **For:** people who want to build playable games.
- **You'll be able to:** make simple assets, build a level in an engine, and work on a shared project without losing work.
- **Core legs:**
  1. Harbor Intro
  2. Signal Intro
  3. Kiteworks Intro (in fog until built)
  4. Harbor Intermediate (branches and teamwork)
  5. Reef Intro (in fog until built)
  6. Kiteworks Intermediate or Reef Intermediate (pick one)
- **Side harbors:** Signal Intermediate, Tide Intro (save data and leaderboards).
- **Focus lessons:** Harbor Intro L3 "Bramble's Fog Route" and L4 "Two Charts, One Map" (branches and merges, daily life on a game team).
- **Rough time:** about 6 hours core.

### 3. The Harbormaster's Voyage (DevOps and sysadmin)
- **For:** people who want to run servers, automate chores, and keep systems healthy.
- **You'll be able to:** work fast in a terminal, script repeat tasks on Linux and Windows, and manage code changes safely.
- **Core legs:**
  1. Relay Intro
  2. Harbor Intro
  3. Relay Intermediate
  4. Port Intro
  5. Harbor Intermediate
  6. Relay Advanced
  7. Port Intermediate
- **Side harbors:** Harbor Advanced, Tide Intro (reading logs stored in databases).
- **Focus lessons:** Harbor Intro L5 "Letters From the Harbor" (remotes, push, pull), Harbor Intro L6 "Wick's Bad Day" (undo safely).
- **Rough time:** about 7 hours core.

### 4. The Tidereader's Voyage (data analyst)
- **For:** people who want to answer questions with data.
- **You'll be able to:** query and join tables, clean data files from the command line, and keep your analysis in version control.
- **Core legs:**
  1. Tide Intro
  2. Tide Intermediate
  3. Relay Intro (handle CSV files with pipes and grep)
  4. Tide Advanced
  5. Harbor Intro (track your queries and notebooks)
- **Side harbors:** Port Intro (for Windows-heavy offices), Harbor Intermediate.
- **Focus lessons:** to be marked when the SQL outline exists.
- **Rough time:** about 5 hours core.

### 5. The Shipwright's Voyage (software engineer)
- **For:** people who want to write and ship software.
- **You'll be able to:** use Git like a team member, work in a terminal, and store and query app data.
- **Core legs:**
  1. Harbor Intro
  2. Relay Intro
  3. Harbor Intermediate
  4. Tide Intro
  5. Harbor Advanced
  6. Relay Intermediate
  7. Tide Intermediate
- **Side harbors:** Port Intro, Kiteworks Intro (if you like games).
- **Focus lessons:** every Harbor Intro lesson. Git is the daily tool in this job.
- **Rough time:** about 7 hours core.

### Sail Free (no voyage)
- The default. All content open, no banner, no route line.
- **Explorer's Compass** (bonus keepsake): finish at least one tier on every released island without a voyage set. Rewards the wanderers too.

### What you can start today (Blender + Git only)
| Voyage | Playable now | In fog |
|---|---|---|
| Shaper's | All 4 core legs (once Signal Int/Adv exist) | Side harbors only |
| Playmaker's | Legs 1, 2, 4 | Kiteworks, Reef |
| Harbormaster's | Legs 2, 5 | Relay, Port |
| Tidereader's | Leg 5 | Tide, Relay |
| Shipwright's | Legs 1, 3, 5 | Relay, Tide |
- **Suggestion:** at launch, show all five voyages so people see the plan, with fogged legs clearly marked.

---

## 13. Build order (suggested)

1. **With the first lesson:** Flag Stamps, Boarding Pass, Clear Sky Stars, saved progress, progress code backup.
2. **With the first finished tier:** Lantern Flames, Calm Water Ribbons, map lantern states, toasts.
3. **With the second island:** Chart Pins (First Light, Two Lights), Keepsake Shelf screen.
4. **Then:** Fogbound Secrets (needs small hooks in each lesson's sim and starter files).
5. **Then:** Voyages (catalog JSON, preview pages, banner, route line, compasses).
6. **Later:** Island Crests (once Advanced tiers exist), share card, Grey Letter.

**Voyage catalog file:** `data/voyages.json` with each voyage's id, name, blurb, legs (island, tier, core or side), and focus lessons with their "why" line. Adding an island means editing JSON, not code.

---

## 14. Decisions (Macs, 2026-11-22)

- **Names:** "Keepsakes" for badges and "Voyages" for career paths.
- **Voyages:** keep the 5 (Shaper's, Playmaker's, Harbormaster's, Tidereader's, Shipwright's), plus Sail Free.
- **Unity island:** The Kiteworks. Crest is the Kitewright's Crest. Added to archipelago.md (flag word GLIDER is a proposal for the Unity lessons).
- **Hint confirm:** one-tap confirm before the first hint tier in each lesson.
- **Secrets:** show their riddle line on the shelf. The name stays hidden until found.
- **Git tier words:** HARBOR, ANCHOR, VOYAGE (also recorded in git-outline.md).
