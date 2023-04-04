/*
 * page.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 the nobot space,
 */
import * as S from '@/cms/schema';
import ps from '@/styles/pages/Page.module.scss';
import { PortableText } from '@portabletext/react';
import groq from 'groq';
import client from '../../../client';

interface PageProps {
  params: {
    pageSlug: string;
  };
}

const pagesBySlug = groq`
*[_type == 'page' && slug.current == $pageSlug] { ... }
`;

export default async function PagePage({ params }: PageProps) {
  const page = (await client.fetch<S.Page[]>(pagesBySlug, params))[0];
  if (!page) return null;
  return (
    <main className={ps.container}>
      <section className={ps.columnMeta}>
        <div style={{ gridArea: 'a' }}>← {page.pageNum}</div>
        <div style={{ gridArea: 'b' }}>{page.pageNum + 2} →</div>
        <div style={{ gridArea: 's', marginTop: '3em' }}>
          <h1 className={ps.title}>{page.title}</h1>
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
      <section className={ps.columnContent}>Sort By:</section>
    </main>
  );
}
