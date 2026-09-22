import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';
import type { PagesQuery } from '../../tina/__generated__/types';
import type { CmsPage } from './data';
import PageBody from '../components/islands/PageBody.astro';
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
    component: PageBody,
    wrapper: { tag: 'main' },
    propsFromData: (data) => ({
      data: (data as QueryResult<PagesQuery>).data?.pages as CmsPage | undefined,
    }),
  },
};