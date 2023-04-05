/*
 * Work.tsx
 * author: evan kirkiles
 * created on Wed Apr 05 2023
 * 2023 the nobot space,
 */
'use client';

import s from '@/styles/components/Card.module.scss';
import Image from 'next/image';
import * as Schema from '@/cms/schema';
import client from '@/cms/client';
import { useNextSanityImage } from 'next-sanity-image';
import Link from 'next/link';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

type EntityType = Schema.Work | Schema.Play | Schema.Project;

interface CardProps<T extends EntityType> {
  entitySlug: string;
  item: T;
}

export default function Card<T extends EntityType>({
  entitySlug,
  item,
}: CardProps<T>) {
  const imageProps = useNextSanityImage(client, item.cover);
  return (
    <Link href={`/${entitySlug}/${item.slug}`} className={s.container}>
      <Image
        {...imageProps}
        // placeholder="blur"
        // sizes="(max-width: 800px) 100vw, 800px"
        // blurDataURL={(item.cover as any).metadata.lqip}
        alt={`Cover image of ${item.slug}`}
        className={s.image}
      />
      <div className={s.titleArea}>
        {item._type === 'work' ? (
          <>
            <h1 className={s.title}>{item.role}</h1>
            <h2>{item.company}</h2>
          </>
        ) : <>
          <h1 className={s.title}>{item.title}</h1>
        </>}
      </div>
      <div className={s.dateArea}>
        <div>
          {item.startDate
            ? new Date(Date.parse(item.startDate)).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })
            : null}
        </div>
        <div>
          {item.endDate
            ? new Date(Date.parse(item.endDate)).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })
            : item.startDate
            ? 'Present'
            : null}
        </div>
      </div>
    </Link>
  );
}
