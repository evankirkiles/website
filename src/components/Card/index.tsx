/*
 * Work.tsx
 * author: evan kirkiles
 * created on Wed Apr 05 2023
 * 2023 evan's personal website,
 */
'use client';

import s from './styles.module.scss';
import Image from 'next/image';
import * as Schema from '@/lib/sanity.schema';
import client from '@/lib/sanity.client';
import { useNextSanityImage } from 'next-sanity-image';
import Link from 'next/link';
import { SchemaEntity } from '@/lib/helpers';

interface CardProps<T extends SchemaEntity> {
  item: T;
}

export default function Card<T extends SchemaEntity>({ item }: CardProps<T>) {
  const imageProps = useNextSanityImage(client, item.cover);
  return (
    <Link href={`/${item.slug.current}`} className={s.container}>
      <Image
        {...imageProps}
        // sizes="(max-width: 800px) 100vw, 800px"
        placeholder="blur"
        blurDataURL={
          (item.cover as any as Schema.SanityImageAsset).metadata.lqip
        }
        alt={(item.cover as any).caption}
        className={s.image}
      />
      <div className={s.titleArea}>
        {item._type === 'work' ? (
          <>
            <h1 className={s.title}>{item.role}</h1>
            <h2>{item.company}</h2>
          </>
        ) : (
          <>
            <h1 className={s.title}>{item.title}</h1>
          </>
        )}
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
            ? 'to ' +
              new Date(Date.parse(item.endDate)).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })
            : item.startDate
            ? 'to Present'
            : null}
        </div>
      </div>
    </Link>
  );
}
