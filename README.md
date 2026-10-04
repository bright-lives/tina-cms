# Bright lives repository

Content lives in this Git repository (`content/`). There are two ways to edit it, and both end up as commits on `main`. Every push to `main` triggers a new build on Cloudflare, so changes go live automatically.

## Editing locally

Start `pnpm dev`.

Then the front-end is available here: `http://localhost:4321/`

And the local TinaCMS admin interface is available here: `http://localhost:4321/admin`

This edits files in `content/` directly and does not require a TinaCloud account or login. Pull first, then commit and push your changes yourself.

## Editing via TinaCloud

Editors log in at `/admin/index.html` on the site with their TinaCloud account. TinaCloud commits their changes to `main`.

- Dev: `https://tina-cms.remi-vledder.workers.dev/admin/index.html`
- Production: `https://brightlives.nl/admin/index.html`

The site URL must be listed under Configuration → Site URLs in TinaCloud, otherwise login fails.

## Deployment

The site is hosted on Cloudflare Workers (`@astrojs/cloudflare` adapter), connected to this GitHub repository. Cloudflare runs `pnpm build` on every push to `main` and deploys with `npx wrangler deploy`.

`pnpm build` needs these variables: in `.env` locally (git-ignored), and in Cloudflare under the Worker's Settings → Build → Variables and secrets. They are only needed at build time; no runtime variables are required.

```
PUBLIC_TINA_CLIENT_ID=...
TINA_TOKEN=...
```

- `PUBLIC_TINA_CLIENT_ID`: the Client ID on the project overview at app.tina.io
- `TINA_TOKEN`: a *Content (Readonly)* token from the Tokens tab at app.tina.io

Pages are prerendered inside the Cloudflare Workers runtime, which has no filesystem: don't use `fs` in components or pages. Use `import.meta.glob` or a JSON import instead.

`pnpm build:local` builds without TinaCloud, but its admin only works next to a running `pnpm dev`, so don't deploy it.
