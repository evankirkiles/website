/*
 * page.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */
import s from '@/styles/pages/Home.module.scss';

export default function Home() {
  return (
    <main className={s.container}>
      <section className={s.column}>
        <div style={{ gridArea: 'a' }}>March 23, 2022</div>
        <div style={{ gridArea: 'b' }}>1/1</div>
        <div style={{ gridArea: 's', position: 'relative' }}>
          <canvas className={s.stars} />
        </div>
        <div className={s.main}>
          <h1 className={s.title}>Evan Kirkiles</h1>
          <p>
            is a student in his junior year at Yale University. He
            currently works as a software engineer at Channel Studio, and will
            work this summer as an intern at the New York Times.
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
      <section className={s.column}>hi2</section>
    </main>
  );
}
