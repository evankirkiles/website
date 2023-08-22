/*
 * layout.tsx
 * author: evan kirkiles
 * created on Sat Apr 08 2023
 * 2023 the nobot space,
 */

import { PropsWithChildren } from 'react';
import { Metadata } from 'next';
import { toPlainText } from '@portabletext/react';
import { metaOG, metaSite, metaTwitter } from '@/app/(main)/metaInfo';
import API from '@/lib/sanity';

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

interface PageParams {
  params: {
    pageSlug: string;
  };
}

// Generate a page for each page in the Sanity dataset
export async function generateStaticParams() {
  const pages = await API.listPagesQuery.fetch()(undefined);
  return pages.map<PageParams['params']>((page) => ({
    pageSlug: page.slug.current,
  }));
}

// Parse page's information into metadata
export async function generateMetadata({ params }: PageParams) {
  const page = await API.pageBySlugQuery.fetch()(params);

  // parse page metadata from Sanity
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
      url: `/${params.pageSlug}`,
    },
    twitter: {
      ...metaTwitter,
      title,
      description: descriptionF,
      site: `/${params.pageSlug}`,
    },
  } as Metadata;
}
