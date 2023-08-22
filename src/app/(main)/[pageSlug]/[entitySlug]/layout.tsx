/*
 * layout.tsx
 * author: evan kirkiles
 * created on Sun Apr 09 2023
 * 2023 the nobot space,
 */
import { Metadata } from 'next';
import { groq } from 'next-sanity';
import { EntityPageProps } from '@/app/(main)/[pageSlug]/[entitySlug]/page';
import { toPlainText } from '@portabletext/react';
import { metaOG, metaSite, metaTwitter } from '@/app/(main)/metaInfo';
import { PropsWithChildren } from 'react';
import API from '@/lib/sanity';

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

// Generate the pages of sub-entities for each top-level page type
export async function generateStaticParams({ params }: EntityPageProps) {
  // retrieve the entity found on this page
  const page = await API.pageBySlugQuery.fetch()(params);
  const entities = await API.listEntitiesByTypeQuery.fetch()({
    type: page.entityType,
  });
  // convert entities list into sub-paths
  return entities.map(({ slug }) => ({
    pageSlug: params.pageSlug,
    entitySlug: slug.current.split('/')[1],
  }));
}

// Parse the metadata for an entity
export async function generateMetadata({ params }: EntityPageProps) {
  const qParams = { slug: `${params.pageSlug}/${params.entitySlug}` };
  const entity = await API.entityBySlugQuery.fetch()(qParams);

  // parse metadata from the entity
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
  } as Metadata;
}
