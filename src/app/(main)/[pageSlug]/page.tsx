/*
 * page.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */
import s from '@/app/(main)/[pageSlug]/Page.module.scss';
import { PortableText } from '@portabletext/react';
import groq from 'groq';
import Link from 'next/link';
import Card from '@/components/Card';
import EmPadder from '@/components/EmPadder/EmPadder';
import Footer from '@/components/Footer';
import PageContents from '@/app/(main)/contents';
import API from '@/lib/sanity';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    pageSlug: string;
  };
}

// A single page with half a book displaying the Sanity content
export default async function PagePage({ params }: PageProps) {
  // figure out page metadata and titling
  const [pages, page] = await Promise.all([
    API.listPagesQuery.fetch()(undefined),
    API.pageBySlugQuery.fetch()(params),
  ]);
  if (!page) notFound();

  // get previous and next pages to render
  const prevSlug =
    page.pageNum === 1 ? '' : pages[page.pageNum - 2].slug.current;
  const prevTitle =
    page.pageNum === 1 ? 'Index' : pages[page.pageNum - 2].title;
  const nextSlug =
    page.pageNum === pages.length ? 'about' : pages[page.pageNum].slug.current;
  const nextTitle =
    page.pageNum === pages.length ? 'About' : pages[page.pageNum].title;

  // get all of the entities specified by the page's "type".
  const qParams = { type: page.entityType };
  const entities = await API.listEntitiesByTypeQuery.fetch()(qParams);

  return (
    <main className={s.container}>
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
            ← <span>{prevTitle}</span>
          </Link>
          <Link href={`/${nextSlug}`} className={s.navButton}>
            → <span>{nextTitle}</span>
          </Link>
        </div>
        <div className={s.pageNum}>
          <span>{page.pageNum}</span>
        </div>
      </EmPadder>
      <PageContents className={s.columnContent}>
        <h2 className={s.columnContent_label}>{page.entityTitle}</h2>
        <div className={s.columnContent_inner}>
          {entities.map((entity) => (
            <Card key={entity._id} item={entity} />
          ))}
        </div>
        <Footer />
      </PageContents>
    </main>
  );
}
