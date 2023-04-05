/*
 * page.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */
import Card from '@/components/Card';
import ps from '@/app/[pageSlug]/styles.module.scss';
import s from '@/app/styles.module.scss';
import Link from 'next/link';
import HomeLinks from '@/app/links';
import ScrollThemeColorChanger from '@/hooks/useScrollThemeColor';

export default function Home() {
  return (
    <main className={ps.container}>
      <ScrollThemeColorChanger color={'#000000'} scrollFrac={1} />
      <section className={ps.columnMeta}>
        <div style={{ gridArea: 'b', position: 'relative' }}>
          {/* @ts-expect-error Server Component */}
          <HomeLinks />
        </div>
        <div className={s.stars}>
          <canvas className={s.stars_inner} />
        </div>
        <div className={s.main}>
          <h1 className={ps.title}>Evan Kirkiles</h1>
          <p>
            is a student in his junior year at Yale University. He currently
            works as a software engineer at{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://channel.studio"
            >
              Channel Studio
            </a>
            , and will work this summer as an intern at the New York Times.
          </p>
          <br />
          <p>His practices, in no specific order, are:</p>
          <ul>
            <li>– Full-stack development</li>
            <li>– Paper sculpture</li>
            <li>– Photogrammetry</li>
            <li>– Design</li>
          </ul>
        </div>
      </section>
      <section className={ps.columnContent}>
        <h1 className={s.projects}>
          <span className={s.projects_inner}>Gallery</span>
        </h1>
      </section>
    </main>
  );
}
