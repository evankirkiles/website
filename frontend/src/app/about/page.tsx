/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */
import s from '@/app/[pageSlug]/styles.module.scss';
import EmPadder from '@/components/EmPadder/EmPadder';
import Link from 'next/link';

export default function About() {
  return (
    <main className={s.container}>
      <EmPadder className={s.columnMeta} style={{ maxWidth: 'unset' }}>
        <div className={s.links}>
          <Link href={`/`} className={s.link_home}>
            <strong>Evan Kirkiles</strong>
          </Link>
        </div>
        <div style={{ gridArea: 'b' }}></div>
        <div style={{ gridArea: 's', marginTop: '3.25em' }}>
          <h1 className={s.title}>About</h1>
          <p>
            Beyond his work, Evan is just a boy split between New{' '}
            {'{Haven, York}'}.
          </p>
          <br />
          <p>
            The making of this website brought about two helper components which
            one might find useful in their own work:
          </p>
          <ul>
            <li>– A dynamic theme-color meta tag</li>
            <li>– Em grid-adjusted padding on box elements</li>
          </ul>
          <p>
            View more information about these in the &quot;Bits&quot; tab of my website.
          </p>
        </div>
        <div style={{ gridArea: 'c' }}>
          Contact information:
          <ul>
            <li>– Email: evan.kirkiles@yale.edu</li>
            <li>– Instagram: @evankirkiles</li>
            <li>– GitHub: @evankirkiles</li>
          </ul>
        </div>
      </EmPadder>
    </main>
  );
}
