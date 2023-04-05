/*
 * Work.tsx
 * author: evan kirkiles
 * created on Wed Apr 05 2023
 * 2023 the nobot space, 
 */
"use client";

import s from "@/styles/components/Card.module.scss";
import Image from "next/image";
import * as Schema from '@/cms/schema';
import client, { imageUrl } from "@/cms/client";
import { useNextSanityImage } from "next-sanity-image";

interface WorkCardProps {
  item: Schema.Work;
}

export default function WorkCard({ item }: WorkCardProps) {
  const imageProps = useNextSanityImage(client, item.cover);
  console.log(item);
  return (
    <article className={s.container}>
      <Image
        {...imageProps}
        placeholder="blur"
        sizes="(max-width: 800px) 100vw, 800px"
        blurDataURL={(item.cover.asset as any).metadata.lqip}
        alt={`Cover image of ${item.title}`}
        className={s.image}
      />
      <h1 className={s.title}>{item.title}</h1>
      <div className={s.date}>{item.startDate}</div>
    </article>
  );
}