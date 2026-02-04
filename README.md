# Loop Trail – Web Prototype

Toronto Loop Trail web prototype. Built with React, Vite, MapLibre GL, and GSAP.

## Setup

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

This repo is set up to deploy to GitHub Pages via Actions. After pushing to `main`:

1. On the repo: **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. The workflow `.github/workflows/deploy.yml` runs on every push to `main` and deploys the built site.

Live URL (after first deploy): **https://frontier-design.github.io/loop-web-prototype/**
