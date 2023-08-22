/*
 * sanity.ts
 * author: evan kirkiles
 * created on Tue Aug 22 2023
 * 2023 the nobot space
 */

import { SchemaEntity } from '@/lib/helpers';
import getClient from '@/lib/sanity.client';
import { Page, Scopedcopy } from '@/lib/sanity.schema';
import groq from 'groq';

function buildQuery<R = any, P = any>(query: {
  groq: string;
  tag: (p: P) => string[];
}) {
  return {
    ...query,
    fetch: (preview?: { token?: string }) => (p: P) =>
      getClient(preview).fetch<R, P>(query.groq, p, {
        next: {
          revalidate: false,
          tags: query.tag(p),
        },
      }),
  };
}

/* -------------------------------------------------------------------------- */
/*                                 Scoped Copy                                */
/* -------------------------------------------------------------------------- */
// To be removed for a page builder approach in the future.

const indexPageCopyQuery = buildQuery<Scopedcopy>({
  groq: groq`*[_type == 'scopedcopy' && slug == '/'][0]`,
  tag: () => [`page:/`],
});

/* -------------------------------------------------------------------------- */
/*                              Gallery Entities                              */
/* -------------------------------------------------------------------------- */

const galleryEntitiesQuery = buildQuery<SchemaEntity[]>({
  groq: groq`
  *[defined(galleryPriority)] | order(galleryPriority asc) {
    ...,
    cover {
      ...,
      "metadata": asset->metadata
    }
  }`,
  tag: () => [`gallery:list`],
});

/* -------------------------------------------------------------------------- */
/*                                    Pages                                   */
/* -------------------------------------------------------------------------- */

const listPagesQuery = buildQuery<Page[]>({
  groq: groq`*[_type == 'page'] | order(pageNum asc) { slug, title, pageNum }`,
  tag: () => [`page:list`],
});

const pageBySlugQuery = buildQuery<Page, { pageSlug: string }>({
  groq: groq`*[_type == 'page' && slug.current == $pageSlug][0] { ... }`,
  tag: ({ pageSlug }) => [`page:/${pageSlug}`],
});

/* -------------------------------------------------------------------------- */
/*                                  Entities                                  */
/* -------------------------------------------------------------------------- */

const listEntitiesByTypeQuery = buildQuery<SchemaEntity[], { type: string }>({
  groq: groq`
    *[_type == $type] | order(startDate desc) {
      ...,
      cover {
        ...,
        "metadata": asset->metadata
      }
    }
  `,
  tag: ({ type }) => [`${type}:list`],
});

const entityBySlugQuery = buildQuery<SchemaEntity, { slug: string }>({
  groq: groq`
    *[slug.current == $slug][0] {
      ...,
      cover {
        ...,
        "metadata": asset->metadata
      }
    }
  `,
  tag: ({ slug }) => [`page:/${slug}`],
});

const API = {
  indexPageCopyQuery,
  listPagesQuery,
  pageBySlugQuery,
  listEntitiesByTypeQuery,
  entityBySlugQuery,
  galleryEntitiesQuery,
};

export default API;
