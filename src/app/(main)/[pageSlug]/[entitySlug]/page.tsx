/*
 * page.tsx
 * author: evan kirkiles
 * created on Wed Apr 05 2023
 * 2023 the nobot space,
 */

import { getCachedClient } from '@/lib/sanity.client';
import s from '@/app/(main)/[pageSlug]/[entitySlug]/EntityPage.module.scss';
import { SchemaEntity } from '@/lib/helpers';
import * as Schema from '@/lib/sanity.schema';
import groq from 'groq';
import { HiOutlineArrowLeft } from 'react-icons/hi2';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import EntityImage from '@/app/(main)/[pageSlug]/[entitySlug]/image';
import Footer from '@/components/Footer';
import { GrLinkNext } from 'react-icons/gr';
import { ColorMain } from '@/components/ColorDiv';

export interface EntityPageProps {
  params: {
    pageSlug: string;
    entitySlug: string;
  };
}

const pagesBySlug = groq`
*[_type == 'page' && slug.current == $pageSlug] { ... }
`;

const entityBySlug = groq`
*[slug.current == $slug] {
  ...,
  cover {
    ...,
    "metadata": asset->metadata
  }
}
`;

export default async function EntityPageLayout<T extends SchemaEntity>({
  params,
}: EntityPageProps) {
  // figure out page metadata and titling
  const page = (await getCachedClient()<Schema.Page[]>(pagesBySlug, params))[0];
  // retrieve the entity found on this page
  const entity = (
    await getCachedClient()<T[]>(entityBySlug, {
      slug: `${params.pageSlug}/${params.entitySlug}`,
    })
  )[0];

  return (
    <ColorMain color="#000000" className={s.container}>
      <nav className={s.pageColumn}>
        <h2>
          <Link href={`/${page.slug.current}`}>
            <HiOutlineArrowLeft />
            {page.title}
          </Link>
        </h2>
      </nav>
      <div className={s.outer}>
        <article className={s.inner}>
          {entity._type === 'work' ? (
            <>
              <h1 className={s.title}>{entity.company}</h1>
            </>
          ) : (
            <>
              <h1 className={s.title}>{entity.title}</h1>
            </>
          )}
          <div className={s.dateRow}>
            {entity._type === 'work' && (
              <h2 className={s.subtitle}>{entity.role}</h2>
            )}
            <span className={s.dateRow_subinfo}>
              <span>
                {entity.startDate
                  ? new Date(Date.parse(entity.startDate)).toLocaleString(
                      'default',
                      {
                        month: 'long',
                        year: 'numeric',
                      }
                    )
                  : null}
                {entity.endDate
                  ? ' - ' +
                    new Date(Date.parse(entity.endDate)).toLocaleString(
                      'default',
                      {
                        month: 'long',
                        year: 'numeric',
                      }
                    )
                  : entity.startDate
                  ? ' - Present'
                  : null}
              </span>
              {entity.location && <span>{entity.location}</span>}
            </span>
          </div>
          <div className={s.contents}>
            <section className={s.contents_text}>
              <EntityImage
                image={entity.cover as any as Schema.SanityImageAsset}
                hideCaption
              />
              <PortableText value={entity.description || []} />
            </section>
            <section className={s.contents_pictures}>
              <div className={s.contents_pictures_inner}>
                <EntityImage
                  image={entity.cover as any as Schema.SanityImageAsset}
                  hideCaption
                />
              </div>
              {entity._type === 'project' && entity.url && (
                <div className={s.visit_button}>
                  <div className={s.visit_status}></div>
                  <a
                    href={entity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {entity.url}
                  </a>
                  <GrLinkNext className={s.visit_icon} />
                </div>
              )}
            </section>
          </div>
        </article>
        <Footer />
      </div>
    </ColorMain>
  );
}
