# Bright lives repository

Content lives in this Git repository (`content/`). There are two ways to edit it, and both end up as commits on `main`. Changes go live after the next build.

## Editing locally

Start `pnpm dev`.

Then the front-end is available here: `http://localhost:4321/`

And the local TinaCMS admin interface is available here: `http://localhost:4321/admin`

This edits files in `content/` directly and does not require a TinaCloud account or login. Pull first, then commit and push your changes yourself.

When you push those changes the live website will be updated as well.

## Editing via TinaCloud

Editors log in at `https://brightlives.nl/admin/index.html` with their TinaCloud account. TinaCloud commits their changes to `main`.

The site URL must be listed under Configuration → Site URLs in TinaCloud, otherwise login fails.

## Deployment

The live site is built with `pnpm build`, which needs these variables (in `.env` locally, which is git-ignored, and at the hosting provider):

```
PUBLIC_TINA_CLIENT_ID=...
TINA_TOKEN=...
```

- `PUBLIC_TINA_CLIENT_ID`: the Client ID on the project overview at app.tina.io
- `TINA_TOKEN`: a *Content (Readonly)* token from the Tokens tab at app.tina.io

`pnpm build:local` builds without TinaCloud, but its admin only works next to a running `pnpm dev`, so don't deploy it.
