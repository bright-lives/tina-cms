## Development

This project's dev server is `tinacms dev -c "astro dev"` (the `pnpm dev` script), which wraps Astro with the TinaCMS GraphQL/content server (port 4001) that the visual editor sidebar depends on. Astro alone runs on port 4321.

**When running as an agent (e.g. Claude Code), `astro dev` auto-detects the agent and force-backgrounds itself even without `--background`, even when spawned as tinacms's child process.** That makes the nested `astro dev` exit immediately, which causes tinacms to think its web app command exited and tear itself (and the GraphQL server on 4001) down — leaving a CMS-less Astro server behind and breaking the visual editor sidebar. Set `ASTRO_DEV_BACKGROUND=1` to suppress that auto-detection so `astro dev` stays foregrounded under tinacms's control:

```
ASTRO_DEV_BACKGROUND=1 nohup pnpm dev > /tmp/tina-dev.log 2>&1 &
disown
```

Verify both servers are actually up before assuming it worked:

```
lsof -i :4001 -i :4321
```

To stop it: `pkill -f "tinacms dev"` (and `astro dev stop` if a stray background Astro daemon is also running — check with `astro dev status`).

When running from a normal terminal (not through an agent), plain `pnpm dev` works fine — the agent-detection issue only applies when an agent like Claude Code launches it.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
