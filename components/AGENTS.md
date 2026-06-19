# Components — AGENTS.md

## Module Context

Shared UI layer. shadcn/ui components live under `components/ui/`. Page-level composition imports from `@/components/ui/*`.

## Tech Stack and Constraints

- shadcn/ui (radix-nova preset), Radix primitives, `class-variance-authority`, `tailwind-merge`.
- Icons: Lucide React only (`lucide-react`). Do not add alternative icon libraries.
- Utilities: `cn()` from `@/lib/utils`.

## Implementation Patterns

Add new shadcn components via CLI — do not paste third-party component source from docs without using the project generator:

```bash
bunx shadcn@latest add <component>
```

New components belong in `components/ui/`. Feature-specific compositions (e.g. `HeroSection`) may live in `components/` only when reused across routes or when `page.tsx` grows unwieldy.

Customize appearance through:

1. shadcn variants (`buttonVariants`, etc.)
2. Tailwind classes at call site
3. CSS variables in `app/globals.css`

Avoid inline `style={{}}` for layout and color unless calculating dynamic values.

## Local Golden Rules

### Do

- Match Apple/Linear aesthetic: subtle borders, soft muted backgrounds, rounded-lg to rounded-3xl consistent with page blocks.
- Use shadcn `Button` for CTAs instead of raw `<a>` styled as buttons when interactivity patterns match.
- Keep component files focused; one exported component per shadcn file unless the generator produces coupled parts.

### Don't

- Do not duplicate shadcn components with custom names (e.g. a second `PrimaryButton`).
- Do not install MUI, Chakra, or other UI kits.
- Do not edit generated shadcn files heavily; prefer wrapper components or className extension at usage sites.
- Do not use emojis inside components.
