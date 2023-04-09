/*
 * image.tsx
 * author: evan kirkiles
 * created on Wed Apr 05 2023
 * 2023 the nobot space, 
 */
"use client";

import client from "@/lib/sanity.client";
import Image from 'next/image';
import s from "@/app/(main)/[pageSlug]/[entitySlug]/styles.module.scss";
import { useNextSanityImage } from "next-sanity-image";
import { SanityImageAsset } from "sanity-codegen";

interface IEntityImageProps {
  image: SanityImageAsset;
  hideCaption?: boolean;
}

export default function EntityImage({ image, hideCaption }: IEntityImageProps) {
  const imageProps = useNextSanityImage(client, image);
  return (
    <figure className={s.image_outer}>
      <Image
        {...imageProps}
        // sizes="(max-width: 800px) 100vw, 800px"
        placeholder="blur"
        blurDataURL={image.metadata.lqip}
        alt={(image as any).caption}
        className={s.image}
      />
      {!hideCaption && <figcaption className={s.image_caption}>{(image as any).caption}</figcaption>}
    </figure>
  )
}