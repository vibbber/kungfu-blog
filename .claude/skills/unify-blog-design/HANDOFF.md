# Unify Blog Design — Handoff

## Goal
Apply `wip/landing-page/DESIGN.md` ("Scientific Sanctuary") uniformly across all 144 articles in `content/*.html`.

## Current state
- Analysis done. Skill written at `.claude/skills/unify-blog-design/SKILL.md`.
- **Nothing has been converted.** No article files touched, no stylesheet created.

## Key findings
- 144 articles, each ~400-500 lines with embedded `<style>` blocks.
- Pipeline: `src/pages/[slug].astro` extracts per-article styles, scopes them under `.article-content`, renders via `src/layouts/Article.astro`.
- ~100+ bespoke class names across corpus (`*-card`, `*-box`, `tldr-box`, `key-insight`, `compare-table`, `script`, `mantra`, `closing`, `checklist`, etc.).
- Width/background drift: each article sets its own `body { max-width, background, padding }` → requires `!important` overrides on `.article-content`.

## Plan (encoded in SKILL.md)
**Strategy A (default, ~4-8 hrs):** Global CSS override injected after per-article scoped styles. Zero content files touched. Uses attribute selectors (`[class*="-card"]`) to absorb class-name variance. Forces uniform container width + transparent background + global `--surface` page background.

**Strategy B (escalation, ~30-60 hrs):** Script to strip embedded styles and rename classes to ~15 canonical components across all 144 files. Only if Strategy A leaves >20 visual holdouts.

## Next action
Trigger `/unify-blog-design` to execute Strategy A. May need to restart Claude Code so the new project skill registers.
