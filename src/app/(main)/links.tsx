/*
 * links.tsx
 * author: evan kirkiles
 * created on Tue Apr 04 2023
 * 2023 evan's personal website, 
 */


import * as Schema from '@/lib/sanity.schema';
import s from '@/app/(main)/styles.module.scss';
import groq from 'groq';
import Link from 'next/link';
import client from '@/lib/sanity.client';

export const listPages = groq`
*[_type == 'page'] | order(pageNum asc) { slug, title, pageNum }
`;

export default async function HomeLinks() {
  const pages = await client.fetch<Schema.Page[]>(listPages);

  return (
    <ul className={s.links}>
      {[
        ...pages,
        {
          slug: { current: 'about' },
          title: 'About',
          pageNum: pages.length + 1,
        },
      ].map(({ slug: { current: slug }, title, pageNum }) => (
        <li key={slug}>
          <Link href={`/${slug}`} className={s.link}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
