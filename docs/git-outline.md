# Git Lesson Plans: "The Quillfish Logbook"

**Status:** Draft for review (nothing built yet)
**Target Git version:** 2.56 (latest feature release, Sept 28, 2026)
**Tiers:** three, each about 60 minutes and 6 lessons

| Tier | Story | Focus | Word |
|---|---|---|---|
| **Intro** | The Harbor | Everyday Git: commit, branch, merge, remotes, undo | HARBOR |
| **Intermediate** | Through the Shoals | Clean history and teamwork: stash, tag, cherry-pick, rebase | ANCHOR |
| **Advanced** | The Deep Hold | Rescue and internals: reflog, bisect, blame, objects, hooks, worktrees | VOYAGE |
**Routes:** Simulated in-browser terminal, or guided companion alongside real Git

---

## Key terms (quick reference)

- **Repository (repo):** a project folder that Git is tracking, plus its full history.
- **Commit:** a saved snapshot of your files, with a message and an ID (hash).
- **Staging area (index):** the "loading dock" where you pick what goes into the next commit.
- **Branch:** a movable label pointing at a commit. A parallel line of work.
- **Merge:** joining two branches' histories back together.
- **Remote:** another copy of the repo somewhere else (a server, or another folder).
- **Flag:** the hidden letter each lesson's challenge reveals.

**Visual analogy:** a commit graph is a subway map. Commits are stations, branches are train lines, and a merge is where two lines meet at a shared station.

---

## The story (original theme)

You are the new apprentice archivist aboard **The Quillfish**, a library-ship that sails between the Lantern Isles (the series archipelago) collecting stories, bound for the Harbor. Its logbook is kept in Git. The **Grey Squall** scattered pages, a careless crewmate overwrote charts, and someone keeps "editing" history.

- Each lesson is one day at sea and one repair to the logbook.
- Each challenge reveals a **flag letter** (format `FLAG{H}`).
- The six letters spell **H A R B O R**. In the finale you enter the word, the Harbor's dock lights (its great lantern) relight, the Fog clears, and the Quillfish docks.
- Recurring crew: **Captain Orrin** (gives orders), **Bramble the navigator** (works on branches), **Wick** (the clumsy crewmate who breaks things).

---

## Series tie-in: the Archipelago

All programs share one world, **the Lantern Isles**, where each program is its own island. The enemy is **the Fog**, breathed out by the Grey Squall. Each island has one great lantern, and finishing the island relights it and clears the Fog there. The Harbor's lantern is its dock lights. The shared world doc is [archipelago.md](archipelago.md). The Blender outline owns it, so details here stay short.

- **Git's place:** the Quillfish, a library-ship docked at **the Harbor**, the archipelago's central port.
- **Neighbors:** Signal Island (Blender) is just offshore. The Lesson 2 story nods to it (see below). Blender's finale shows the Quillfish sailing past the new beacon toward the Harbor.
- **Series finale:** once every island's lantern is lit, the Eye of the Squall opens (see archipelago.md). HARBOR is one of those words, alongside BEACON and future ones.
- **Future islands it can hint at:** the Tide Archive (SQL), the Static Relay (Bash), the Clockwork Port (PowerShell), the Mirage Reef (Unreal). The Lesson 5 "letters from the harbor" can come from these places as teasers.
- **Shared crew rule:** Git characters (Orrin, Bramble, Wick) can cameo in other programs, but each program's lessons stand alone.

---

# Tier 1: Intro, "The Harbor" (about 60 min) → Word **HARBOR**

### Lesson map

| # | Day at sea | Git skill | Time | Flag |
|---|---|---|---|---|
| 0 | Boarding | Setup, `git --version`, `git config` | 3 min | none |
| 1 | The Blank Logbook | `init`, `status`, `add`, `commit` | 9 min | **H** |
| 2 | The Missing Coordinates | `log`, `show`, `diff` | 9 min | **A** |
| 3 | Bramble's Fog Route | `branch`, `switch` | 8 min | **R** |
| 4 | Two Charts, One Map | `merge`, conflicts | 12 min | **B** |
| 5 | Letters From the Harbor | `clone`, `fetch`, `pull`, `push` | 10 min | **O** |
| 6 | Wick's Bad Day | `restore`, `revert`, `reset` | 10 min | **R** |

---

### Lesson 0: Boarding (3 min)

**Story:** Captain Orrin hands you a quill and asks you to sign the crew roster.

