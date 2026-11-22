# The Lantern Isles: Shared World Bible (v0.1)

**Owner:** Blender lesson outline. Other program outlines link here and add their island's row.
**Status:** draft. Name decided 2026-11-22.

---

## 1. The big idea

- **One world, one island per program.** Each learning app is a place in the same archipelago.
- **One flag word per island.** Six flags per island spell a word. Finishing an island restores one part of the archipelago.
- **The threat: the Fog.** A thick, unnatural fog has swallowed the archipelago. Ships are lost, islands are cut off from each other, and nobody can see more than a few steps ahead.
- **Where it comes from:** the **Grey Squall**, a storm that sits at the center of the isles and breathes out the Fog. The Squall also caused each island's damage (it knocked out the beacon, scattered the logbook, flooded the archive).
- **How you fight it: lanterns.** Each island has one great lantern. Restoring the island (finishing its 6 lessons) relights that lantern, and its light clears the Fog around the island. On the world map, the fog visibly pulls back from each island you finish.
- **The thread that ties it all together:** **The Quillfish**, a library-ship that sails between islands. It is the series' home screen. The world map shows its route, and a new island appears on the map each time a program launches.

---

## 2. Islands

| Island | Program | Flag word | Status |
|---|---|---|---|
| **Signal Island** | Blender | BEACON | Outline v0.1 ([blender-outline.md](blender-outline.md)) |
| **The Harbor** (aboard the Quillfish) | Git | HARBOR · ANCHOR · VOYAGE | Outline v0.1 ([git-outline.md](git-outline.md)) |
| The Tide Archive | SQL | proposed: LEDGER | Idea |
| The Static Relay | Bash | proposed: STATIC | Idea |
| The Clockwork Port | PowerShell | proposed: GEARED | Idea |
| The Mirage Reef | Unreal | proposed: MIRAGE | Idea |
| The Kiteworks | Unity | proposed: GLIDER | Idea (name decided 2026-11-22) |

**One-line pitches**
- **Signal Island:** rebuild the beacon so ships can find their way through the fog.
- **The Harbor:** restore the Quillfish's logbook so the ship can dock and share its records.
- **The Tide Archive:** query the flooded ledgers to find who sabotaged the lighthouse.
- **The Static Relay:** rebuild the radio network with pipes, grep, and scripts.
- **The Clockwork Port:** automate the cranes and gates with objects and cmdlets.
- **The Mirage Reef:** build a playable level that lures the Grey Squall away for good.
- **The Kiteworks:** a windy workshop island where kites carry messages between the isles. Build small playable scenes to get the message kites flying again.

---

## 3. How the islands connect (light touches only)

Every app must work on its own. Cross-references are flavor, never requirements.

- **Signal Island → Harbor:** the BEACON finale shows the Quillfish sailing past the new light toward the Harbor.
- **Harbor → Signal Island:** in Git Lesson 2, the missing logbook coordinates are Signal Island's, logged the night the Old Keeper's beacon went dark.
- **Harbor → future islands:** Git Lesson 5's "letters from the harbor" can come from the Tide Archive or the Static Relay, as optional teasers.
- **Signal Island → Tide Archive:** the lighthouse was sabotaged. Who did it is not answered on Signal Island, which sets up the SQL mystery.
- **Rule:** at most one teaser per lesson, and only in story text, never inside a task or check.

---

## 4. Series-wide finale

- Each finished island adds its word to the Quillfish's **chart room** (a page on the site) and lights that island's lantern on the map.
- **Lantern list:** Signal Island's beacon (BEACON), the Harbor's dock lights (HARBOR), and one lantern per future island.
- The chart room shows the map with lit islands clear and unlit ones still in fog, so friends can see their progress across the whole series.
- Once every island's lantern is lit (Intro tiers), the Fog is gone except at the center, revealing the **Eye of the Squall**: a final short challenge that uses one skill from each program. Beating it ends the Squall and clears the last of the Fog.
- **Open detail:** whether the island words also hide a series code (for example, their first letters). Decide when the third island is outlined, so early words don't box us in.

