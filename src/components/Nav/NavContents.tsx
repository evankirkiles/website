/*
 * MenuContents.tsx
 * author: evan kirkiles
 * created on Tue Apr 04 2023
 * 2023 evan's personal website,
 */

import * as Schema from '@/lib/sanity.schema';
import s from './styles.module.scss';
import groq from 'groq';
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io';
import client from '@/lib/sanity.client';
import NavLink from '@/components/NavLink';
import Link from 'next/link';
import PageLink from '@/components/PageLink';

export const listPages = groq`
*[_type == 'page'] | order(pageNum asc) { slug, title, pageNum }
`;

export default async function NavContents() {
  const pages = await client.fetch<Schema.Page[]>(listPages);

  return (
    <div className={s.contents}>
      <ul className={s.links}>
        <li style={{ fontWeight: 700, marginBottom: '0.55em' }}>
          <PageLink href="/">Evan Kirkiles</PageLink>
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
            <NavLink
              href={`/${slug}`}
              className={s.link}
              classNameActive={s.linkActive}
            >
              {title}
            </NavLink>
            <div>{pageNum}</div>
          </li>
        ))}
      </ul>
      <ul className={s.contact}>
        <li style={{ fontWeight: 700, marginBottom: '1em' }}>Contact</li>
        <li>
          email: <a href="mailto:kirkilese@gmail.com">kirkilese@gmail.com</a>
        </li>
        <li>socials: @evankirkiles</li>
        <li className={s.media}>
          <a
            href="https://www.instagram.com/evankirkiles"
            rel="noopener noreferrer"
            target="_blank"
          >
            <IoLogoInstagram />
          </a>
          <a
            href="https://github.com/evankirkiles"
            rel="noopener noreferrer"
            target="_blank"
          >
            <IoLogoGithub />
          </a>
          <a
            href="https://linkedin.com/en/evankirkiles"
            rel="noopener noreferrer"
            target="_blank"
          >
            <IoLogoLinkedin />
          </a>
        </li>
      </ul>
    </div>
  );
}
