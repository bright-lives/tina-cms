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

export type SectionStandoutColumnsSection = Extract<
  PageSections,
  { __typename: 'PagesSectionsStandoutColumns' }
>;

export type SectionDisplayDataSection = Extract<
  PageSections,
  { __typename: 'PagesSectionsDisplayData' }
>;

export type SectionDonateSection = Extract<
  PageSections,
  { __typename: 'PagesSectionsDonate' }
>;

export type SectionIntroSection = Extract<
  PageSections,
  { __typename: 'PagesSectionsIntro' }
>;

export type SectionFactsSection = Extract<
  PageSections,
  { __typename: 'PagesSectionsFacts' }
>;

export type SectionCalculatorSection = Extract<
  PageSections,
  { __typename: 'PagesSectionsCalculator' }
>;

export type FooterConfig = NonNullable<
  NonNullable<Awaited<ReturnType<typeof getConfig>>['data']['config']>['footer']
>;

export type CmsPage =Awaited<ReturnType<typeof getPage>>['data']['pages'];

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