---

## 5. Three tiers per island

Every program follows the same 3-tier structure.

| Tier | Level | Length | What the lantern does |
|---|---|---|---|
| 1. Intro | First steps, core keys and ideas | about 60 min, 6 lessons | **Relights** the island's lantern. The Fog clears from the island. |
| 2. Intermediate | Real workflows, combining tools | about 60 min, 6 lessons | **Extends the beam.** A clear sea lane opens to a neighboring island. |
| 3. Advanced | Power features, a real final project | about 60 min, 6 lessons | **Pierces the Squall.** Lights part of the route to the Eye of the Squall. |

- **One flag word per tier**, 6 letters each (one per lesson), so each island has 3 words.
  - Signal Island (Blender): Intro "Relight the Beacon" BEACON, Intermediate "The Lantern's Reach" KEEPER, Advanced "Into the Squall" SIGNAL.
  - The Harbor (Git): Intro "The Harbor" HARBOR, Intermediate "Through the Shoals" ANCHOR, Advanced "The Deep Hold" VOYAGE.
- **Each tier stands alone:** it ships its own starter file or setup, so friends can skip to their level. Doing all 3 in order tells the island's full story.
- **Series finale:** the Eye of the Squall opens once every island's Intro tier is done. Advanced tiers add bonus scenes to the finale, so beginners can still finish the series.
- **Routes by tier:** Intro and Intermediate should be fully simulated in the browser. Advanced may be companion-first, with a lighter "concept" version in the browser.
- **Detail rule:** a tier gets full step lists, hints, and checks only when it is about to be built. Until then, plan-level is enough.

## 6. Shared style rules

- **Original only.** No characters, places, or looks from existing games or stories.
- **Tone:** cozy, low-poly, a little mysterious. Short story beats, then hands-on work.
- **Format for every island:** about one hour, 6 lessons, one flag letter each, 3-tier optional hints (nudge, specific, answer), and both routes (simulated in the browser, or companion beside the real tool).
- **Narrator:** each island has its own guide (Signal Island: the Old Keeper). The Quillfish crew can appear anywhere.
- **Names:** avoid names that sound alike across islands (the Bash island became the Static Relay so it isn't confused with Signal Island). Add any new recurring character or place to the glossary below, so programs don't clash.

---

## 7. Glossary

| Name | What it is | First appears |
|---|---|---|
| The Lantern Isles | The archipelago | Series |
| The Fog | The series-wide enemy, cleared by lantern light | Series |
| The Grey Squall | Storm at the center of the isles that makes the Fog | Series |
| Lantern | Each island's great light, relit by finishing that island | Series |
| The Quillfish | Library-ship that sails between islands, the series hub | Git |
| The Old Keeper | Narrator of Signal Island, takes you on as apprentice in Tier 2 | Blender |
| Signal Island | Small floating island with the beacon | Blender |
| The Harbor | Shared dock where ships trade logbook copies | Git |
| Captain Orrin | Quillfish captain, gives orders | Git |
| Bramble | Quillfish navigator, works on branches | Git |
| Wick | Clumsy Quillfish crewmate who breaks things | Git |
| The Shoals | Fog-covered sandbars past the Harbor | Git Tier 2 |
| The Deep Hold | Below decks on the Quillfish | Git Tier 3 |
| The Fog Route | Bramble's secret chart through the fog | Git Lesson 3 |
| The Kiteworks | Windy workshop island where kites carry messages (Unity) | Unity |
| Keepsakes | The series name for badges, kept on the Quillfish's Keepsake Shelf | Series ([badges-and-paths.md](badges-and-paths.md)) |
| Voyages | Optional career paths, from Bramble's voyage charts | Series ([badges-and-paths.md](badges-and-paths.md)) |
