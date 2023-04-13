/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */
import s from './styles.module.scss';
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io';

export default function Footer() {
  return (
    <div className={s.container}>
      <div className={s.credits_col}>
        <p className={s.credits}>© 2023 Evan Kirkiles.</p>
        <p>Typeface: Akzidenz Grotesk.</p>
        <p>Stack: Next.js 13, Sanity CMS.</p>
        <ul className={s.credits_buttons}>
          <li>
            <a
              href="https://www.instagram.com/evankirkiles"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IoLogoInstagram />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/evankirkiles"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IoLogoGithub />
            </a>
          </li>
          <li>
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
    </div>
  );
}
