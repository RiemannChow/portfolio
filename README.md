# RiemannChow's Portfolio

**English** | [简体中文](./README.zh-CN.md)

Currently featured:

| Project | One-liner | Detail page | Repository |
| --- | --- | --- | --- |
| agent-hub | A conversational AI agent that queries data and renders results as structured cards | `./projects/agent-hub/` | [RiemannChow/agent-hub](https://github.com/RiemannChow/agent-hub) |
| GroveMQ | A Go MQTT broker for AI, IoT and connected vehicles | `./projects/grovemq/` | [RiemannChow/GroveMQ](https://github.com/RiemannChow/GroveMQ) |

## Project structure

```
portfolio/
├── index.html                    # Home: project cards + all copy
├── styles.css                    # Base styles (color tokens in :root)
├── detail.css                    # Detail pages: brand themes, dark demo panel, sections
├── i18n.js                       # ZH/EN dictionaries + language switch logic
├── script.js                     # Scroll reveal, card hover glow, footer year
├── assets/
│   ├── agent-hub.svg             # Project icon (shared by home cards, icon row, detail page)
│   ├── grovemq.svg
│   ├── favicon.svg
│   ├── avatar.jpg                # Local copy of the GitHub avatar, no external request
│   ├── wechat-qr.jpg             # Original WeChat card image (opens as the large view)
│   └── wechat-qr-code.jpg        # 650×650 square QR code cropped from the original
├── projects/
│   ├── agent-hub/index.html      # Blue-theme detail page
│   └── grovemq/index.html        # Green-theme detail page
├── .nojekyll                     # Tells Pages to skip Jekyll and publish files as-is
├── .gitignore
├── README.md                     # English (default on GitHub)
└── README.zh-CN.md               # Simplified Chinese
```

All assets use **relative paths** (`./assets/...` on the home page; `../../assets/...`, `../../` back to home and `../<project>/` for cross-links on detail pages), so the site works at both `https://RiemannChow.github.io/` and `https://RiemannChow.github.io/<repo>/` without any code changes.

## Local preview

```bash
cd /Users/Riemann/Code/Workspace/portfolio
python3 -m http.server 8000
# open http://localhost:8000 in your browser
```

Opening `index.html` directly also works, but a local server is closer to the production environment.

## Deploy to GitHub Pages

### 1. Create the repository and push

Create an empty repository on GitHub, then pick one of these names:

- `RiemannChow.github.io` → published at `https://RiemannChow.github.io/` (user site)
- `portfolio` (or any other name) → published at `https://RiemannChow.github.io/portfolio/` (project site)

Then:

```bash
cd /Users/Riemann/Code/Workspace/portfolio
git add .
git commit -m "feat: portfolio site"
git branch -M main
git remote add origin https://github.com/RiemannChow/<repo>.git
git push -u origin main
```

### 2. Enable Pages

Repository → **Settings** → **Pages** → **Build and deployment**:

- Source: `Deploy from a branch`
- Branch: `main` / `/(root)` → Save

The site goes live within a minute or two. Every `git push` updates it automatically — no Actions, no build step.

> To deploy with GitHub Actions instead, switch the Pages Source to **GitHub Actions** and add `.github/workflows/deploy.yml` using the official `actions/configure-pages` + `actions/upload-pages-artifact` + `actions/deploy-pages` steps. **Do not enable both methods at the same time.**

### 3. Custom domain (optional)

Add a plain-text `CNAME` file at the repository root containing only the domain (e.g. `portfolio.example.com`), point a `CNAME` DNS record at `RiemannChow.github.io`, and enable HTTPS in the Pages settings.

## Bilingual switching

The home page and both detail pages share `i18n.js`; the "中文 / EN" pill in the header is the switcher:

- HTML ships with Chinese copy by default (fully readable with JS disabled); translatable elements carry `data-i18n="key"`
- Elements containing `<br>` / `<em>` / `<code>` also get `data-i18n-html` and are replaced via innerHTML; everything else uses textContent
- `data-i18n-label` / `data-i18n-alt` translate aria-label and img alt
- Both dictionaries live in the `ZH` / `EN` objects in `i18n.js`, grouped as `common.*` / `home.*` / `ah.*` / `mq.*`
- Each page has `<body data-page="home|ah|mq">`; switching also updates `document.title` and the meta description
- The choice is stored under `portfolio-lang` in `localStorage` and persists across pages; the active button automatically picks up the current page's brand color

**When changing copy, edit both dictionaries** (the Chinese in HTML is only the no-JS fallback). For new copy: add `data-i18n` to the element, then add the same key to both `ZH` and `EN`. Commands, version numbers and protocol names stay untranslated.

## WeChat QR code

The right-hand card in the About section holds the QR code:

- `assets/wechat-qr.jpg` — the original WeChat card (avatar, name and description); clicking the image opens this large version
- `assets/wechat-qr-code.jpg` — a 650×650 square QR code precisely cropped from the original; this is what the page displays so scanning works

Replace both images together when updating the QR code. The crop finds the coloured pixel bounds of the original, adds a 26px white margin and takes a square. The card's name and caption use the `home.qr.*` keys in `i18n.js`.

## Project detail pages

Both pages share `detail.css`; the layout follows `product.yao-yang.cn/tools/news/`:

1. **Header**: "‹ All projects" back link on the left, GitHub source + a cross-link to the other project on the right
2. **Hero**: copy on the left (icon / name / two-line title with the second line in the brand color / description / CTAs / tags), a dark UI mock panel with a floating label on the right; diagonal light stripes in the background
3. **Why**: three pain-point cards plus a transition line
4. **What it does**: six capability cards with inline SVG icons
5. **Run it**: three commands shown as code blocks
6. **Design trade-offs / Before production**: Q&A cards
7. **Closing CTA + footer**: both keep a GitHub source link

The brand color comes from `<body class="detail-page theme-blue">` (or `theme-green`); change the `--accent` variables in `detail.css` to swap it. `theme-*` on the body overrides the amber buttons and kicker hardcoded for the home page.

The bar chart, hit list, cluster nodes and routing flow inside the dark panel are **pure HTML/CSS illustrations**, not screenshots; the panel is labelled "UI illustration" so it can't be mistaken for live data. All copy on both pages comes from the corresponding repository READMEs.

## Maintenance

### Adding a project

**1) Home card**: copy a full `<a class="tool-card featured lead reveal" ...>` block inside `.tools-grid` in `index.html` (look for the `<!-- 新增项目 -->` comment), then change:

- `id` / `href`: the anchor id and the **in-site detail URL** `./projects/<slug>/`
- `style="--tc:#xxxxxx"`: the card's brand color, used by the hover glow, arrow and badge
- `src="./assets/xxx.svg"`: put the new icon in `assets/`
- `h3` / `.desc` / `.sub-desc` / `.tag`: name, description, highlights, tech tags
- Right-hand decoration: choose `.lead-dots` (three breathing dots) or `.port-stack` (ports/metrics), or remove it
- The two project icons in the header icon row also link to detail pages; add another `<a class="hi">` for the new project

Cards are full-width `.lead` by default. Drop the `lead` class for two small cards per row (`.tools-grid` is already a two-column grid).

**2) Detail page**: copy `projects/agent-hub/index.html` to `projects/<slug>/index.html`, then:

