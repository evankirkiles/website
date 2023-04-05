/*
 * page.tsx
 * author: evan kirkiles
 * created on Wed Apr 05 2023
 * 2023 the nobot space,
 */

import client from '@/cms/client';
import s from '@/app/[pageSlug]/[entitySlug]/styles.module.scss';
import { SchemaEntityType } from '@/cms/helpers';
import * as Schema from '@/cms/schema';
import groq from 'groq';
import ScrollThemeColorChanger from '@/hooks/useScrollThemeColor';
import { HiOutlineArrowLeft } from 'react-icons/hi2';
import Link from 'next/link';

interface EntityPageProps {
  params: {
    pageSlug: string;
    entitySlug: string;
  };
}

const pagesBySlug = groq`
*[_type == 'page' && slug.current == $pageSlug] { ... }
`;

const entityByTypeSlug = groq`
*[_type == $type && slug.current == $slug] { ... }
`;

export default async function EntityPageLayout<T extends SchemaEntityType>({
  params,
}: EntityPageProps) {
  // figure out page metadata and titling
  const page = (await client.fetch<Schema.Page[]>(pagesBySlug, params))[0];
  // retrieve the entity found on this page
  const entity = (
    await client.fetch<T[]>(entityByTypeSlug, {
      type: page.entityType,
      slug: params.entitySlug,
    })
  )[0];

  return (
    <main className={s.container}>
      <ScrollThemeColorChanger color={'#000000'} scrollFrac={0.05} />
      <nav className={s.pageColumn}>
        <h2>
          <Link href={`/${page.slug.current}`}>
            <HiOutlineArrowLeft />
            {page.title}
          </Link>
        </h2>
      </nav>
      <article className={s.content}>
        {entity._type === 'work' ? (
          <>
            <h1 className={s.title}>{entity.company}</h1>
            <h2 className={s.subtitle}>{entity.role}</h2>
          </>
        ) : (
          <>
            <h1 className={s.title}>{entity.title}</h1>
          </>
        )}
        {/* <PortableText value={page.description || []} /> */}
      </article>
    </main>
  );
}
