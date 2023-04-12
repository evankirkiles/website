/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */
import * as Schema from '@/lib/sanity.schema';
import s from '@/app/(main)/[pageSlug]/styles.module.scss';
import EmPadder from '@/components/EmPadder/EmPadder';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import client from '@/lib/sanity.client';
import { groq } from 'next-sanity';

const pageCopy = groq`
  *[_type == 'scopedcopy' && slug == '/about'] | order(index asc)
`;

export default async function About() {
  const copy = await client.fetch<Schema.Scopedcopy[]>(pageCopy);

  return (
    <main className={s.container}>
      <EmPadder className={s.columnMeta} style={{ maxWidth: 'unset' }}>
        <div className={s.links}>
          <Link href={`/`} className={s.link_home}>
            <strong>Evan Kirkiles</strong>
          </Link>
        </div>
        <div style={{ gridArea: 'b' }}></div>
        <div style={{ gridArea: 's', marginTop: '3.25em' }}>
          <h1 className={s.title}>About</h1>
          <PortableText value={copy[0].content || []} />
        </div>
        <div style={{ gridArea: 'c' }}>
        <PortableText value={copy[1].content || []} />
        </div>
      </EmPadder>
    </main>
  );
}
