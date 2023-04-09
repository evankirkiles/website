/*
 * page.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */
import * as Schema from '@/lib/sanity.schema';
import { listPages } from '@/components/Nav/NavContents';
import s from '@/app/(main)/[pageSlug]/styles.module.scss';
import { PortableText } from '@portabletext/react';
import groq from 'groq';
import Link from 'next/link';
import client from '@/lib/sanity.client';
import Card from '@/components/Card';
import { MetaThemeColor } from '@/contexts/ThemeColorContext';
import EmPadder from '@/components/EmPadder/EmPadder';
import { SchemaEntity } from '@/lib/helpers';
import { Metadata } from 'next';
import { toPlainText } from '@portabletext/react';

interface PageProps {
  params: {
    pageSlug: string;
  };
}

const pagesBySlug = groq`
*[_type == 'page' && slug.current == $pageSlug] { ... }
`;

const entitiesByPage = groq`
*[_type == $type] | order(startDate desc) {
  ...,
  cover {
    ...,
    "metadata": asset->metadata
  }
}
`;

/**
 * A generated page, corresponding to a Sanity "Page" entry.
 *
 * @param param0
 * @returns
 */
export default async function PagePage({ params }: PageProps) {
  // figure out page metadata and titling
  const [pages, slugPages] = await Promise.all([
    client.fetch<Schema.Page[]>(listPages),
    client.fetch<Schema.Page[]>(pagesBySlug, params),
  ]);
  const page = slugPages[0];
  if (!page) return null;
  const prevSlug =
    page.pageNum === 1 ? '' : pages[page.pageNum - 2].slug.current;
  const nextSlug =
    page.pageNum === pages.length ? 'about' : pages[page.pageNum].slug.current;

  // get all of the projects specified by the page.
  const projectsByPage = await client.fetch<SchemaEntity[]>(entitiesByPage, {
    type: page.entityType,
  });

  return (
    <main className={s.container}>
      <MetaThemeColor color={'#000000'} scrollFrac={0.2} />
      <EmPadder className={s.columnMeta}>
        <div className={s.inner}>
          <h1 className={s.title}>{page.title}</h1>
          <PortableText value={page.description || []} />
        </div>
        <div style={{ gridArea: 'c' }}>
          Select positions:
          <ul>
            <li>– Channel Studio</li>
            <li>– YUAG Graphic Design Assistant</li>
          </ul>
        </div>
        <div className={s.links}>
          <Link href={`/`} className={s.link_home}>
            <strong>Evan Kirkiles</strong>
          </Link>
          <Link href={`/${prevSlug}`} className={s.navButton}>
            Prev ← <span>({page.pageNum - 1})</span>
          </Link>
          <Link href={`/${nextSlug}`} className={s.navButton}>
            Next → <span>({page.pageNum + 1})</span>
          </Link>
        </div>
        <div className={s.pageNum}>
          <span>{page.pageNum}</span>
        </div>
      </EmPadder>
      <section className={s.columnContent}>
        <h2 className={s.columnContent_label}>{page.entityTitle}</h2>
        <div className={s.columnContent_inner}>
          {projectsByPage.map((entity) =>
            entity._type === 'design' ? null : (
              <Card key={entity._id} item={entity} />
            )
          )}
          {projectsByPage.map((entity) =>
            entity._type === 'design' ? null : (
              <Card key={`${entity._id}1`} item={entity} />
            )
          )}
          {projectsByPage.map((entity) =>
            entity._type === 'design' ? null : (
              <Card key={`${entity._id}2`} item={entity} />
            )
          )}
        </div>
      </section>
    </main>
  );
}
