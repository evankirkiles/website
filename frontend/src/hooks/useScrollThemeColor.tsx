/*
 * useScrollThemeColor.tsx
 * author: evan kirkiles
 * created on Wed Apr 05 2023
 * 2023 evan's personal website
 *
 * Implements a component and hook for dynamically changing the theme color of
 * the page on iOS devices once a user scrolls past a specific fraction of the
 * viewport's height. The logic is currently a mess, can probably be cleaned up
 * a bit. BUT it works quite well.
 */
'use client';

import { colorInterp } from '@/utils/colors';
import { PropsWithChildren, useEffect, useRef } from 'react';

/**
 * Helper function for determining if a device is running on iOS.
 * See: https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
 *
 * @returns Whether or not the device is an iOS device.
 */
function iOS() {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}

/* ---------------------------------- Hook ---------------------------------- */

interface IScrollThemeColorOptions {
  color: string;
  scrollFrac: number;
  timeout?: number;
}

/**
 * A function which dynamically changes the theme color of the page once a
 * user scrolls past a specific fraction of the viewport's height.
 */
export function useScrollThemeColor({
  color,
  scrollFrac,
  timeout = 300,
}: IScrollThemeColorOptions) {
  // save a reference to the theme color tag and its starting color
  const themeColorTag = useRef<HTMLMetaElement | null>(null);
  const initialThemeColor = useRef<string | null>(null);

  // lifecycle DOM selectors
  useEffect(() => {
    // find the theme color tag on mount
    themeColorTag.current = document.querySelector('meta[name="theme-color"]');
    initialThemeColor.current = themeColorTag.current?.content ?? null;
    return () => {
      // reset the theme color tag on dismount
      if (themeColorTag.current && initialThemeColor.current) {
        themeColorTag.current.content = initialThemeColor.current;
        window.document.body.style.removeProperty('background-color');
      }
    };
  });

  // add scroll listener for updating the theme color
  useEffect(() => {
    // update function called on every RAF to tween theme color
    let forwards: boolean | undefined;
    let startTime: number | undefined;
    let animationFrame: number | undefined;
    function update(timestep: number) {
      if (!themeColorTag.current || !initialThemeColor.current) return;
      if (!startTime) startTime = timestep;
      let pt = Math.max(0, Math.min(1, (timestep - startTime) / timeout));
      const p = !forwards ? pt : 1 - pt;
      // update color of theme-color tag
      themeColorTag.current.content = colorInterp(
        initialThemeColor.current,
        color,
        p
      );
      // run the function again
      if (
        pt == 1 ||
        (forwards && themeColorTag.current.content == color) ||
        (!forwards &&
          themeColorTag.current.content == initialThemeColor.current)
      ) {
        startTime = undefined;
        animationFrame = undefined;
        forwards = undefined;
      } else {
        animationFrame = window.requestAnimationFrame(update);
      }
    }

    // if (!iOS()) return;

    // apply scroll listeners with above update information
    function scrollListener() {
      if (!themeColorTag.current) return;
      if (window.scrollY > window.innerHeight * scrollFrac) {
        if (themeColorTag.current.content == color || forwards === true) return;
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        startTime = undefined;
        forwards = true;
        animationFrame = window.requestAnimationFrame(update);
        window.document.body.style.backgroundColor = color;
      } else if (initialThemeColor.current) {
        if (
          themeColorTag.current.content == initialThemeColor.current ||
          forwards === false
        )
          return;
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        startTime = undefined;
        forwards = false;
        animationFrame = window.requestAnimationFrame(update);
        window.document.body.style.backgroundColor = initialThemeColor.current;
      }
    }
    scrollListener();
    window.addEventListener('scroll', scrollListener, false);
    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', scrollListener, false);
    };
  }, [color, scrollFrac, timeout]);
}

/* -------------------------------- Component ------------------------------- */

/**
 * A client component wrapper for the useScrollThemeColor hook.
 * @param param0
 * @returns
 */
export default function ScrollThemeColorChanger({
  color,
  scrollFrac,
}: IScrollThemeColorOptions) {
  // add client-side theme color changer
  useScrollThemeColor({ color, scrollFrac });
  return null;
}