**You learn**
- `git --version` (check you match the lesson version)
- `git config --global user.name "..."` and `user.email`
- `git config --global init.defaultBranch main` so every new repo starts on `main` (the series standard)
- Terminal survival keys (see "Terminal keybinds" below)

**Challenge:** Sign the roster. No flag yet, this unlocks Lesson 1.

**Hints (optional, reveal one at a time)**
- **Nudge:** Git wants to know who is writing in the log before you commit.
- **Specific:** `git config --global user.name` and `user.email` set your signature.
- **Answer:** `git config --global user.name "Your Name"`, then `git config --global user.email "you@example.com"`, then `git config --global init.defaultBranch main`

**Docs:** [git-config](https://git-scm.com/docs/git-config/2.56.0) · [Pro Git: First-Time Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)

---

### Lesson 1: The Blank Logbook (9 min) → Flag **H**

**Story:** The old logbook was lost overboard. Start a new one and record today's three pages. One page is soggy junk and must NOT go in the log.

**You learn**
- `git init` creates a repo
- `git status` shows what changed (your most-used command)
- `git add <file>` stages a file, `git add .` stages everything (and why that can be risky)
- `git commit -m "message"` saves the snapshot
- The three zones: working folder, staging area, history

**Challenge (find the flag)**
1. Init the logbook in `quillfish/`.
2. Stage only `weather.txt` and `crew.txt`. Leave `soggy-page.txt` out.
3. Commit with any message.
4. Flag appears once history has exactly those two files and `soggy-page.txt` is still untracked.

**Stretch:** add `soggy-page.txt` to a `.gitignore` so it stops showing up.

**Hints (optional, reveal one at a time)**
- **Nudge:** run `git status` after every step. It tells you what to do next.
- **Specific:** `git add` takes file names, so you can name just the two good pages.
- **Answer:** `git init`, `git add weather.txt crew.txt`, `git commit -m "First log entry"`

**Docs:** [git-init](https://git-scm.com/docs/git-init/2.56.0) · [git-status](https://git-scm.com/docs/git-status/2.56.0) · [git-add](https://git-scm.com/docs/git-add/2.56.0) · [git-commit](https://git-scm.com/docs/git-commit/2.56.0) · [gitignore](https://git-scm.com/docs/gitignore/2.56.0)

---

### Lesson 2: The Missing Coordinates (9 min) → Flag **A**

**Story:** The coordinates of Signal Island were in the log, written on the night the Old Keeper's beacon went dark. Now they're gone. Someone deleted them in one of the last eight commits. History never forgets.

**You learn**
- `git log` and `git log --oneline` to see history
- `git show <hash>` to see what one commit changed
- `git diff` (working folder vs staging), `git diff HEAD~3 HEAD` (compare commits)
- `git log -S "text"` to find the commit that added or removed a phrase
- Reading a diff: `+` added, `-` removed

**Challenge (find the flag)**
- Starter repo has 8 commits with chatty messages (one is a red herring).
- The flag is the removed line in the commit that deleted the coordinates.
- Fast path for curious learners: `git log -S "FLAG"`.

**Hints (optional, reveal one at a time)**
- **Nudge:** the history is a list. Start by reading it in short form.
- **Specific:** `git show <hash>` shows exactly what one commit removed (lines starting with `-`).
- **Answer:** `git log -S "FLAG" --oneline` finds the commit, then `git show <that hash>`

**Docs:** [git-log](https://git-scm.com/docs/git-log/2.56.0) · [git-show](https://git-scm.com/docs/git-show/2.56.0) · [git-diff](https://git-scm.com/docs/git-diff/2.56.0)

---

### Lesson 3: Bramble's Fog Route (8 min) → Flag **R**

**Story:** Bramble has been charting a secret route through the fog on a separate branch so the main log stays clean. Visit the route, then start your own.

**You learn**
- `git branch` lists branches, `git branch <name>` creates one
- `git switch <name>` moves to a branch, `git switch -c <name>` creates and moves
- Files change on disk when you switch (this surprises everyone)
- Note on `git checkout`: older tutorials use it, `switch` is the clearer modern command

**Challenge (find the flag)**
1. List branches and spot `fog-route`.
2. Switch to it. A file `fog-chart.txt` appears that does not exist on `main`.
3. The flag is inside that file.
4. To finish: create your own branch `my-route` from `main` and make one commit on it.

**Sim visual:** commit graph highlights where `HEAD` points as you switch.

**Hints (optional, reveal one at a time)**
- **Nudge:** the route lives somewhere other than `main`. List what exists.
- **Specific:** `git switch <branch>` moves you there, and the files on disk change.
- **Answer:** `git branch`, `git switch fog-route`, read `fog-chart.txt`, then `git switch main` and `git switch -c my-route`, edit a file, add, commit

**Docs:** [git-branch](https://git-scm.com/docs/git-branch/2.56.0) · [git-switch](https://git-scm.com/docs/git-switch/2.56.0) · [Pro Git: Branching in a Nutshell](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)

---

### Lesson 4: Two Charts, One Map (12 min) → Flag **B**

**Story:** Bramble and Captain Orrin both edited the same line of `map.txt` on different branches. Combine their work without losing either.

**You learn**
- `git merge <branch>` joins histories
- Fast-forward merge vs merge commit (shown on the graph)
- Conflict markers: `<<<<<<<`, `=======`, `>>>>>>>`
- Resolve: edit the file, `git add`, then `git commit`
- `git merge --abort` as an escape hatch

**Challenge (find the flag)**
1. Merge `captain-notes` into `main` (fast-forward, easy).
2. Merge `fog-route` into `main`. Conflict in `map.txt`.
3. Each side holds half of a clue (for example "the letter after A" split across two lines). Keep both lines in the right order and remove the markers to read it.
4. Flag confirms when the merge commit exists and `map.txt` has no markers.

**Hints (optional, reveal one at a time)**
- **Nudge:** a conflict is not an error. Git is asking you to choose.
- **Specific:** open `map.txt`, keep the text from both sides, delete the three marker lines.
- **Answer:** `git merge captain-notes`, `git merge fog-route`, fix `map.txt`, `git add map.txt`, `git commit`

**Docs:** [git-merge](https://git-scm.com/docs/git-merge/2.56.0) · [Pro Git: Basic Merge Conflicts](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

---

### Lesson 5: Letters From the Harbor (10 min) → Flag **O**

**Story:** The harbor keeps a shared copy of the logbook. Other ships add news to it. Collect their letters, then send yours.

**You learn**
- `git clone` copies a remote repo
- `git remote -v` shows where "origin" is
- `git fetch` downloads without changing your files, `git pull` = fetch + merge
- `git push` sends your commits
- Why a push gets rejected (someone pushed first) and how to fix it

**Challenge (find the flag)**
1. Clone the harbor repo.
2. Make a commit and try to push. It is rejected, because another ship pushed first.
3. `git fetch`, then read the new commit with `git log origin/main`. Its message contains the flag.
4. `git pull`, then `git push` succeeds.

**Both routes, no account needed:** the harbor is a second in-browser repo (sim) or a local bare repo folder (companion). The other ship's commit comes from the teammate helper.

**Optional bonus (not required for the flag):** create a free GitHub repo, `git remote add github <url>`, and `git push github main`. Earns a bonus badge in the finale.

**Hints (optional, reveal one at a time)**
- **Nudge:** a rejected push means the harbor has news you don't have yet.
- **Specific:** `git fetch` downloads it safely, then `git log origin/main` lets you read it.
- **Answer:** `git fetch`, `git log origin/main --oneline`, `git pull`, `git push`

**Docs:** [git-clone](https://git-scm.com/docs/git-clone/2.56.0) · [git-remote](https://git-scm.com/docs/git-remote/2.56.0) · [git-fetch](https://git-scm.com/docs/git-fetch/2.56.0) · [git-pull](https://git-scm.com/docs/git-pull/2.56.0) · [git-push](https://git-scm.com/docs/git-push/2.56.0)

---

### Lesson 6: Wick's Bad Day (10 min) → Flag **R**

**Story:** Wick spilled ink on a page (unsaved edits), committed a rude doodle (shared commit), and made a messy commit nobody has seen yet. Fix each the right way.

**You learn** (pick the right tool for the situation)
- `git restore <file>`: throw away unsaved edits in your folder
- `git restore --staged <file>`: unstage without losing edits
- `git revert <hash>`: undo a commit safely by adding a new "opposite" commit (use on shared history)
- `git reset --soft HEAD~1`: take back your last unshared commit, keep the changes
- Warning box: `git reset --hard` deletes work. Mention `git reflog` as the rescue rope.

**Challenge (find the flag)**
1. Restore the ink-spilled `weather.txt`.
2. Revert the doodle commit (it was already pushed, so no reset).
3. Soft-reset the messy commit and recommit it cleanly.
4. Flag appears when all three are fixed and history still contains the doodle commit plus its revert.

**Finale (both routes):** enter all six letters. HARBOR relights the dock lights, the Fog lifts from the Harbor, and the Quillfish docks. Shows total time, "found with 0 / 3 / 7 hints", and a star for each lesson finished hint-free.

**Hints (optional, reveal one at a time)**
- **Nudge:** ask of each mess: is it unsaved, unshared, or already shared?
- **Specific:** unsaved means `restore`, shared means `revert`, unshared means `reset --soft`.
- **Answer:** `git restore weather.txt`, `git revert <doodle hash>`, `git reset --soft HEAD~1`, then `git commit -m "Clean entry"`

**Docs:** [git-restore](https://git-scm.com/docs/git-restore/2.56.0) · [git-revert](https://git-scm.com/docs/git-revert/2.56.0) · [git-reset](https://git-scm.com/docs/git-reset/2.56.0) · [git-reflog](https://git-scm.com/docs/git-reflog/2.56.0)

---

# Tier 2: Intermediate, "Through the Shoals" (about 60 min) → Word **ANCHOR**

**Story:** The Harbor's dock lights are lit, but the copies of the logbook must reach a fleet waiting past the Shoals, a maze of sandbars where the Fog still clings. Many hands are editing at once, and the history is getting tangled. Bramble leads this voyage.

**Prerequisite:** Intro tier finished, or pass the 5-question placement check (see "How tiers connect").

| # | Lesson | Git skill | Time | Flag |
|---|---|---|---|---|
| 1 | Shelve the Wet Pages | `stash` | 8 min | **A** |
| 2 | Mark the Soundings | `tag`, `commit --amend` | 8 min | **N** |
| 3 | Borrow One Chart | `cherry-pick` | 9 min | **C** |
| 4 | Straighten the Route | `rebase` (with a conflict) | 12 min | **H** |
| 5 | Tidy the Log | `rebase -i` (squash, reword, drop) | 12 min | **O** |
| 6 | Sail With the Fleet | tracking branches, `pull --rebase`, `push --force-with-lease` | 11 min | **R** |

### Lesson 1: Shelve the Wet Pages (8 min) → Flag **A**
- **Story:** You're halfway through an edit when Orrin needs an urgent fix on `main`. You can't commit wet pages.
- **You learn:** `git stash`, `stash list`, `stash pop`, `stash apply` vs `pop`, `stash -u` for new files.
- **Challenge:** stash your half-done edit, switch to `main`, commit the urgent fix, switch back, pop the stash. Two stashes are already on the shelf from Wick. `git stash show -p stash@{1}` reveals the flag.
- **Hints:** Nudge: "Put the wet pages on a shelf, not in the log." Specific: "`git stash` shelves, `git stash pop` takes them back." Answer: `git stash`, `git switch main`, fix + commit, `git switch -`, `git stash pop`, then `git stash show -p stash@{1}`.
- **Docs:** [git-stash](https://git-scm.com/docs/git-stash/2.56.0)

### Lesson 2: Mark the Soundings (8 min) → Flag **N**
- **Story:** Each safe depth reading is a milestone worth naming. Wick also committed with a typo.
- **You learn:** lightweight vs annotated tags (`git tag -a v1.0 -m`), `git show v1.0`, `git push origin --tags`, `git commit --amend` for the last, unshared commit.
- **Challenge:** fix the typo with `--amend`, tag the safe-passage commit `depth-1`, then read the existing annotated tag `old-sounding`. Its message holds the flag.
- **Hints:** Nudge: "A tag is a name on a commit, like a buoy." Specific: "`git tag -n` lists tags with messages." Answer: `git commit --amend -m "..."`, `git tag -a depth-1 -m "Safe"`, `git show old-sounding`.
- **Docs:** [git-tag](https://git-scm.com/docs/git-tag/2.56.0) · [git-commit](https://git-scm.com/docs/git-commit/2.56.0)

### Lesson 3: Borrow One Chart (9 min) → Flag **C**
- **Story:** Bramble's experimental branch has ten commits. Only one, the sandbar fix, is ready for `main`.
- **You learn:** `git cherry-pick <hash>`, finding the right commit with `git log --oneline <branch>`, `cherry-pick --abort`.
- **Challenge:** bring exactly the sandbar fix onto `main`, nothing else. Flag appears when `main` has that change and none of the other nine.
- **Hints:** Nudge: "You want one page, not the whole book." Specific: "Search Bramble's branch for 'sandbar', then `cherry-pick` that hash." Answer: `git log --oneline experiments --grep sandbar`, then `git cherry-pick <hash>`.
- **Docs:** [git-cherry-pick](https://git-scm.com/docs/git-cherry-pick/2.56.0)

### Lesson 4: Straighten the Route (12 min) → Flag **H**
- **Story:** Your branch zigzags off an old `main`. Replay it on top of today's `main` so the route is one straight line.
- **You learn:** merge vs rebase (graph side by side), `git rebase main`, conflicts during a rebase, `rebase --continue` and `--abort`, the golden rule: don't rebase commits others already have.
- **Challenge:** rebase `shoal-route` onto `main`. One commit conflicts. Resolve it and continue. The flag is in the resolved file once the graph is one straight line.
- **Hints:** Nudge: "Same steps, new starting point." Specific: "Conflict mid-rebase: fix the file, `git add`, then `git rebase --continue`." Answer: `git switch shoal-route`, `git rebase main`, fix, `git add <file>`, `git rebase --continue`.
- **Docs:** [git-rebase](https://git-scm.com/docs/git-rebase/2.56.0) · [Pro Git: Rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)

### Lesson 5: Tidy the Log (12 min) → Flag **O**
- **Story:** Before the fleet reads your log, clean it up: five "oops" commits, a vague message, and one commit that should never ship.
- **You learn:** `git rebase -i HEAD~6`, the todo list (`pick`, `squash`/`fixup`, `reword`, `drop`), `commit --fixup` with `rebase --autosquash`.
- **Challenge:** end with exactly 3 clean commits. The dropped commit is gone, the reworded message matches the brief. The flag shows in the final log.
- **Sim note:** the sim shows the todo list in a friendly editor panel, so nobody gets stuck in Vim.
- **Watch item:** Git 2.55 added a newer `git history` command for simpler rewrites. Check its status in 2.56 docs before deciding whether to teach it here.
- **Hints:** Nudge: "Rewrite only what nobody else has seen." Specific: "Change `pick` to `squash`, `reword` or `drop` in the list." Answer: `git rebase -i HEAD~6`, squash the oops commits, reword the vague one, drop the secret one, save.
- **Docs:** [git-rebase (interactive)](https://git-scm.com/docs/git-rebase/2.56.0#_interactive_mode)

### Lesson 6: Sail With the Fleet (11 min) → Flag **R**
- **Story:** Three ships share one harbor repo. Keep in sync without wrecking anyone's work.
- **You learn:** upstream tracking (`git switch -c x --track origin/x`, `git branch -vv`), `git pull --rebase`, why `push --force` is dangerous, `push --force-with-lease` as the safe version.
- **Challenge:** the teammate helper pushes while you work. Sync with `pull --rebase`, push. Then a forced push is tempting: use `--force-with-lease` and watch it refuse because the remote moved. Fetch, re-check, succeed. The refused push message holds the flag.
- **Tier finale:** ANCHOR. The fleet drops anchor safely past the Shoals, and the Fog thins there.
- **Hints:** Nudge: "Catch up before you send." Specific: "`--force-with-lease` only overwrites what you already saw." Answer: `git pull --rebase`, `git push`, then `git push --force-with-lease` (refused), `git fetch`, retry.
- **Docs:** [git-pull](https://git-scm.com/docs/git-pull/2.56.0) · [git-push](https://git-scm.com/docs/git-push/2.56.0) · [git-branch](https://git-scm.com/docs/git-branch/2.56.0)

---

# Tier 3: Advanced, "The Deep Hold" (about 60 min) → Word **VOYAGE**

**Story:** Something in the Quillfish's lowest hold is feeding the Fog: a corrupted page that keeps spreading through the logbook. Go below decks, into Git's own machinery, and find it. Wick turns out to be the best guide down here, because Wick has broken everything at least once.

**Prerequisite:** Intermediate tier finished, or pass its placement check.

| # | Lesson | Git skill | Time | Flag |
|---|---|---|---|---|
| 1 | The Rescue Rope | `reflog`, recovering lost work | 9 min | **V** |
| 2 | Which Page Went Bad? | `bisect` (manual, then `bisect run`) | 11 min | **O** |
| 3 | Who Wrote the Fog? | `blame`, `log -L`, `log -S` forensics | 9 min | **Y** |
| 4 | Inside the Hold | objects: blobs, trees, commits, `cat-file`, `fsck` | 12 min | **A** |
| 5 | The Ship's Wards | hooks (`pre-commit`, `commit-msg`) | 10 min | **G** |
| 6 | Two Decks at Once | `worktree` (bonus: submodules) | 9 min | **E** |

### Lesson 1: The Rescue Rope (9 min) → Flag **V**
- **Story:** Wick ran `git reset --hard` and deleted a branch. The work looks gone. It isn't.
- **You learn:** `git reflog`, `HEAD@{n}`, restoring a branch with `git branch <name> <hash>`, how long reflog keeps entries.
- **Challenge:** recover the deleted `star-charts` branch and the commit lost to `reset --hard`. The flag is in the recovered commit.
- **Hints:** Nudge: "Git keeps a diary of where HEAD has been." Specific: "Find the hash in `git reflog`, then point a branch at it." Answer: `git reflog`, `git branch star-charts <hash>`, `git reset --hard HEAD@{1}`.
- **Docs:** [git-reflog](https://git-scm.com/docs/git-reflog/2.56.0)

### Lesson 2: Which Page Went Bad? (11 min) → Flag **O**
- **Story:** The lantern check script passed 60 commits ago and fails now. Find the first bad commit without reading all 60.
- **You learn:** `git bisect start`, `good`, `bad`, `reset`, automating with `git bisect run ./check.sh`. Binary search in about 6 steps.
- **Challenge:** bisect manually for 2 rounds, then hand over to `bisect run`. The first bad commit's message holds the flag.
- **Hints:** Nudge: "Halve the haystack each time." Specific: "Mark today bad and the tag `lit` good." Answer: `git bisect start`, `git bisect bad`, `git bisect good lit`, `git bisect run ./check.sh`, `git bisect reset`.
- **Docs:** [git-bisect](https://git-scm.com/docs/git-bisect/2.56.0)

### Lesson 3: Who Wrote the Fog? (9 min) → Flag **Y**
- **Story:** One line in `logbook.txt` reads "the Fog is friendly." Trace who added it, when, and how it changed.
- **You learn:** `git blame` (with `-w` and `-C`), `git log -L` to follow one line range, `git log -S` and `-G` to search changes.
- **Challenge:** blame points to a "move lines" commit, a decoy. Use `blame -C` or `log -L` to find the real origin. The flag is the original author name.
- **Hints:** Nudge: "The last person to touch a line isn't always its author." Specific: "`blame -C` sees through moved lines." Answer: `git blame -C logbook.txt`, then `git log -L 12,12:logbook.txt`.
- **Docs:** [git-blame](https://git-scm.com/docs/git-blame/2.56.0) · [git-log](https://git-scm.com/docs/git-log/2.56.0)

### Lesson 4: Inside the Hold (12 min) → Flag **A**
- **Story:** The corrupted page isn't in any commit. It's a loose object hiding in the hold.
- **You learn:** the `.git` folder tour, blobs, trees, commits, `git cat-file -t/-p`, `git ls-tree`, `git hash-object`, `git fsck --lost-found` for dangling objects. Hashes are content addresses.
- **Challenge:** walk a commit to its tree to a blob by hand, then use `fsck` to find the dangling blob. Its content is the flag (and the Fog's source).
- **Visual:** the graph panel switches to an object view: commit → tree → blob boxes.
- **Hints:** Nudge: "Everything Git stores has an ID, even things nothing points to." Specific: "`git fsck --lost-found` lists orphans." Answer: `git cat-file -p HEAD`, `git cat-file -p <tree>`, then `git fsck --lost-found` and `git cat-file -p <dangling hash>`.
- **Docs:** [git-cat-file](https://git-scm.com/docs/git-cat-file/2.56.0) · [git-fsck](https://git-scm.com/docs/git-fsck/2.56.0) · [Pro Git: Git Objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects)

### Lesson 5: The Ship's Wards (10 min) → Flag **G**
- **Story:** Stop the Fog getting back in. Set wards that check every commit before it enters the log.
- **You learn:** `.git/hooks`, `pre-commit` and `commit-msg`, making a hook executable, `core.hooksPath` for shared hooks, `--no-verify` and why it's a last resort.
- **Challenge:** write a `pre-commit` hook that blocks any file containing "FOG". Try a foggy commit (blocked), then a clean one (allowed). The hook's success message prints the flag.
- **Sim note:** isomorphic-git doesn't run hooks, so the sim runs a JavaScript version of the hook with the same rules.
- **Hints:** Nudge: "A ward is a script that runs before the commit." Specific: "Exit with 1 to block, 0 to allow." Answer: a 4-line `.git/hooks/pre-commit` using `git diff --cached | grep FOG`, then `chmod +x`.
- **Docs:** [githooks](https://git-scm.com/docs/githooks/2.56.0)

### Lesson 6: Two Decks at Once (9 min) → Flag **E**
- **Story:** Patch a leak on `main` while your long repair keeps going on another branch, without stashing or switching.
- **You learn:** `git worktree add ../leak main`, `worktree list`, `worktree remove`. Bonus: what submodules are, `git submodule add` and `update --init`, and when to avoid them.
- **Challenge:** open a second worktree, commit the leak fix there, remove it. Flag appears in `git worktree list` output before removal.
- **Sim note:** worktrees may be companion-only if the command layer can't model them cleanly.
- **Tier finale:** VOYAGE. The corrupted page is gone, the Quillfish is fully restored, and it sets course toward the Eye of the Squall.
- **Hints:** Nudge: "A second deck, same ship." Specific: "`git worktree add <folder> <branch>`." Answer: `git worktree add ../leak main`, `cd ../leak`, fix + commit, `cd -`, `git worktree remove ../leak`.
- **Docs:** [git-worktree](https://git-scm.com/docs/git-worktree/2.56.0) · [git-submodule](https://git-scm.com/docs/git-submodule/2.56.0)

---

## How tiers connect

- **Order:** Intro (HARBOR), Intermediate (ANCHOR), Advanced (VOYAGE). Each about 60 minutes, 6 lessons, same hints, flags and routes.
- **Skipping ahead:** each tier has a 5-question placement check (real commands, not trivia). Passing it unlocks the tier, with no flag penalty.
- **Lantern:** the Harbor's dock lights relight after Intro. Higher tiers clear the Fog further out (the Shoals, then the Deep Hold).
- **Series link:** follows archipelago.md section 5. Each tier stands alone with its own starter repo. Intermediate opens a sea lane through the Shoals. Advanced lights part of the route to the Eye of the Squall and adds a bonus finale scene.
- **Advanced may be companion-first** if the browser can't simulate a lesson fully (hooks, worktrees).
- **Sim coverage:** isomorphic-git doesn't include most Intermediate and Advanced commands (stash, rebase, cherry-pick, bisect, blame, hooks, worktree). The command layer builds them from lower-level calls. Prototype rebase first, since it's the hardest and unlocks cherry-pick.

---

## Terminal keybinds (the Git version of "editor shortcuts")

Taught in Lesson 0 and reinforced as pop-up tips.

- **Up / Down arrow:** previous commands
- **Tab:** autocomplete file and branch names
- **q:** quit the pager (when `git log` fills the screen)
- **Ctrl+C:** cancel a running command
- **Commit editor escape:** if Vim opens, type `:wq` then Enter to save, or `:q!` to bail. Lesson 0 suggests `git config --global core.editor nano` or always using `-m`.

---

## Route A: Simulated in-browser terminal

**Layout:** terminal (left), file viewer/editor (top right), live commit graph (bottom right), story + objective panel (top).

**How it works (chosen approach, no server needed)**
- **isomorphic-git**, a real Git written in JavaScript, runs in the browser on **lightning-fs**, an in-browser file system. Real commits, real hashes, real merges.
- **The remote** is a second repo in the browser (the "harbor"), so clone, fetch, pull, push, and rejected pushes behave like real Git with zero backend.
- **A "teammate" helper** in the app commits to the harbor at scripted moments to set up the pull and conflict challenges.
- **Command layer:** a small parser turns typed commands into isomorphic-git calls and prints Git 2.56 style output. isomorphic-git returns data, not terminal text, so we write the output wording.
- Supports only the commands the lessons teach. Unknown commands get a friendly hint, not an error wall.

**Detecting progress:** each challenge is a list of checks that read the real repo state (refs, commits, index, files) (for example "branch `my-route` exists and has 1 commit not on `main`"). Checks run after every command. Passing all checks reveals the flag.

**Commit graph:** SVG, drawn from the repo's actual commit history after each command. Branch labels and `HEAD` are colored tags.

**Gaps to fill in the command layer (check during build)**
- isomorphic-git has no built-in `revert`, `restore`, or `reset --soft` commands. Each is a short helper built from its lower-level calls (checkout of single files, writing refs, resetting the index).
- Conflict markers: use its merge option that writes conflicted files instead of aborting, then confirm the markers match real Git's.
- **Not chosen:** a hand-written mini Git model (more control, more work) and a hosted Git server (costs money, breaks the static site plan).

**Hints (same system as the Blender lessons)**
- A lantern button opens up to 3 hints, one at a time: **Nudge** (story-voice clue), **Specific** (names the command), **Answer** (exact commands). Typing `hint` in the terminal does the same.
- **Smart offer:** the lantern pulses after about 90 seconds stuck or 3 wrong tries. It never opens a hint by itself.
- **No penalty:** you still get the flag. The finale shows hints used and a star per hint-free lesson.
- **Wrong-answer hints:** common mistakes get a targeted reply, for example `git add .` in Lesson 1 gets "The soggy page got in too. Try `git restore --staged soggy-page.txt`." 

---

## Route B: Guided companion (with real Git)

**Flow:** the page walks through the same story and steps while the learner types in their own terminal.

- **Starter repos:** each lesson provides a small download (zip) or a one-line setup script that builds the starting state.
- **The harbor remote:** a bare repo in a folder, no account or install needed:
  - `git init --bare ../harbor.git`
  - `git remote add origin ../harbor.git`
  - Git treats a folder path as a remote, so clone, push, and pull work offline.
- **Teammate script:** a short `teammate.sh` pushes a commit to the harbor to set up the rejected push (Lesson 5) and the conflict practice.
- **Not chosen:** running Gitea or GitLab in Docker (realistic, but heavy setup for friends).
- **Self-check:** the page lists the expected `git status` / `git log --oneline` output to compare against.
- **Flag reveal:** flags are found in real repo content (Lessons 2 to 6 hide them in history, branches, or remote commits). Lesson 1 uses a tiny, readable `check.sh` that prints the flag when the repo is in the right state.
- **Safety:** scripts are short and plain, with a "read before running" note. Nothing touches files outside the lesson folder.
- **Hints:** same 3 tiers as the simulator. The app can also check a wrong flag letter and reply with a targeted hint.
- **Version check:** Lesson 0 asks for `git --version` and warns if it's older than 2.23 (when `switch` and `restore` arrived).

---

## Git versions: pinning, updating, keeping history

### Pinning
- One manifest file sets `gitVersion: 2.56.0`. All docs links are built from it (`https://git-scm.com/docs/<command>/<version>`).
- Note: git-scm.com only stores a page per version when that page changed, and otherwise shows the closest version. Each link gets verified at build time.
- The Pro Git book links are not versioned (one edition for all).

### Updating for a new Git release (about every 12 weeks)
1. Read the release notes for anything touching taught commands.
2. Bump `gitVersion` in the manifest, which re-points every docs link.
3. Re-check simulated output text (hints and messages change between versions).
4. Run each lesson's checks against real Git in the new version.
5. **Watch list:** Git 3.0 plans changes that touch beginners, such as the default branch name becoming `main` and SHA-256 hashes. These will need a lesson review when they land.

### Keeping historical versions
- Tag each published lesson set in the repo (for example `git-lessons-2.56`).
- Publish older sets under `/archive/git-2.56/` on GitHub Pages.
- Show a banner on archived pages: "You're viewing lessons for Git 2.56. Latest is X."
- Fun bonus: the archive itself is a real Git example worth pointing out to learners.

---

## Verification status of this outline

- **Checked:** Git 2.56 is the latest feature release (GitHub Blog, Sept 28, 2026). `switch` and `restore` have existed since Git 2.23.
- **Not yet checked:** isomorphic-git's exact support for conflict markers and the helpers above (prototype in the build step).
- **Not yet checked:** every versioned git-scm.com link. My network check of git-scm.com was blocked, so the build step should run a link checker and fall back to the nearest version page.
- **Next:** in the build step, run every lesson against real Git 2.56 and copy its exact output text into the simulator.

---

## Decisions made

- **Theme:** the Quillfish at the Harbor, part of the Lantern Isles series.
- **Default branch:** teach `main` everywhere (set in Lesson 0).
- **Remotes:** in-browser second repo (sim) and local bare repo (companion). A real GitHub push is an optional bonus.
- **Hints:** 3 optional tiers per lesson, shared with all programs.

- **Tier words (Macs approved 2026-11-22):** HARBOR (Intro), ANCHOR (Intermediate), VOYAGE (Advanced).

---

## Sources
- [Highlights from Git 2.56 (GitHub Blog)](https://github.blog/2026-09-28-highlights-from-git-2-56/)
- [Git reference docs (git-scm.com)](https://git-scm.com/docs)
- [Pro Git book](https://git-scm.com/book/en/v2)
