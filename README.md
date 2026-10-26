# 30 Day Challenge

Free monthly exercise challenge app: https://Do30DayChallenge.com

- `public/` is the whole site (static HTML5 app, works offline). Everything in it is published.
- Pushing to `main` publishes the site through Cloudflare Workers Builds.

## Releasing a change
1. Bump `APP_VERSION` in `public/index.html` and `VERSION` in `public/sw.js` (so phones pick up the new copy).
2. New exercise picture: add `public/images/exercises/<exercise-id>.webp` (960×540), add the id to `EX_IMAGES` in index.html and the file to `FILES` in sw.js.
3. Test at phone size (add `?test` to the address for the date test tools), then push to `main`.

Created by Stuart Parkins · © 2026
