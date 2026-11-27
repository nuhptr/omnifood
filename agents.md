# Omnifood — Agent & Engineering Guidelines

## 1. Project Architecture

All application source code lives inside `/app`. The repository root is reserved for project configuration and documentation (`package.json`, `vite.config.js`, `.prettierrc`, `.prettierignore`, `.gitignore`, `agents.md`, `readme.md`, `content.md`, `license`).

Vite (`root: "app"`) with `vite-plugin-html-inject` compiles `<load src="./sections/<section>/<section>.html" />` partials at dev/build time so no client-side HTML loader JavaScript is needed.

```text
app/
├── index.html                  # Document shell using <load src="./sections/<section>/<section>.html" />
├── sections/                   # Co-located HTML + CSS per section
│   ├── header/                 # header.html + header.css
│   ├── hero/                   # hero.html + hero.css
│   ├── featured/               # featured.html + featured.css
│   ├── how/                    # how.html + how.css
│   ├── meals/                  # meals.html + meals.css
│   ├── testimonials/           # testimonials.html + testimonials.css
│   ├── pricing/                # pricing.html + pricing.css
│   ├── cta/                    # cta.html + cta.css
│   └── footer/                 # footer.html + footer.css
├── styles/                     # Global W3C native CSS Nesting + BEM + @layer
│   ├── main.css                # Cascade layer order & imports (global + section styles)
│   ├── tokens.css              # :root design tokens
│   ├── base.css                # Scoped resets (no global *), typography, containers
│   └── components.css          # Reusable BEM UI primitives
├── scripts/                    # Minimal native ES Modules split by responsibility
│   ├── main.js                 # App entry point & dynamic copyright year
│   ├── navigation.js           # Mobile nav drawer & sticky header observer
│   ├── meals-filter.js         # Diet category filtering in Meals section
│   └── cta-form.js             # Signup form validation & submission feedback
└── assets/
    └── img/                    # Organized by section under assets location
        ├── brand/
        ├── hero/
        ├── featured/
        ├── how/
        ├── meals/
        ├── testimonials/
        ├── gallery/
        └── cta/
```

## 2. Visual & Design System Rules

- **Aesthetic Direction**: High-contrast editorial technical sportswear / Swiss grid style inspired by OFFFORM.
- **Palette**:
  - Signature Accent: `#f24e1e` (vivid vermilion orange-red)
  - Primary Ink / Dark Surface: `#0d0d0d`
  - Canvas / Light Surface: `#f6f5f2` and `#ffffff`
  - Studio Card Surface: `#efeeea`
  - Muted Technical Gray: `#666666`
- **Typography**:
  - Display / Headings: `Barlow Condensed` (700/800, uppercase, tight leading)
  - Body Copy: `Inter` (400/500/600)
  - Technical Labels / Indices: `IBM Plex Mono` (400/500, uppercase, wide tracking)
- **Geometry**: Crisp architectural hairlines (`1px solid`), sharp corners (`0px`–`2px` radius on buttons/cards), circular avatars/badges only where intentional.

## 3. HTML Conventions

- Co-locate each section's markup and stylesheet inside `/app/sections/<section>/` (`<section>.html` + `<section>.css`) and compose them in `/app/index.html` using `<load src="./sections/<section>/<section>.html" />` (processed by `vite-plugin-html-inject`).
- Use semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`) and maintain a single `<h1>` per page with sequential heading levels (`<h2>`, `<h3>`).
- Use `<button type="button">` for non-submit interactive controls and `<a>` strictly for navigation.
- Prioritize LCP by adding `fetchpriority="high"` (never `loading="lazy"`) on the hero image; apply `loading="lazy"` and explicit `width`/`height` attributes to off-screen images.
- Include `autocomplete` and `inputmode` tokens on form inputs (`name`, `email`, etc.).

## 4. CSS Conventions (W3C Native Nesting + BEM)

- **Cascade Layers**: Declare layer order upfront in `app/styles/main.css`:
  `@layer reset, tokens, base, components, sections, utilities;`
- **No Global `*` Reset**: Apply reset rules to specific element lists inside `@layer reset`.
- **Design Tokens**: Define all colors, typography scales, spacing, borders, and motion timings as CSS custom properties in `:root` (`app/styles/tokens.css`). Never hardcode nontrivial values inline.
- **BEM Naming Convention**: Name classes strictly with `block`, `block__element`, and `block--modifier` (e.g., `.hero`, `.hero__title`, `.button--primary`).
- **W3C Native CSS Nesting**: Group element, modifier, pseudo-class, and `@media` rules inside their parent block using valid native W3C syntax — **never** Sass string-concatenation syntax (`&__element` is invalid in native CSS):
  ```css
  .hero {
      background-color: var(--color-accent);

      & .hero__title {
          font-family: var(--font-display);
      }

      &.hero--compact {
          padding-block: var(--space-lg);
      }

      @media (max-width: 59em) {
          padding-block: var(--space-md);
      }
  }
  ```
- Prefer `overflow: clip` over `overflow: hidden` when only clipping, `dvh` over `100vh` for mobile overlays, and `:hover:not(:disabled)` to avoid overmatching.

## 5. JavaScript Conventions

- Keep JavaScript minimal: use HTML/CSS for static composition and smooth scrolling, reserving JS for genuine interactivity.
- Use native ES Modules (`type="module"`) split by concern inside `/app/scripts/`.
- Never use inline event handlers (`onclick`, etc.); always bind via `addEventListener()`.

## 6. Assets Organization

- Keep all image assets inside `/app/assets/img/` grouped into section-named folders (`brand`, `hero`, `featured`, `how`, `meals`, `testimonials`, `gallery`, `cta`).
- Reference asset paths relative to `/app/index.html` (e.g., `./assets/img/hero/hero.png`).

## 7. Formatting (Prettier)

Formatting rules are synced with `.prettierrc` (sourced from VS Code user settings):
- `tabWidth`: `4`
- `printWidth`: `100`
- `singleQuote`: `false`
- `jsxSingleQuote`: `false`
- `semi`: `false`
- `htmlWhitespaceSensitivity`: `"ignore"`
- `bracketSameLine`: `true`

## 8. Git & Release Workflow

- Follow Conventional Commits v1.0.0 (`feat`, `fix`, `refactor`, `docs`, `chore`, etc.) with `Co-authored-by: Gemini <gemini@google.com>`.
- Work on short-lived branches (`feature/<name>`, `fix/<name>`, `hotfix/<name>`, `docs/<name>`, `chore/<name>`) and merge via Pull Request.
- Tag releases with Semantic Versioning (`vMAJOR.MINOR.PATCH`).
