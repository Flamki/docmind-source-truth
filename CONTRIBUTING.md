# Contributing

Thanks for helping make DocMind better.

## Local Setup

Follow the quick start in [README.md](README.md):

```bash
cp .env.example .env
npm install
npm run dev
```

## Branches And Commits

- Use short feature branches: `feat/document-search`, `fix/upload-error-state`.
- Use Conventional Commits: `feat: add document filters`, `fix: handle empty uploads`.
- Keep commits small enough to review in one sitting.

## Before Opening A PR

Run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Pull Requests

Include what changed, why it changed, screenshots for UI work, and any follow-up risks. Do not commit `.env`, API keys, build output, or generated dependency folders.
