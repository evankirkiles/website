/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */
'use client';

import {
  MetaThemeColor,
  useMetaThemeColor,
} from '@/contexts/ThemeColorContext';
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

  // control menu open state
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <MetaThemeColor color={'#000000'} disabled={!navOpen} timeout={0} priority />
      <button
        className={classNames(s.button, {
          [s.button_offset]: pathname && pathname.split('/').length > 2,
        })}
        onClick={() => setNavOpen(!navOpen)}
      >
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
