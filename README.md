# Panda Pu

The website for the Panda Pu stories, <https://pandapustories.com>.

It is a small [Hugo](https://gohugo.io) site with no theme, no JavaScript and
no build tools beyond Hugo. Almost everything you will want to change is in
Markdown files in `content/`.

```
content/               ← the words (edit these)
  _index.md              home page
  about.md               About page
  books/
    _index.md            Books page intro
    panda-pu-learns-to-draw.md   one file per book
assets/
  css/main.css           all styles (colours and fonts at the top)
  images/                logo, covers, decorations (see assets/images/README.md)
static/                  files copied as-is (favicon)
layouts/                 HTML templates (rarely need touching)
hugo.toml                site settings: domain, title, image paths
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

1. Copy `content/books/panda-pu-learns-to-draw.md` to a new file, e.g.
   `content/books/panda-pu-goes-outside.md`. The file name becomes the web
   address (`/books/panda-pu-goes-outside/`).
2. Edit the front matter at the top: `title`, `subtitle`, `cover`,
   `description`, `status`, `releaseDate`, `weight` (order in the list), and
   `buy` links.
3. Write about the book below the second `---`.
4. To show it on the home page instead of the current book, set
   `featured: true` on it and `featured: false` on the old one.

## 4. Replace images

Put image files in `assets/images/` using the names listed in
[assets/images/README.md](assets/images/README.md): `logo.png`,
`og-image.jpg`, `covers/<book>.jpg` and optional `decorations/…`. Until a file
exists, the site shows text or a paper-coloured placeholder, so nothing breaks.

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
