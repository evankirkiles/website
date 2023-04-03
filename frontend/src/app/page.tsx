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
        <h1 className={s.title}>Evan Kirkiles</h1>
        <p>is a student, software engineer, papercrafter, and designer. He currently
          works as a software engineer at Channel Studio, and will work this summer as an intern
          at the New York Times.
        </p>
        <br />
        <p>He enjoys:</p>
        <ul>
          <li>– Design</li>
          <li>– Full-stack development</li>
          <li>– Paper sculpture</li>
          <li>– Photogrammetry</li>
        </ul>
      </section>
      <section className={s.column}>hi2</section>
    </main>
  );
}
