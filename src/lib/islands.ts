import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';
import type { PagesQuery, PostQuery } from '../../tina/__generated__/types';
import type { CmsPage, CmsPost } from './data';
import PageBody from '../components/islands/PageBody.astro';
import PostBody from '../components/islands/PostBody.astro';
import { getPage, getPost, getConfig } from './data';

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
  post: {
    fetch: (_request, params) => getPost(params.get('slug') ?? ''),
    component: PostBody,
    wrapper: { tag: 'main', className: 'bg-primary-500 flex pb-20 pt-40' },
    propsFromData: (data) => ({
      data: (data as QueryResult<PostQuery>).data?.post as CmsPost | undefined,
    }),
  },
};