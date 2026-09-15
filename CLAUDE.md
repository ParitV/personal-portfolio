# Project: Personal Portfolio Site (Static edition)

## Git Commit Instructions
- NEVER add "Co-authored-by: Claude <claude@anthropic.com>" to git commit messages.
- DO NOT add any personal attributions, names, or signatures to commits.
- Keep all commit messages focused solely on the code changes.

## Goal
A fully static React portfolio site — Home, About/Resume, Projects, Project detail, Contact.
No backend, no database, no auth, no admin UI. All content lives in code.
To update content: edit the relevant file in src/data/, commit, push — Azure redeploys automatically.
The repo is public and runs Eight's own SAST/DAST pipeline against itself (see Phase 7).

## Stack
- React + Vite + React Router (SPA)
- Azure Static Web Apps (Free plan) — static hosting only, no Functions/API
- Content lives in src/data/profile.ts and src/data/projects.ts, imported directly by pages

## Project case-study structure (each entry in projects.ts)
Each project has: slug, title, oneLiner, techStack[], coverImage, problem, whatIBuilt,
architectureImage, myRole, keyDecisions[], demoUrl, repoUrl, docUrl

## Design tokens
- paper #F2ECE1, stone #DCD3C3, wood #8B6F52, wood-dark #5C4A38, ink #2B2A26, sage #7C8C6D
- Headings: Fraunces (serif). Body: Karla (sans).
- Thin hairline dividers, not shadowed cards. Generous whitespace.