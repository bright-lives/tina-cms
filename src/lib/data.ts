import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';

export const getConfig = () =>
  requestWithMetadata(client.queries.config({ relativePath: 'config.json' }));

export const getPage = (slug: string) =>
  requestWithMetadata(
    client.queries.pages({ relativePath: `${slug}.md` }),
    { priority: 'primary' },
  );

export type PageSections = NonNullable<NonNullable<CmsPage['sections']>[number]>;

export type HeroSection = Extract<PageSections, { __typename: 'PagesSectionsHero' }>;

export type CmsPage = Awaited<ReturnType<typeof getPage>>['data']['pages'];

// Shared shape for the Button field group, used both as a standalone section
// (PagesSectionsButton) and nested inside other sections (e.g. Hero's `button`
// field, PagesSectionsHeroButton) — those are distinct generated types with
// the same structure, so Button.astro is typed against this instead.
export type ButtonData = {
  text?: string | null;
  url?: string | null;
  style?: string | null;
  variant?: string | null;
};
