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
import { GiHamburgerMenu } from 'react-icons/gi';
import { TfiClose } from 'react-icons/tfi';

export default function Nav({ children }: PropsWithChildren) {
  // close the menu when route changes
  const pathname = usePathname();
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <button className={classNames(s.button, {
        [s.button_offset]: pathname && pathname.split('/').length > 1
      })} onClick={() => setNavOpen(!navOpen)}>
        {navOpen ? (
          <>
            <TfiClose />
            <span>Close</span>
          </>
        ) : (
          <>
            <GiHamburgerMenu />
            <span>Menu</span>
          </>
        )}
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
