/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */
import s from '@/app/[pageSlug]/styles.module.scss';

export default function About() {
  return (
    <main className={s.container}>
      <section className={s.columnMeta} style={{ maxWidth: 'unset' }}>
        <div style={{ gridArea: 'a' }}>← 6</div>
        <div style={{ gridArea: 'b' }}></div>
        <div style={{ gridArea: 's', marginTop: '3em' }}>
          <h1 className={s.title}>About</h1>
          <p>Beyond his work, Evan is just a boy split between New {"{Haven, York}"}.</p>
        </div>
        <div style={{ gridArea: 'c' }}>
          Contact information:
          <ul>
            <li>– Email: evan.kirkiles@yale.edu</li>
            <li>– Instagram: @evankirkiles</li>
            <li>– GitHub: @evankirkiles</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
