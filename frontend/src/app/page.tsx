/*
 * page.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */
import Card from '@/components/Card';
import ps from '@/styles/pages/Page.module.scss';
import s from '@/styles/pages/Home.module.scss';
import Link from 'next/link';
import ABOPS from '../assets/img/abops.png';
import PAPER from '../assets/img/paperarium.png';
import WEBWORLD from '../assets/img/webworld.png';

export default function Home() {
  return (
    <main className={ps.container}>
      <section className={ps.columnMeta}>
        {/* <div style={{ gridArea: 'a', fontWeight: 800 }}>EK</div> */}
        <div style={{ gridArea: 'b', position: 'relative' }}>
          <ul className={s.links}>
            <li>
              <Link href="/work">Work</Link>
            </li>
            <li>Projects</li>
            <li>Designs</li>
            <li>About</li>
            <li>Play</li>
          </ul>
        </div>
        <div className={s.stars}>
          <canvas className={s.stars_inner} />
        </div>
        <div className={s.main}>
          <h1 className={s.title}>Evan Kirkiles</h1>
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
        {/* <Card
          item={{
            title: 'A Bit of Personal Space',
            imgSrc: ABOPS,
            date: new Date(2002),
          }}
        />
        <Card
          item={{
            title: 'Web Worlding',
            imgSrc: WEBWORLD,
            date: new Date(2022),
          }}
        />
        <Card
          item={{
            title: 'Paperarium / Papercraft',
            imgSrc: PAPER,
            date: new Date(2002),
          }}
        /> */}
        <div>See more in the Projects section {'->'}</div>
      </section>
    </main>
  );
}
