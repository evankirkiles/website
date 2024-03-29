/*
 * Work.tsx
 * author: evan kirkiles
 * created on Wed Apr 05 2023
 * 2023 evan's personal website,
 */
'use client';

import s from './Card.module.scss';
import Image from 'next/image';
import { getClient } from '@/lib/sanity.client';
import { useNextSanityImage } from 'next-sanity-image';
import Link from 'next/link';
import { SchemaEntity } from '@/lib/helpers';
import { SanityImageAsset } from 'sanity-codegen';

interface CardProps<T extends SchemaEntity> {
  item: T;
  priority?: boolean;
}

export default function Card<T extends SchemaEntity>({
  item,
  priority = false,
}: CardProps<T>) {
  const imageProps = useNextSanityImage(getClient(), item.cover);
  return (
    <Link href={`/${item.slug.current}`} className={s.container}>
      <Image
        {...imageProps}
        placeholder="blur"
        blurDataURL={(item.cover as unknown as SanityImageAsset).metadata.lqip}
        priority={priority}
        sizes="(min-width: 1024px) calc(100vw - 24em),
                100vw"
        alt={(item.cover as any).caption}
        className={s.image}
      />
      <hgroup className={s.titleArea}>
        {item._type === 'work' ? (
          <>
            <h2 className={s.title}>{item.role}</h2>
            <h3>{item.company}</h3>
          </>
        ) : (
          <>
            <h2 className={s.title}>{item.title}</h2>
          </>
        )}
      </hgroup>
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
