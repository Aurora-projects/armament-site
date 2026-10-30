# armament-site

The public site for **Armament RPG** by Aurora. Plain HTML + one stylesheet (`css/style.css`) + one small script (`js/feed.js`). No build step.

Every push to `main` deploys to GitHub Pages through `.github/workflows/pages.yml`. (One-time setup: repo **Settings → Pages → Source: GitHub Actions**.)

## Editing without installing anything

On github.com, open any file, click the **pencil** icon, change it, then **Commit changes**. The site redeploys in about a minute. To upload pictures or clips, open the folder on github.com and use **Add file → Upload files**.

For bigger edits, press `.` on the repo page to open the full web editor (github.dev).

## What lives where

| Thing | File |
| --- | --- |
| Ticker, hero, status, dossier, systems, feed, directives, notices, credits | `index.html` (one section each, ids match the section names) |
| Dev log pages | `log/YYYY-MM-DD-slug.html` |
| Full licence texts | `credits.html` |
| Press kit | `press.html` (screenshots zip in `press/`) |
| Colours, fonts, layout | `css/style.css` (colours are at the top) |
| Screenshots | `img/` (`name.webp` + `name.png`) |
| Clips | `media/` |

Anything still in `[brackets]` is a placeholder waiting for you (they show in orange on the page).

## Add a log entry (transmission)

1. Open `tools/new-transmission.html` in your browser (double-click it).
2. Fill in date, tag, title, one-line summary and the entry. Fill in the current newest entry's file name and title (the first line of the TRANSMISSIONS list in `index.html`).
3. **Download page** and put the file in `log/`.
4. Paste output **2** at the top of the list in `index.html`, right under `<ol class="log-list" reversed>`.
5. In the old newest log page, replace `<div class="next"></div>` with output **3**.
6. Commit.

## Add a screenshot

1. Make a `.webp` and a `.png` of it, at most 1600 px wide (any image editor; on Windows, Paint can save PNG, and squoosh.app makes WebP in the browser). Name them the same, e.g. `img/mines.webp` and `img/mines.png`. A PNG alone works too: just leave out the `<source>` line.
2. In `index.html`, find `SURVEILLANCE FEED` and copy one `<figure class="frame">…</figure>` line. Change the file names, the `alt` text, and the CAM label (`CAM 06 · …`).
3. To also offer it in the press kit, add it to `press.html` and to `press/armament-screenshots.zip`.

## Add a clip

1. Put an `.mp4` or `.webm` (15–30 s, keep it under ~10 MB) in `media/`.
2. In `index.html`, under SURVEILLANCE FEED there's a commented `CLIPS` block. Copy the `<figure>` line out of the comment, set `src="media/your-file.mp4"` and the CAM label. Clips play muted and on loop, and scroll with the rest of the strip.

## Test locally

From the folder that **contains** this repo:

```bash
python -m http.server 8000
```

Then open http://localhost:8000/armament-site/ (the 404 page links assume the site lives under `/armament-site/`, the same as on GitHub Pages).
