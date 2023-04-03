/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 the nobot space,
 */
import s from '@/styles/components/Card.module.scss';
import Image, { StaticImageData } from 'next/image';

export interface CardableItem {
  title: string;
  imgSrc?: StaticImageData;
  date?: Date;
  href?: string;// a
}

export default function Card({
  item: { title, imgSrc, date, href },
}: {
  item: CardableItem;
}) {
  return (
    <article className={s.container}>
      <Image
        src={imgSrc || ''}
        placeholder={imgSrc ? "blur" : 'empty'}
        alt={`Card image of ${title}`}
        className={s.image}
      />
      <h1 className={s.title}>{title}</h1>
      <div className={s.date}>{date?.toDateString()}</div>
    </article>
  );
}
