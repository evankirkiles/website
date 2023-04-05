/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */
'use client';

import s from '@/styles/components/Nav.module.scss';
import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function Nav({ children }: PropsWithChildren) {

  // close the menu when route changes
  const pathname = usePathname();
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <button className={s.button} onClick={() => setNavOpen(!navOpen)}>
        {navOpen ? 'Close' : 'Menu'}
      </button>
      <nav
        className={classNames(s.container, {
          [s.container_active]: navOpen,
        })}
      >
        {children}
      </nav>
    </>
  );
}