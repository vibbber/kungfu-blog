---
name: unify-blog-design
description: Apply the "Scientific Sanctuary" design system from wip/landing-page/DESIGN.md uniformly across all 144 blog articles in content/*.html. Default approach overlays a global stylesheet via the Astro pipeline; escalation path normalizes per-article markup. User-invoked only.
---

# Unify Blog Design

Apply `wip/landing-page/DESIGN.md` ("Scientific Sanctuary") uniformly across every article in `content/*.html` (currently 144 files).

The corpus is rendered through `src/pages/[slug].astro`, which extracts each article's embedded `<style>` block, scopes it under `.article-content`, and injects the body via `src/layouts/Article.astro`. Articles use ~100+ bespoke component class names (`*-card`, `*-box`, `tldr-box`, `key-insight`, `compare-table`, `phase-card`, `script`, `mantra`, `closing`, `checklist`, etc.).

## Before doing anything

1. Re-read `wip/landing-page/DESIGN.md` end to end. The token table, "No-Line Rule," "Glass & Gradient" rule, and Pebble button shape are load-bearing.
2. Skim `wip/landing-page/code.html` for the Tailwind config block — it is the canonical color/radius/font token list.
3. Read `src/pages/[slug].astro` and `src/layouts/Article.astro` and `src/layouts/Base.astro` to confirm the rendering pipeline still matches what this skill assumes.
4. Sample 5-10 articles spanning the class-name space (`be-the-anchor.html`, `wired-at-bedtime-fix.html`, `the-second-opinion-trap.html`, `food-talk-that-protects-body-image.html`, plus 3-5 random others). Note which bespoke classes recur.
5. Confirm with the user which strategy to run (default = Strategy A).

## Strategy A — Token Override (default, low-risk)

Goal: visual unification with **zero edits to the 144 HTML files**.

### Steps

1. **Build the canonical stylesheet** at `src/styles/article-design-system.css`:
   - Define DESIGN.md tokens as CSS variables on `.article-content` (palette: `--primary #00685c`, `--primary-container #2d8175`, `--secondary #ac3224`, `--secondary-container #fe6d59`, `--surface #faf9f6`, `--surface-container #efeeeb`, `--surface-container-low #f4f3f0`, `--surface-container-high #e9e8e5`, `--surface-container-highest #e3e2df`, `--surface-container-lowest #ffffff`, `--on-surface #1b1c1a`, `--outline-variant #bec9c5`, `--primary-fixed-dim #85d5c7`).
   - **Force a uniform article container** — every article currently sets its own `body { max-width, background, padding }` which the pipeline rewrites to `.article-content { ... }`, so widths drift (720/760/800/none) and some articles paint their own background. Override with:
     ```css
     .article-content {
       max-width: 720px !important;
       margin: 0 auto !important;
       padding: 2rem 1.5rem !important;
       background: transparent !important;
     }
     ```
     The `!important` is required here because per-article scoped styles are equally specific and load first. The transparent background lets the global page surface show through, so inner cards pop via `surface-container-lowest` per DESIGN.md's "structure through background shifts" rule.
   - **Set the page background once globally** in `src/layouts/Base.astro` — change `body { background: var(--bg); }` to use `--surface #faf9f6`, or add a body-level background rule in `Article.astro`. This ensures every article sits on the same canvas regardless of what its embedded styles try to do.
   - Load Noto Serif + Inter via `<link>` in `Base.astro` (extend the existing Google Fonts call — do not duplicate it).
   - Set body copy in `.article-content` to Inter, headings (`h1`, `h2`, `h3`) to Noto Serif. Left-align by default.
   - Replace `header` `border-bottom` with a `surface-container-low` background block. Apply the **No-Line Rule**: any `border` / `border-bottom` / `border-top` declared by per-article styles should be neutralized (`border: none !important` scoped to common offenders like `header`, `.tldr-box`, `.tip-box`, `.checklist`, `footer`).
   - Map the recurring component classes via attribute selectors so per-article naming variance is absorbed:
     - `.article-content [class*="-card"]`, `.article-content [class*="-box"]` → `background: var(--surface-container-lowest); border-radius: 2rem; padding: 2rem; border: none; box-shadow: 0 0 40px rgba(27,28,26,0.06);`
     - `.article-content .key-insight, .article-content [class*="insight"], .article-content [class*="callout"]` → golden-hour gradient `linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 100%)`, white text, `border-radius: 3rem`, generous padding.
     - `.article-content .mantra, .article-content [class*="closing"]` → same gradient treatment, centered, serif.
     - `.article-content .script, .article-content [class*="script"]` → `surface-container-high` fill, no left border, `border-radius: 1rem`, italic Noto Serif.
     - `.article-content .compare-table, .article-content table` → `border-collapse: separate; border-spacing: 0 8px`, cells get `surface-container-low` / `surface-container-lowest` alternation, `border-radius: 1rem`, no borders.
     - `.article-content .tldr-box` → `surface-container` fill, `border-radius: 2rem`, no border, Inter, with the anchor line in `--primary`.
     - `.article-content .checklist` → `surface-container-low` fill, checkmarks tinted `--primary`.
   - Override `.topic-badge` style: `surface-container-high` fill, `--primary` text, `border-radius: 9999px`.
   - Kill all hard drop shadows: `* { box-shadow: 0 0 40px rgba(27,28,26,0.06) !important; }` is too blunt — instead enumerate the common selectors (`[class*="-card"]`, `[class*="-box"]`, `.blog-img`, `.phase-card`, etc.).
   - Round any `border-radius` < 1rem up to `1rem` minimum (per the "no sharp corners < 16px" rule).
   - Keep section padding generous: `h2 { margin-top: 4rem; }`, `section > * + * { margin-top: 1.5rem; }`.
2. **Wire it into the pipeline**: in `src/pages/[slug].astro`, import the new stylesheet and inject it *after* the scoped per-article `<style>` so the override cascades win. Do not delete the per-article style extraction — it still provides per-article spacing/layout.
3. **Spot-check** by running `npm run build` (or `npm run dev`) and visually reviewing 10 articles spanning the class-name diversity. Look for:
   - Hard 1px borders that survived (add to override list).
   - Coral / sage green legacy accents bleeding through (override the specific class).
   - Center-aligned serif over left-aligned sans (DESIGN.md forbids this — fix in CSS).
   - Sharp corners (< 1rem radius) anywhere.
4. **Iterate**: each holdout article that can't be saved by global CSS is a candidate for Strategy B.

### What NOT to do in Strategy A

- Do **not** edit any file in `content/*.html`. The whole point is global override.
- Do **not** rewrite `Article.astro` markup beyond loading the new stylesheet.
- Do **not** introduce Tailwind. The site is plain CSS-in-Astro; keep it that way.
- Do **not** ship without visually checking at least 10 articles across the class-name space.

## Strategy B — Normalize + Replace (escalation, only if A leaves too many holdouts)

Use this only when Strategy A's spot-check shows >20 articles still visually broken.

1. Inventory every unique class name across `content/*.html` (script: extract `class="..."` with regex, dedupe).
2. Build a class-rename map collapsing the bespoke vocabulary into ~15 canonical components: `tldr-box`, `key-insight`, `callout`, `card`, `script`, `tip`, `checklist`, `compare-table`, `phase-card`, `mantra`, `closing`, `badge`, `image`, `note`, `quote`.
3. Write a Node script that, for each `content/*.html`:
   - Strips the entire embedded `<style>` block.
   - Strips the `<head>` (the pipeline only uses the body).
   - Renames classes per the map.
   - Writes the result back.
4. Run on a single article first, build, eyeball. Then expand in batches of 10. Keep a list of articles that need bespoke handling.
5. Articles with truly unique structures (custom diagrams, infographics) get hand-restyled in a final pass.
6. Commit in batches (10-20 articles per commit) so review and rollback are tractable.

## Verification (both strategies)

- `npm run build` succeeds.
- 10 sampled articles render in browser without console errors.
- No 1px solid borders visible in sample.
- All articles have **identical max-width** and **identical page background** — no per-article width drift, no second background color on the article container.
- No pure black text.
- All radii ≥ 1rem.
- Body font is Inter; headlines are Noto Serif.
- Primary CTA / hero accent uses the `#00685c → #2d8175` gradient.
- Legacy sage green (`#5C8A5A`) and coral (`#E8A598`) are gone from the rendered output.

## Reporting back to the user

After running, report:
- Which strategy was used.
- How many articles were touched (Strategy A: 0 content files + 1 stylesheet + 1 pipeline edit; Strategy B: N content files).
- A list of articles that still need manual attention.
- A diff summary, not a per-article change log.
