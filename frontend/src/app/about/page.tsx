/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 the nobot space,
 */
import ps from '@/styles/pages/Page.module.scss';

export default function About() {
  return (
    <main className={ps.container}>
      <section className={ps.columnMeta} style={{ maxWidth: 'unset' }}>
        <div style={{ gridArea: 'a' }}>← 6</div>
        <div style={{ gridArea: 'b' }}></div>
        <div style={{ gridArea: 's', marginTop: '3em' }}>
          <h1 className={ps.title}>About</h1>
          <p>Beyond his work, Evan is just a boy split between New {"{Haven, York}"}.</p>
        </div>
        <div style={{ gridArea: 'c' }}>
          Select design domains:
          <ul>
            <li>– Yale Experiment Programmers Organization</li>
            <li>– Yale University Art Gallery</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
