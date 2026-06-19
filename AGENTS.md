<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Operational Commands

```bash
bun run dev      # local development (http://localhost:3000)
bun run build    # production build
bun run start    # serve production build
bun run lint     # ESLint
```

Package manager: **bun** (prefer `bunx` over `npx` when adding shadcn components).

Add shadcn component:

```bash
bunx shadcn@latest add <component>
```

## Project Context

Personal portfolio for **오수민**. Not a static resume — an AI-era personal branding site that communicates identity, craft, and point of view through layout, typography, and interaction.

Tech stack: Next.js 16 (App Router), shadcn/ui (radix-nova), Lucide React, Tailwind CSS v4, TypeScript.

## Golden Rules

### Immutable

- Light mode only. Do not add dark mode, theme toggles, or `.dark` token blocks.
- Do not hardcode secrets or commit `.env` files.
- Read `node_modules/next/dist/docs/` before using Next.js APIs; this project uses Next.js 16 with breaking changes from training data.
- Profile avatar is not finalized. Keep a placeholder until an asset is provided; do not substitute stock photos without explicit request.

### Do

- Prefer shadcn/ui components from `components/ui/` over custom primitives.
- Use Lucide React for icons (`lucide-react`).
- Keep UI Apple-clean and Linear-tidy: generous whitespace, clear hierarchy, restrained color, consistent spacing scale.
- Extend existing components and patterns before introducing new abstractions.
- Keep sections semantic (`section`, `header`, `main`, heading order).
- Minimize diff scope; change only what the task requires.

### Don't

- Do not build one-off buttons, inputs, or cards when a shadcn component exists or can be added.
- Do not add decorative clutter, heavy gradients, or visual noise that breaks the calm aesthetic.
- Do not invent profile copy, stats, or contact details. Use provided content only.
- Do not add dark mode support or duplicate styling systems outside Tailwind + shadcn tokens in `app/globals.css`.
- Do not over-engineer helpers, wrappers, or abstractions for one-time use.

## Design Principles

- **Apple clarity:** few elements, strong typographic hierarchy, neutral base palette, accent used sparingly.
- **Linear discipline:** aligned grids, consistent radii and spacing, predictable component behavior.
- **shadcn-first:** compose pages from shadcn primitives; customize via Tailwind and CSS variables, not ad-hoc CSS files.
- **Branding over listing:** prioritize narrative flow (Hero, About, future work sections) over dense resume formatting.

Brand tokens live in `app/globals.css` (`--brand-*`, shadcn CSS variables). Adjust tokens before scattering raw color values in components.

## Standards and References

- Path alias: `@/` maps to project root (`components.json`).
- Styling: Tailwind utility classes; `cn()` from `@/lib/utils` for conditional classes.
- Components config: `components.json` (style: radix-nova, iconLibrary: lucide).
- Commits: only when explicitly requested by the user. Write concise messages focused on why.

### Maintenance Policy

When code diverges from these rules (new stack choice, design system change, new sections), propose an `AGENTS.md` update in the same PR or task.

## Context Map

- **[App pages and layouts](./app/AGENTS.md)** — `page.tsx`, `layout.tsx`, section structure, metadata, and page-level content rules.
- **[UI components](./components/AGENTS.md)** — shadcn/ui usage, component additions, and visual consistency rules.
