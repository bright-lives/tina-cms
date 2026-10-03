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

export type SectionHighlightSection = Extract<
  PageSections,
  { __typename: 'PagesSectionsHighlight' }
>;

export type CmsPage = Awaited<ReturnType<typeof getPage>>['data']['pages'];

// Shared shape for the Button field group, used both as a standalone section
// (PagesSectionsButton) and nested inside other sections (e.g. Hero's `button`
// field, PagesSectionsHeroButton) — those are distinct generated types with
// the same structure. Only the referenced page's routing metadata is needed.
type ButtonSection = Extract<PageSections, { __typename: 'PagesSectionsButton' }>;

export type ButtonData = Pick<
  ButtonSection,
  'text' | 'url' | 'style' | 'variant'
> & {
  page?: Pick<NonNullable<ButtonSection['page']>, '_sys'> | null;
};
