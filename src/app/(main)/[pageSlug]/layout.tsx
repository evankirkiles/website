/*
 * layout.tsx
 * author: evan kirkiles
 * created on Sat Apr 08 2023
 * 2023 the nobot space,
 */

import { getCachedClient } from '@/lib/sanity.client';
import * as Schema from '@/lib/sanity.schema';
import { listPages } from '@/components/Nav/NavContents';
import { PropsWithChildren } from 'react';
import { Metadata } from 'next';
import { groq } from 'next-sanity';
import { toPlainText } from '@portabletext/react';
import { metaOG, metaSite, metaTwitter } from '@/app/(main)/metaInfo';

/**
 * Pre-generate static parameters for the dynamic route.
 *
 * @returns
 */
export async function generateStaticParams() {
  const pages = await getCachedClient()<Schema.Page[]>(listPages);
  return pages.map((page) => ({
    pageSlug: page.slug.current,
  }));
}

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

const pagesBySlug = groq`
*[_type == 'page' && slug.current == $pageSlug] { ... }
`;

export async function generateMetadata({
  params,
}: {
  params: { pageSlug: string };
}): Promise<Metadata> {
  const page = (await getCachedClient()<Schema.Page[]>(pagesBySlug, params))[0];
  const description = page.description && toPlainText(page.description);
  const title = `${page.title} | Evan Kirkiles`;
  const descriptionF =
    description && description.length > 152
      ? description.substring(0, 152) + '...'
      : description;
  return {
    title,
    description: descriptionF,
    openGraph: {
      ...metaOG,
      title,
      description: descriptionF,
      url: `${metaSite}/${params.pageSlug}`,
    },
    twitter: {
      ...metaTwitter,
      title,
      description: descriptionF,
      site: `${metaSite}/${params.pageSlug}`,
    },
  };
}
