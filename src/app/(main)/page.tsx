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
import { SchemaEntity } from '@/lib/helpers';
import Card from '@/components/Card';
import ScrollTransition from '@/components/ScrollTransition';

const indexPageCopy = groq`
  *[_type == 'scopedcopy' && slug == '/']
`;

const galleryEntites = groq`
  *[defined(galleryPriority)] | order(galleryPriority asc) {
    ...,
    cover {
      ...,
      "metadata": asset->metadata
    }
  }
`;

export default async function Home() {
  const copy = (await client.fetch<Schema.Scopedcopy[]>(indexPageCopy))[0];
  const gallery = await client.fetch<SchemaEntity[]>(galleryEntites);

  return (
    <main className={ps.container}>
      <MetaThemeColor color={'#000000'} scrollFrac={0.8} />
      <EmPadder className={ps.columnMeta}>
        {/* <div className={s.logo}>
          <svg
            viewBox="0 0 80 103"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.45 6.38V12.02H28.81H23.17V17.66V23.3H17.53H11.89V28.94V34.58H6.24999H0.609985V57.14V79.7H6.24999H11.89V85.34V90.98H17.53H23.17V96.62V102.26H40.09H57.01V96.62V90.98H62.65H68.29V85.34V79.7H73.93H79.57V74.06V68.42H73.93H68.29V74.06V79.7H62.65H57.01V85.34V90.98H45.73H34.45V85.34V79.7H40.09H45.73V74.06V68.42H51.37H57.01V57.14V45.86H62.65H68.29V40.22V34.58H62.65H57.01V23.3V12.02H62.65H68.29V17.66V23.3H73.93H79.57V17.66V12.02H73.93H68.29V6.38V0.740001H51.37H34.45V6.38ZM34.45 51.5V79.7H28.81H23.17V51.5V23.3H28.81H34.45V51.5Z"
              fill="black"
            />
          </svg>
        </div> */}
        <ScrollTransition
          className={s.links_container}
          triggerFrac={0.1}
          afterClass={s.links_containerHidden}
        >
          {/* @ts-expect-error Server Component */}
          <HomeLinks />
        </ScrollTransition>
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
        <div className={ps.columnContent_inner}>
          {gallery.map((entity, i) => (
            <Card key={entity._id} item={entity} priority={i === 0} />
          ))}
        </div>
      </section>
    </main>
  );
}
