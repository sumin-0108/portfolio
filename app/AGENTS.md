# App Router — AGENTS.md

## Module Context

Next.js App Router entry for the portfolio. Owns global layout, page sections, metadata, and site-wide styles in `globals.css`.

## Tech Stack and Constraints

- React Server Components by default. Add `"use client"` only when client hooks or browser APIs are required.
- Fonts and metadata are configured in `layout.tsx`.
- Global styles and design tokens: `globals.css` only. Do not create parallel global CSS files.

## Implementation Patterns

- One primary landing page: `page.tsx`. Split into named sections (`#hero`, `#about`, etc.) with semantic HTML.
- Section content is data-driven where possible; keep copy in the page or a colocated constants block until a CMS is introduced.
- Use `next/image` for finalized assets. Avatar slot remains a placeholder until provided.
- Metadata (`title`, `description`) must reflect the portfolio owner; keep `lang="ko"` on `<html>`.

### Approved profile copy

Use only this content unless the user updates it:

- Name: 오수민
- Tagline: 안녕하세요 오수민입니다. 모바일 앱을 중심으로 그래픽 유저인터페이스를 개발합니다. 모바일 환경에 적합한 유엑스를 연구하고 개발된 앱을 유지보수하여 완성도를 높여갑니다.
- Bio: 현재 그래빅삼성전자에서 모바일 앱을 담당하며 그래픽 유저 인터페이스를 연구합니다.
- Career: 오래된 경력을 가지고 있습니다.
- Contact: sum.oh@samsung.com

## Local Golden Rules

### Do

- Compose sections from shadcn components and Tailwind utilities defined in the root design system.
- Preserve clear vertical rhythm between Hero, stats or highlights, and About blocks.
- Keep CTA links pointed at `mailto:sum.oh@samsung.com` for contact actions.

### Don't

- Do not embed large inline SVG decoration sets unless requested; prefer Lucide icons.
- Do not add route segments or API routes without an explicit task.
- Do not reintroduce dark mode classes or theme switching in layout or pages.
