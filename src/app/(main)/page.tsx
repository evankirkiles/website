/*
 * page.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */
import * as Schema from '@/lib/sanity.schema';
import ps from '@/app/(main)/[pageSlug]/styles.module.scss';
import s from '@/app/(main)/styles.module.scss';
import HomeLinks from '@/app/(main)/links';
import { MetaThemeColor } from '@/contexts/ThemeColorContext';
import EmPadder from '@/components/EmPadder/EmPadder';
import { Metadata } from 'next';
import { groq } from 'next-sanity';
import client from '@/lib/sanity.client';
import { PortableText } from '@portabletext/react';

const indexPageCopy = groq`
  *[_type == 'scopedcopy' && slug == '/']
`;

export default async function Home() {
  const copy = (await client.fetch<Schema.Scopedcopy[]>(indexPageCopy))[0];

  return (
    <main className={ps.container}>
      <MetaThemeColor color={'#000000'} scrollFrac={0.05} />
      <EmPadder className={ps.columnMeta}>
        {/* <div style={{ gridArea: 'a', position: 'absolute', top: '-1.4em', left: '-2.1em', width: '5em', height: '5em', opacity: 0.1 }}>
          <img src="/safari-pinned-tab.svg" />
        </div> */}
        <div style={{ gridArea: 'b', position: 'relative' }}>
          {/* @ts-expect-error Server Component */}
          <HomeLinks />
        </div>
        <div className={s.stars}>
          <canvas className={s.stars_inner} />
        </div>
        <div className={s.main}>
          <h1 className={ps.title}>Evan Kirkiles</h1>
          <PortableText value={copy.content || []} />
        </div>
      </EmPadder>
      <section className={ps.columnContent}>
        <h2 className={ps.columnContent_label}>Gallery</h2>
      </section>
    </main>
  );
}
