# DocMind

> Citation-first AI document workspace for students, researchers, and job seekers who need answers they can verify.

[![CI](https://github.com/Flamki/docmind-source-truth/actions/workflows/ci.yml/badge.svg)](https://github.com/Flamki/docmind-source-truth/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
**GitHub -> https://github.com/Flamki/docmind-source-truth**
**Live -> https://docmind-source-truth.vercel.app**

DocMind is a polished full-stack product submission for the Digital Heroes Full Stack Developer Trial. It follows the handbook's DocQuery-style product direction: manage source documents, ask focused questions, inspect citations, and use a focused document workspace with search, filters, settings, dark mode, and error states.

## Features

- Manage PDF, DOCX, or TXT documents with clear processing states.
- Browse, search, filter, sort, select, and bulk-act on documents.
- Ask questions against a selected document and inspect page-level citations.
- Navigate with a sidebar, breadcrumbs, mobile tabs, and Cmd/Ctrl+K palette.
- Handle empty, loading, success, not-found, and caught-error states.
- Switch between light and dark themes with shared design tokens.
- Ship with SEO metadata, robots.txt, sitemap.xml, docs, and open-source files.

## Tech Stack

Next.js App Router + React 19 + TypeScript strict + Tailwind CSS v4 + shadcn/ui + Radix primitives + Zod. This matches the Digital Heroes handbook's recommended default stack while keeping the production hard rules explicit: real Postgres persistence, real auth, server-side validation, and secrets through env vars.

Recommended production services:

- Database: Supabase Postgres, Neon, or Vercel Postgres.
- Auth: Supabase Auth, Clerk, or Auth.js with secure httpOnly cookies.
- Hosting: Vercel or Netlify.
- CI: GitHub Actions lint, typecheck, and build.

## Quick Start

```bash
git clone https://github.com/Flamki/docmind-source-truth.git
cd docmind-source-truth
cp .env.example .env
npm install
npm run dev
```

Local app: http://localhost:3000

## Environment Variables

| Variable               | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`  | Absolute public URL used for canonical and social metadata. |
| `DATABASE_URL`         | Postgres connection string for production persistence.      |
| `AUTH_SECRET`          | Session/auth signing secret. Keep server-side only.         |
| `AUTH_TRUST_HOST`      | Auth host trust flag for production deployments.            |
| `GOOGLE_CLIENT_ID`     | OAuth client id if Google auth is enabled.                  |
| `GOOGLE_CLIENT_SECRET` | OAuth client secret. Never expose client-side.              |
| `OPENAI_API_KEY`       | Server-side AI key for retrieval/chat once wired.           |

## Architecture

The current UI is a complete product shell with honest empty states. The production architecture is documented in [docs/architecture.md](docs/architecture.md): Postgres stores users, workspaces, documents, chunks, conversations, citations, and audit events; server actions validate with shared Zod schemas; auth gates every write.

## Testing

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Authentication

The UI includes sign-in and sign-up screens, but no seeded account is included. Wire Supabase Auth, Clerk, or Auth.js before final production submission.

## Roadmap

- [x] Polished document workspace UI.
- [x] Document CRUD surfaces, command palette, dark mode.
- [x] Trial-ready README, docs, OSS files, CI, SEO crawl files.
- [ ] Wire Supabase/Neon Postgres persistence.
- [ ] Wire auth with Supabase Auth, Clerk, or Auth.js.
- [ ] Add Playwright e2e tests for sign-in, search, and document Q&A.
- [x] Deploy to Vercel and publish the live URL.

## Screenshots

Place final screenshots in `docs/screenshots/` after local or production QA:

- Landing page
- Documents table
- Document chat with citations

## Digital Heroes Trial Credit

Built for the Digital Heroes Full Stack Developer Trial. The implementation follows the handbook's emphasis on product quality, TypeScript strictness, full-stack readiness, documentation, SEO, and open-source hygiene.

## License

MIT - see [LICENSE](LICENSE).
