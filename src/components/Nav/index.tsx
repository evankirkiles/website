/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */
'use client';

import { MetaThemeColor } from '@/contexts/ThemeColorContext';
import s from './styles.module.scss';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { TfiClose } from 'react-icons/tfi';
import useTransition from 'react-transition-state';

export default function Nav({ children }: PropsWithChildren) {
  // control menu open state
  const [{ isMounted, isEnter }, toggle] = useTransition({
    timeout: 300,
    mountOnEnter: true,
    unmountOnExit: true,
  });

  // close the menu when route changes
  const pathname = usePathname();
  useEffect(() => {
    toggle(false);
  }, [pathname]);

  return (
    <>
      <MetaThemeColor
        color={'#000000'}
        disabled={!isEnter}
        timeout={0}
        priority
      />
      <button
        className={classNames(s.button, {
          [s.button_offset]: pathname && pathname.split('/').length > 2,
        })}
        aria-label="Menu"
        onClick={() => toggle()}
      >
        {isEnter ? (
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
      {isMounted && (
        <nav
          className={classNames(s.container, {
            [s.container_active]: isEnter,
          })}
        >
          {children}
        </nav>
      )}
    </>
  );
}
