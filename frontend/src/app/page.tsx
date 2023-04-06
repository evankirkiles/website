/*
 * page.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */
import ps from '@/app/[pageSlug]/styles.module.scss';
import s from '@/app/styles.module.scss';
import HomeLinks from '@/app/links';
import { MetaThemeColor } from '@/contexts/ThemeColorContext';

export default function Home() {
  return (
    <main className={ps.container}>
      <MetaThemeColor color={'#000000'} scrollFrac={1} />
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
            .
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
        <h2 className={ps.columnContent_label}>Gallery</h2>
      </section>
    </main>
  );
}