- Change the `<body>` theme class (or add a new `theme-*` set in `detail.css`)
- Update the `../../assets/` icon reference, title, description and facts
- Replace the `.demo-panel` content with a UI mock for this product
- Rewrite the "Why / What it does / Run it / Trade-offs" sections, and fix every GitHub link and cross-link

`../../` on detail pages must point at the site root — don't add another directory level or the relative paths will break.

### Changing copy / colors / avatar

- **All page copy**: the `ZH` and `EN` dictionaries in `i18n.js` — edit both; the Chinese in HTML is only the no-JS fallback
- Bio: key `home.about.bio`; WeChat card: keys `home.qr.*`
- Home theme color: `--accent` in `:root` at the top of `styles.css`, plus the `.hero-title em` gradient
- Detail brand colors: `body.theme-blue` / `body.theme-green` in `detail.css`
- Avatar / QR code: replace `assets/avatar.jpg`, `assets/wechat-qr.jpg`, `assets/wechat-qr-code.jpg` (keep the filenames)
- The footer year is updated by `script.js`; no manual edit needed

## Notes

- Home and detail copy is based on the two repositories' READMEs and descriptions — no invented features, licenses or benchmark numbers.
- The dark product panels are HTML/CSS UI illustrations and are labelled as such, so they aren't mistaken for real screenshots or load-test data.
- Content is written directly in HTML (not rendered by JS) for search engines and offline preview; bilingual switching only replaces existing copy and never changes the DOM structure.
- The site supports Chinese and English, with the choice stored in `localStorage`; with JS disabled it stays fully readable in Chinese.
- Narrow screens and `prefers-reduced-motion` are supported.
