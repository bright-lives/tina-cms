---
name: port-gutenberg-block
description: >-
  Ports a custom Gutenberg block from the bright-lives WordPress plugin
  (`~/Sites/bright-lives/src/blocks/[name]/`) into this Astro +
  TinaCMS project as an Astro component wired into TinaCMS's visual editor.
  Use whenever the user asks to "add", "port", or "bring over" a
  block/section/component from the WordPress site, bright-lives-blocks, or
  Gutenberg into this project — e.g. "port the hero block", "add the
  progress-bar block like we did with button". Covers both block types:
  standalone sections (rendered via Sections.astro's switch) and nested
  field groups embedded inside another section (like Button inside Hero).
---

# Port a Gutenberg block to Astro/TinaCMS

Two repos are involved:

- **Source** — `~/Sites/bright-lives/src/blocks/[name]/`, a
  custom Gutenberg block in the `bright-lives-blocks` WP plugin.
- **Target** — this repo, `tina-cms/bright-lives`, an Astro site whose
  content is authored through TinaCMS. `tina/collections/page.ts` defines
  the Tina schema; Astro components under `src/components/` render it.

The goal each time: an Astro component that visually matches the WP block
and is fully editable through the Tina sidebar (click-to-edit via
`data-tina-field`), backed by a Tina field schema that mirrors the block's
`block.json` attributes.

## Step 1 — Read the source block, but only the right files

In `src/blocks/[name]/`:

- `block.json` — **the schema.** `attributes` maps directly to the Tina
  fields you'll define: `type: "string"` + `enum` → a `string` field with
  `options`; a plain string → a plain `string`/`image` field.
- `save.js` — **the markup.** This is what actually renders on the WP
  frontend — mirror this structure in the Astro component.
- `style.js` / `utils.js` — the Tailwind class logic (style maps, class
  name helpers). Port this logic, not just the output classes.
- **Ignore `edit.js`.** It's editor-only chrome (toolbars, popovers,
  `RichText`, icon pickers) and never reaches the rendered page. Do not
  mirror it — this is the most common way to accidentally over-build the
  Astro side.
- `assets/` — editor icons, generally not needed for the frontend port.

## Step 2 — Decide: standalone section, or nested field group?

Look at how the block is used inside `bright-lives`'s page templates:

- **Standalone section** (block sits directly in a page's block list, e.g.
  `section-hero`, `section-donate`) → becomes its own entry in Tina's
  `sections` list, rendered via `Sections.astro`'s `switch`.
- **Nested field group** (block is composed *inside* another block's markup
  — e.g. `button` inside `section-hero`) → becomes an `object` field nested
  inside the parent section's Tina fields, *and* is still useful as its own
  standalone `buttonTemplate` if it might ever stand alone in a page too
  (this project registers both for `button`).

If it's genuinely ambiguous from the source, ask rather than guess — it
changes where the component gets wired in (Step 6).

## Step 3 — Tina fields: `tina/collections/[name].ts`

New file exporting:
- `[name]Fields: TinaField[]` — one field per `block.json` attribute.
- `[name]Template` — `{ label, name, fields: [name]Fields }`, for use when
  the block can appear as a standalone section.

Reuse `[name]Fields` (not the template) when embedding as a nested `object`
field elsewhere — see `button` nested inside `hero` in `page.ts` for the
pattern.

## Step 4 — Wire into `tina/collections/page.ts`

- Import `{ [name]Fields, [name]Template }` from the new file.
- If standalone: push `[name]Template` into the relevant `templates` array.
- If nested: add `{ type: 'object', label: '...', name: '...', fields:
  [name]Fields }` to the parent template that embeds it.

**Tina regenerates its GraphQL types (`PagesSections[name]` etc.) from this
file only when the dev/build process runs.** If Step 5 needs to reference a
newly-added standalone section's generated type, add the template here
first and let the dev server pick it up before writing code that imports
that type — otherwise the type won't exist yet.

## Step 5 — Data type: `src/lib/data.ts`

Only needed for **nested field groups** (standalone sections already get a
generated type via `Extract<PageSections, { __typename: 'PagesSections[name]' }>`).
Add a plain type mirroring the attributes, e.g.:

```ts
export type ButtonData = {
  text?: string | null;
  url?: string | null;
  style?: string | null;
  variant?: string | null;
};
```

A comment noting *why* a hand-written type exists (nested field groups get
distinct generated types depending on where they're embedded, so a shared
type is used instead) saves the next port from re-deriving this.

## Step 6 — Astro component: `src/components/[name].astro`

- `Props { data: [name]Data }` (or the generated section type).
- Mirror `save.js`'s markup, not `edit.js`'s.
- Port the `style.js`/`utils.js` class logic. Tailwind v3 JS-config tokens
  need translating to v4 CSS `@theme` tokens (`src/styles/global.css`) —
  check the token you need already exists there before introducing a new
  one.
- Leave a one-line comment pointing at the exact source file(s) ported
  (e.g. `Mirrors bright-lives-blocks/[name]/style.js`), so a future refactor
  of the WP block can be diffed against this file directly.

## Step 7 — Wire the component into the render tree

- **Standalone**: add a `case 'PagesSections[name]': return <Name data={section} />;`
  to the `switch` in `src/components/sections/Sections.astro`.
- **Nested**: import the component into the parent (e.g. `Hero.astro`),
  render it conditionally on the field being present, and **wrap it in
  `<div data-tina-field={tinaField(data, '<fieldName>')}>`** — this is what
  makes it click-to-edit in Tina's visual sidebar. Easy to forget since the
  page still renders fine without it; the visual editor just silently loses
  that field.

## Step 8 — Seed content

Add example content exercising the new block/field to `content/pages/homepage.md`
(or another relevant content file) so it's visible immediately without
manually building it in the Tina sidebar first.

## Step 9 — Verify

Follow this repo's `CLAUDE.md`/`AGENTS.md` dev-server instructions (the
`ASTRO_DEV_BACKGROUND=1 nohup pnpm dev …` dance — plain `pnpm dev` force-
backgrounds itself when launched by an agent). Confirm both `4001` (Tina)
and `4321` (Astro) are up via `lsof`, then check the page in a browser and,
if possible, the Tina sidebar's click-to-edit on the new field.

## Gotchas learned so far (add to this as future ports surface new ones)

- `edit.js` is editor-only — porting it produces an over-built Astro
  component. Only `save.js` renders on the frontend.
- Forgetting the `data-tina-field` wrapper on a nested field is silent —
  the page looks correct but the field isn't clickable in the visual
  editor. Double-check this specifically after wiring a nested block.
- Tailwind v4's `font-family` value needs a comma between the CSS var and
  the fallback (`var(--font-serif), 'serif'`) — the v3-style space-separated
  form (`var(--font-serif) 'serif'`) is invalid CSS, not just a v3/v4 syntax
  difference; worth a quick check whenever `global.css` is touched.

When a future port reveals a new gotcha, add it here rather than letting it
live only in that conversation — that's the point of this file.
