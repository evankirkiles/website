/*
 * page.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 the nobot space,
 */
import * as Schema from '@/cms/schema';
import { listPages } from '@/components/Nav/NavContents';
import s from '@/app/[pageSlug]/styles.module.scss';
import { PortableText } from '@portabletext/react';
import groq from 'groq';
import Link from 'next/link';
import client from '@/cms/client';

interface PageProps {
  params: {
    pageSlug: string;
  };
}

const pagesBySlug = groq`
*[_type == 'page' && slug.current == $pageSlug] { ... }
`;

/**
 * A generated page, corresponding to a Sanity "Page" entry.
 * 
 * @param param0 
 * @returns 
 */
export default async function PagePage({ params }: PageProps) {
  const pages = await client.fetch<Schema.Page[]>(listPages);
  const page = (await client.fetch<Schema.Page[]>(pagesBySlug, params))[0];
  const prevSlug =
    page.pageNum === 1 ? '' : pages[page.pageNum - 2].slug.current;
  const nextSlug =
    page.pageNum === pages.length ? 'about' : pages[page.pageNum].slug.current;
  if (!page) return null;
  return (
    <main className={s.container}>
      <section className={s.columnMeta}>
        <Link href={`/${prevSlug}`} style={{ gridArea: 'a' }}>
          ← Back
        </Link>
        <div
          style={{
            position: 'absolute',
            bottom: '1em',
            right: '0.3em',
            overflow: 'hidden',
            height: '15em',
            width: '16em',
            opacity: 0.1,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{ position: 'absolute', fontSize: '20em', top: 0, right: 0 }}
          >
            {page.pageNum}
          </span>
        </div>
        <Link href={`/${nextSlug}`} style={{ gridArea: 'b' }}>
          Next →
        </Link>
        <div style={{ gridArea: 's', marginTop: '3em' }}>
          <h1 className={s.title}>{page.title}</h1>
          <PortableText value={page.description || []} />
        </div>
        <div style={{ gridArea: 'c' }}>
          Select positions:
          <ul>
            <li>– The New York Times</li>
            <li>– Channel Studio</li>
          </ul>
        </div>
      </section>
      <section className={s.columnContent}>Sort By:</section>
    </main>
  );
}
