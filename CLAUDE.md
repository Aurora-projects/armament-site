# armament-site — notes for Claude

The public site for Armament RPG, live at https://aurora-projects.github.io/armament-site/.
Plain HTML + one stylesheet (`css/style.css`) + one small script (`js/feed.js`). No framework, no build step.

## Rules from the owner (always)

- **Never put the owner's real name anywhere**: not in files, commits, commit messages or PR text. The game is credited to "Aurora".
- **Before committing in a fresh checkout**, set the repo identity:
  `git config user.name "Aurora"` and `git config user.email "aurora@aurora-projects.invalid"`.
  This repo is public, so a commit under any other identity exposes it.
- **No GitHub or social links** on the site, and **no links to any of the owner's personal sites**.
- **Never invent copy.** Lines the owner wrote must stay word for word. Anything in `[brackets]` is a placeholder and stays
  visibly bracketed (styled with `.todo`).
- Pixel art stays crisp (`image-rendering: pixelated`); resize the emblem and wordmark with nearest-neighbour only.
- Respect `prefers-reduced-motion` (ticker, feed and emblem drift stop).
- Must work at 390 px and 1280 px wide.

## Where things are

- `index.html`: sections with ids `ticker, hero, status, dossier, systems, feed, transmissions, directives, overseer-notice,
  contractors, footer`. SYSTEMS ONLINE is 9 cards (3 x 3).
- `log/YYYY-MM-DD-slug.html`: one page per dev log entry, with prev / next links; listed newest first in `index.html`.
  `tools/new-transmission.html` generates a new entry; README.md has the steps.
- `credits.html` (full licence texts), `press.html`, `404.html` (links assume the `/armament-site/` path).
- Screenshots: `img/name.webp` + `img/name.png`, max 1600 px wide. Clips go in `media/` (see the commented block in the feed).

## Publishing

Push to `main` → `.github/workflows/pages.yml` deploys to GitHub Pages, then deletes older workflow runs and deployment
records (they show the account that pushed). If you work on a branch, the site only changes once it's merged into `main`.

## Checking

From the folder that contains this repo, run `python -m http.server 8000` and open http://localhost:8000/armament-site/.
Check every link and image, the ticker and the feed, at 390 px and 1280 px.
