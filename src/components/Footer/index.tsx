/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */
import s from './styles.module.scss';

export default function Footer() {
  return (
    <div className={s.container}>
      <span>© 2023 Evan Kirkiles.</span>
      <span>Typeface: Akzidenz Grotesk.</span>
      <span>Stack: Next.js 13, Sanity CMS.</span>
    </div>
  );
}
