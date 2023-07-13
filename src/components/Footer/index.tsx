/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */
import { ColorFooter } from '@/components/ColorDiv';
import s from './styles.module.scss';
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io';

export default function Footer() {
  return (
    <ColorFooter color="#000000" className={s.container}>
      <div className={s.credits_col}>
        <p className={s.credits}>© 2023 Evan Kirkiles.</p>
        <p>Typeface is Akzidenz Grotesk.</p>
        <p>Stack is Next.js 13 &amp; Sanity CMS.</p>
      </div>
      <div className={s.contact_button}>
        <a href="mailto:kirkilese@gmail.com" tabIndex={0}>
          Contact
        </a>
      </div>
      <ul className={s.credits_buttons}>
        <li>
          <a
            href="https://www.instagram.com/evankirkiles"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Go to Evan's Instagram"
            tabIndex={0}
          >
            <IoLogoInstagram />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/evankirkiles"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Go to Evan's GitHub"
            tabIndex={0}
          >
            <IoLogoGithub />
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/en/evankirkiles"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Go to Evan's LinkedIn"
            tabIndex={0}
          >
            <IoLogoLinkedin />
          </a>
        </li>
      </ul>
    </ColorFooter>
  );
}
