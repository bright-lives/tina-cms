import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';

export const getConfig = () =>
  requestWithMetadata(client.queries.config({ relativePath: 'config.json' }));

export const getPage = (slug: string) =>
  requestWithMetadata(
    client.queries.pages({ relativePath: `${slug}.md` }),
    { priority: 'primary' },
  );

export const getPost = (slug: string) =>
  requestWithMetadata(
    client.queries.post({ relativePath: `${slug}.md` }),
    { priority: 'primary' },
  );

// Newest first. Tag filtering happens here rather than in GraphQL, since
// filtering on a reference inside an object list isn't supported by Tina.
export const getPostsByTag = async (tagFilename: string) => {
  const result = await requestWithMetadata(client.queries.postConnection({ first: 1000 }));
  return (result.data?.postConnection.edges ?? [])
    .map(edge => edge?.node)
    .filter((post): post is CmsPost => !!post)
    .filter(post => post.tags?.some(t => t?.tag?._sys.filename === tagFilename))
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
};

export type CmsPost = NonNullable<Awaited<ReturnType<typeof getPost>>['data']['post']>;

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

export type DonationFormSection = Extract<
  PageSections,
  { __typename: 'PagesSectionsDonationForm' }
>;

export type SectionPostsOverviewSection = Extract<
  PageSections,
  { __typename: 'PagesSectionsPostsOverview' }
>;

export type FooterConfig = NonNullable<
  NonNullable<Awaited<ReturnType<typeof getConfig>>['data']['config']>['footer']
>;

export type CmsPage =Awaited<ReturnType<typeof getPage>>['data']['pages'];

// Public URL of a referenced CMS page; mirrors the router in tina/collections/page.ts.
export const pageUrl = (page: { _sys: { filename: string } }) =>
  page._sys.filename === 'homepage' ? '/' : `/${page._sys.filename}`;

// Public URL of a post; mirrors the router in tina/collections/post.ts.
export const postUrl = (post: { _sys: { filename: string } }) => `/posts/${post._sys.filename}`;

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
