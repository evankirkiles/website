/*
 * links.tsx
 * author: evan kirkiles
 * created on Tue Apr 04 2023
 * 2023 evan's personal website,
 */

import s from '@/app/(main)/Root.module.scss';
import groq from 'groq';
import Link from 'next/link';
import API from '@/lib/sanity';

export const listPages = groq`
*[_type == 'page'] | order(pageNum asc) { slug, title, pageNum }
`;

export default async function HomeLinks() {
  const pages = await API.listPagesQuery.fetch()(undefined);

  return (
    <ul className={s.links}>
      {[
        ...pages,
        {
          slug: { current: 'about' },
          title: 'About',
          pageNum: pages.length + 1,
        },
      ].map(({ slug: { current: slug }, title }) => (
        <li key={slug}>
          <Link href={`/${slug}`} className={s.link} tabIndex={0}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
