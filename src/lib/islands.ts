import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';
import type { PagesQuery } from '../../tina/__generated__/types';
import Hero from '../components/Hero.astro';
import { getPage, getConfig } from './data';

export const islands: IslandRegistry = {
  // global: {
  //   fetch: () => getConfig(),
  //   component: Header,
  //   wrapper: { tag: 'div' },
  //   propsFromData: (data) => ({
  //     config: (data as QueryResult<ConfigQuery>).data?.config,
  //   }),
  // },
  page: {
    fetch: (_request, params) => getPage(params.get('slug') ?? 'home'),
    component: Hero,
    wrapper: { tag: 'main' },
    propsFromData: (data) => {
      const pages = (data as QueryResult<PagesQuery>).data?.pages;
      return {
        heading: pages?.title || '',
        subheading: pages?.sections?.[0]?.subheading || '',
        image: pages?.sections?.[0]?.image || '',
      };
    },
  },
};