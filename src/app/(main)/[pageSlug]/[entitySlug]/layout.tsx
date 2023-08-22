/*
 * layout.tsx
 * author: evan kirkiles
 * created on Sun Apr 09 2023
 * 2023 the nobot space,
 */
import * as Schema from '@/lib/sanity.schema';
import { getCachedClient } from '@/lib/sanity.client';
import { Metadata } from 'next';
import { groq } from 'next-sanity';
import { SchemaEntity } from '@/lib/helpers';
import { EntityPageProps } from '@/app/(main)/[pageSlug]/[entitySlug]/page';
import { toPlainText } from '@portabletext/react';
import { metaOG, metaSite, metaTwitter } from '@/app/(main)/metaInfo';
import { PropsWithChildren } from 'react';

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

const entitiesByPage = groq`
*[_type == $type] | order(startDate desc) {
  ...,
  cover {
    ...,
    "metadata": asset->metadata
  }
}
`;

/**
 * Pre-generate static parameters for the dynamic route.
 *
 * @returns
 */
export async function generateStaticParams({ params }: EntityPageProps) {
  // retrieve the entity found on this page
  const page = (await getCachedClient()<Schema.Page[]>(pagesBySlug, params))[0];
  // get all of the projects specified by the page.
  const projectsByPage = await getCachedClient()<SchemaEntity[]>(
    entitiesByPage,
    {
      type: page.entityType,
    }
  );
  return projectsByPage.map(({ slug }) => ({
    pageSlug: params.pageSlug,
    entitySlug: slug.current.split('/')[1],
  }));
}

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export async function generateMetadata<T extends SchemaEntity>({
  params,
}: EntityPageProps): Promise<Metadata> {
  const entity = (
    await getCachedClient()<T[]>(entityBySlug, {
      slug: `${params.pageSlug}/${params.entitySlug}`,
    })
  )[0];
  const description = entity.description && toPlainText(entity.description);
  const title = `${
    entity._type === 'work' ? entity.company : entity.title
  } | Evan Kirkiles`;
  const descriptionF =
    description && description.length > 152
      ? description.substring(0, 152) + '...'
      : description;
  return {
    title,
    description: descriptionF,
    openGraph: {
      ...metaOG,
      title,
      description: descriptionF,
      url: `${metaSite}/${params.pageSlug}/${params.entitySlug}`,
    },
    twitter: {
      ...metaTwitter,
      title,
      description: descriptionF,
      site: `${metaSite}/${params.pageSlug}/${params.entitySlug}`,
    },
  };
}
