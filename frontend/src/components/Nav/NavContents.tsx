/*
 * MenuContents.tsx
 * author: evan kirkiles
 * created on Tue Apr 04 2023
 * 2023 the nobot space,
 */

import * as Schema from '@/cms/schema';
import s from '@/styles/components/Nav.module.scss';
import groq from 'groq';
import Link from 'next/link';
import client from '../../../client';

const listPages = groq`
*[_type == 'page'] | order(pageNum asc) { slug, title, pageNum }
`;

export default async function NavContents() {
  const pages = await client.fetch<Schema.Page[]>(listPages);

  return (
    <div className={s.contents}>
      <ul className={s.links}>
        <li style={{ fontWeight: 700, marginBottom: '0.55em' }}>
          Evan Kirkiles
        </li>
        {[
          {
            slug: { current: '' },
            title: 'Index',
            pageNum: 0,
          },
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
            <div>{pageNum + 1}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
