/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */
'use client';

import React from 'react';
import s from './styles.module.scss';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import {
  KeyboardEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { TfiClose } from 'react-icons/tfi';
import useTransition from 'react-transition-state';
import { useMetaTheme } from 'meta-theme-swap';

interface NavMenuProps {
  buttonRef: React.RefObject<HTMLButtonElement>;
  isEnter: boolean;
}

const FOCUS_SELECTOR = 'a[href]:not([disabled]), button:not([disabled])';

function NavMenu({
  buttonRef,
  children,
  isEnter,
}: PropsWithChildren<NavMenuProps>) {
  const menuRef = useRef<HTMLDivElement>(null);
  useMetaTheme(menuRef, { color: '#000000', priority: 1 });

  // Get all focusable elements in the nav menu
  const focusableEls = menuRef.current
    ? menuRef.current.querySelectorAll<HTMLElement>(FOCUS_SELECTOR)
    : [];
  const firstFocusable = focusableEls[0];
  const lastFocusable = focusableEls.length
    ? focusableEls[focusableEls.length - 1]
    : firstFocusable;
  // key listener to keep tabs within the nav menu
  const onKeyDown: KeyboardEventHandler<Element> = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === buttonRef.current) {
          lastFocusable.focus();
          e.preventDefault();
        } else if (document.activeElement === firstFocusable) {
          buttonRef.current?.focus();
          e.preventDefault();
        }
      } else if (document.activeElement === buttonRef.current) {
        firstFocusable.focus();
        e.preventDefault();
      } else if (document.activeElement === lastFocusable) {
        buttonRef.current?.focus();
        e.preventDefault();
      }
    }
  };

  // make sure nav button respects focus trapping
  if (isEnter) {
    if (buttonRef.current) buttonRef.current.onkeydown = (e: any) => onKeyDown(e);
  } else {
    if (buttonRef.current) buttonRef.current.onkeydown = null;
  }

  return (
    <nav
      ref={menuRef}
      id="navigation-menu"
      aria-hidden={!isEnter}
      onKeyDown={isEnter ? onKeyDown : undefined}
      className={classNames(s.container, {
        [s.container_active]: isEnter,
      })}
    >
      {children}
    </nav>
  );
}

export default function Nav({ children }: PropsWithChildren) {
  const buttonRef = useRef<HTMLButtonElement>(null);
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
      <button
        className={classNames(s.button, {
          [s.button_offset]: pathname && pathname.split('/').length > 2,
        })}
        ref={buttonRef}
        aria-label={`${isEnter ? 'Close' : 'Open'} the Navigation Menu`}
        aria-controls="navigation-menu"
        aria-expanded={isEnter}
        tabIndex={0}
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
        <NavMenu buttonRef={buttonRef} isEnter={isEnter}>
          {children}
        </NavMenu>
      )}
    </>
  );
}
