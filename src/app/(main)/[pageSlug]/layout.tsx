/*
 * layout.tsx
 * author: evan kirkiles
 * created on Sat Apr 08 2023
 * 2023 the nobot space, 
 */

import client from '@/lib/sanity.client';
import * as Schema from '@/lib/sanity.schema';
import { listPages } from '@/components/Nav/NavContents';
import { PropsWithChildren } from 'react';

/**
 * Pre-generate static parameters for the dynamic route.
 * 
 * @returns 
 */
export async function generateStaticParams() {
  const pages = await client.fetch<Schema.Page[]>(listPages);
  return pages.map((page) => ({
    pageSlug: page.slug.current
  }));
}

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}