# glennsheppard.dev — Claude Code Guide

Personal developer portfolio site — a single-page site (About, Projects, Contact) deployed via Netlify.

---

## Tech Stack

| Concern    | Choice                                                                   |
| ---------- | ------------------------------------------------------------------------ |
| Framework  | Astro (static site generation)                                           |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`)                                    |
| Language   | TypeScript                                                               |
| Testing    | Vitest + jsdom                                                           |
| Linting    | oxlint + `eslint-plugin-astro` (for `.astro` files oxlint doesn't cover) |
| Formatting | oxfmt + `prettier-plugin-astro`                                          |
| Deployment | Netlify                                                                  |

This is not a SvelteKit project — it's the only repo in `~/Development/Personal` on Astro rather than SvelteKit, so it does **not** use the `sveltekit-toolkit` Claude Code plugin that `meal-planner`, `sheppakai-budget`, and `synapse` share (see `../claude-sveltekit-toolkit`). The user-level `tailwind-patterns` skill (`~/.claude/skills/tailwind-patterns`) still applies here since it isn't plugin-gated.

---

## Project Structure

```
src/
├── pages/
│   └── index.astro          # The entire site is one page
├── layouts/
│   └── BaseLayout.astro
├── components/               # About, Contact, Footer, GithubButtons, Hero,
│                              # ProjectCard, Projects, Reveal, Title (.astro)
├── data/
│   └── content.ts            # Site copy / project list, data-driven
├── styles/
├── scripts/
└── assets/
```

- `Reveal.astro` has a co-located `Reveal.test.ts`; `src/scripts/reveal.test.ts` and `src/data/content.test.ts` are the other two test files — tests live next to what they cover, not in a separate `tests/` tree.
- `src/data/content.ts` is the place to change site copy/projects rather than editing markup directly in components.

---

## Commands

```bash
npm run dev            # Astro dev server
npm run build           # Production build
npm run preview         # Preview production build
npm run check            # astro check (TypeScript + Astro diagnostics)
npm run test              # Vitest (run once)
npm run test:watch        # Vitest watch mode
npm run lint               # oxlint . && eslint "**/*.astro"
npm run format              # oxfmt . && prettier --write "**/*.astro"
npm run format:check         # oxfmt --check . && prettier --check "**/*.astro"
```

Node `>=24.16.0` (see `engines` in `package.json`).

---

## Conventions

- Astro components (`.astro`) aren't covered by oxlint — `eslint-plugin-astro`/`prettier-plugin-astro` handle linting and formatting for them; oxlint/oxfmt cover the `.ts` files.
- `astro.config.mjs` sets `site: "https://glennsheppard.dev"` and adds `@astrojs/sitemap` — keep both in sync if the domain ever changes.
