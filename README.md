# Panda Pu

The website for the Panda Pu stories, <https://pandapustories.com>.

It is a small [Hugo](https://gohugo.io) site with no theme, no JavaScript and
no build tools beyond Hugo. Almost everything you will want to change is in
Markdown files in `content/`.

```
content/               ← words and pictures (edit these)
  _index.md              home page
  images/                site-wide images: logo, link preview, decorations
  about/
    index.md             About page
  books/
    _index.md            Books page intro
    panda-pu-learns-to-draw/   one folder per book
      index.md             the book's details and text
      cover.jpg            its cover (add when ready)
assets/css/main.css      all styles (colours and fonts at the top)
static/                  site icons, copied as-is
layouts/                 HTML templates (rarely need touching)
hugo.toml                site settings: domain, title, description
.github/workflows/hugo.yaml   automatic deployment
```

## 1. Install Hugo

On macOS: `brew install hugo`. On Windows: `winget install Hugo.Hugo.Extended`.
Other systems: <https://gohugo.io/installation/>. You need version 0.146 or newer
(`hugo version` to check).

## 2. Run the site locally

```sh
hugo server
```

Open <http://localhost:1313>. The page reloads as you save files. Press
Ctrl+C to stop.

In VS Code you can also press **F5** (Run site), which starts the server and
opens the site in Chrome, or **Cmd/Ctrl+Shift+B** to start the server only.
To build the finished site into `public/` as GitHub does, run
`hugo build --gc --minify` (or the **Hugo: build** task).

## 3. Add a new book

1. Copy the folder `content/books/panda-pu-learns-to-draw/` and rename the
   copy, e.g. `content/books/panda-pu-goes-outside/`. The folder name becomes
   the web address (`/books/panda-pu-goes-outside/`).
2. In the new folder's `index.md`, edit the front matter at the top: `title`,
   `subtitle`, `description`, `status`, `releaseDate`, `weight` (order in the
   list), and `buy` links.
3. Write about the book below the second `---`.
4. Put the cover in the same folder as `cover.jpg` (or `cover.png` /
   `cover.webp`), about 1000 px wide.
5. To show it on the home page instead of the current book, set
   `featured: true` on it and `featured: false` on the old one.

## 4. Replace images

Images sit next to the page that uses them and are found by their name. Any
extension works (`.jpg`, `.png`, `.webp`). Until a file exists, the site shows
text or a paper-coloured placeholder, so nothing breaks.

Any page can have its own images: turn `page.md` into a folder `page/` with
an `index.md`, put the images beside it, and use them in the text as
`![Description](picture.jpg)`.

### Image sizes

The site publishes your files exactly as they are. It does not resize or
compress them, so export a web copy of each picture. Don't upload the print
file. The sizes below are about three times the size each image appears on
screen, so they stay sharp on phones and high-resolution displays.

| File | Where it appears | Shown at (max) | Export at | Format |
|---|---|---|---|---|
| `content/books/<book>/cover.jpg` | Book lists, home page, book page | 240 px wide | **1000 px wide**, any height | JPG or WebP |
| `content/books/<book>/og-image.jpg` | Optional link preview for that book (see below) | – | **1200 × 630 px** | JPG |
| `content/images/og-image.jpg` | Link preview for every other page | – | **1200 × 630 px** | JPG |
| `content/images/logo.png` | Title artwork at the top of the home page | 448 px wide | **1400 px wide** | PNG, transparent background |
| `content/images/coming-soon.png` | Drawing above "More stories are coming" | 144 px wide | **450 px wide** | PNG, transparent background |
| `content/images/footer.png` | Drawing above the footer on every page | 96 px wide | **300 px wide** | PNG, transparent background |
| Pictures in page text | Inside the text column | 576 px wide | **1200–1600 px wide** | JPG or WebP |

**Covers**

- **Shape.** Any proportions work, because the cover is shown 240 px wide and
  its height follows. Use the same proportions for every book in the series so
  the book list lines up. Until a cover is added, the placeholder is 4:5
  (portrait). If your covers use a different shape, change `aspect-ratio` in
  `.cover-placeholder` in `assets/css/main.css` to match.
- **Background.** The cover should be a full rectangle with no transparent
  background. The site adds a soft shadow as if the book were resting on
  paper, and that only looks right with square edges.
- **Legibility.** The title must still be readable 240 px wide, so check a
  small preview of the cover before exporting.
- **Link preview.** The cover doubles as the preview picture when a book's
  page is shared. Most apps crop previews to a wide 1.91:1 frame, which cuts
  off the top and bottom of a portrait cover. For a better preview, add an
  `og-image.jpg` (1200 × 630) in the same book folder, for example the cover
  on a plain background with space either side. It is used instead of the
  cover automatically.

**All images**

- **Colour.** Export in **sRGB**. Print files are often CMYK, and CMYK colours
  look wrong in browsers.
- **File size.** Aim for under **300 KB** per image, and under 150 KB for the
  small decorations. For JPG, quality 80–85% is usually plenty.
- **Background colour.** The page background is cream (`#fbf7ee`), not white.
  Transparent PNGs blend into it. A picture with a white background will show
  a faint white box.
- **File names.** Use lower-case names without spaces, e.g.
  `panda-at-the-easel.jpg`.

The site icons are in `static/`. `favicon.ico` is the browser-tab icon, a
close crop of the panda's head at 16, 32 and 48 px. `apple-touch-icon.png`
(180 px), `icon-192.png` and `icon-512.png` hold the full artwork for phone
home screens and are listed in `site.webmanifest`. To regenerate them from a
new 512 px image, run [ImageMagick](https://imagemagick.org) from inside
`static/`:

```sh
magick logo.png -background "#fbf7ee" -flatten flat.png
magick flat.png -crop 330x330+91+140 +repage -define icon:auto-resize=48,32,16 favicon.ico
magick flat.png -resize 180x180 apple-touch-icon.png
magick flat.png -resize 192x192 icon-192.png
cp flat.png icon-512.png && rm flat.png
```

## 5. Change the custom domain

The domain appears in two places:

1. `baseURL` in `hugo.toml`.
2. GitHub: **Settings → Pages → Custom domain**. With GitHub Actions
   deployment this setting takes the place of a `CNAME` file, which is not
   needed and would be ignored.

At your domain registrar, point the domain at GitHub Pages:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153 |
| CNAME | www | `<your-github-username>.github.io` |

After DNS has updated (this can take a few hours), tick **Enforce HTTPS** in
the same Settings page. It is also worth verifying the domain under your
GitHub account's **Settings → Pages** to protect it from takeover.

## 6. How deployment works

Every push to the `main` branch runs `.github/workflows/hugo.yaml`, which
installs Hugo, builds the site and publishes it to GitHub Pages. It takes a
minute or two, and you can watch it in the repository's **Actions** tab.

One-time setup: in the repository go to **Settings → Pages → Build and
deployment** and set **Source** to **GitHub Actions**.

To upgrade Hugo later, change `HUGO_VERSION` in the workflow file.

## Adding other pages later

- A single page, such as Characters: create `content/characters.md` with a
  `title` and `menus: main` in the front matter. It appears in the navigation.
  Use `weight` to set its position.
- A section with several entries, such as News: create `content/news/_index.md`
  (with `menus: main`) and one Markdown file per entry in `content/news/`.

## Before publishing

Run `grep -rn TODO content` to find every piece of placeholder text.

## Fonts

Headings use [Fraunces](https://fonts.google.com/specimen/Fraunces) and body
text uses [Literata](https://fonts.google.com/specimen/Literata). Both are
under the SIL Open Font License and load from Google Fonts in
`layouts/baseof.html`. If they fail to load, the site falls back to Georgia.
