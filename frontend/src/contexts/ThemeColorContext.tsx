/*
 * ThemeColorContext.tsx
 * author: evan kirkiles
 * created on Wed Apr 05 2023
 * 2023 evan's personal website
 */
'use client';

import { colorInterp } from '@/utils/colors';
import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

interface IColorContext {
  id: string;
  color: string;
  top: number;
  disabled?: boolean;
  priority?: boolean;
}

interface IThemeColorContext {
  colorContexts: Record<string, IColorContext>;
  onScrollChange: () => void;
}

// 1. Create a context to store the theme color
const ThemeColorContext = createContext<IThemeColorContext>({
  colorContexts: {},
  onScrollChange: () => {},
});

/* -------------------------------- Provider -------------------------------- */

interface IThemeColorProviderProps {
  initialColor?: string;
  timeout: number;
}

export const ScrollThemeColorProvider = ({
  children,
  initialColor,
  timeout,
}: PropsWithChildren<IThemeColorProviderProps>) => {
  // read in the existing DOM meta tag and its color, if it exists
  const baseColor = useRef<string | null>(initialColor ?? null);
  const colorContexts = useRef<Record<string, IColorContext>>({});
  const [activeContext, setActiveContext] = useState<IColorContext | null>(
    null
  );

  // lifecycle DOM selectors
  useEffect(() => {
    // find the theme color tag on mount, save its color, and remove it
    const metaTag = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );
    baseColor.current = initialColor ?? metaTag?.content ?? null;
    if (metaTag) metaTag.remove();
    return () => {
      // remove the background-color body style we added
      window.document.body.style.removeProperty('background-color');
    };
  }, [initialColor]);

  // scroll listener for updating the "activeContext" item
  const onScrollChange = useCallback(() => {
    setActiveContext(
      Object.values(colorContexts.current).reduce<IColorContext | null>(
        (prev, context) => {
          const active = !context.disabled && context.top <= window.scrollY;
          if (!active) return prev;
          if (!prev) return context;
          if (prev.priority && !context.priority) return prev;
          if (context.priority && !prev.priority) return context;
          if (prev.top > context.top) return prev;
          return context;
        },
        null
      )
    );
  }, [setActiveContext]);

  // scroll listener iterates through the attached color contexts. the one with
  // highest priority set the background color.
  useEffect(() => {
    window.addEventListener('scroll', onScrollChange, false);
    return () => window.removeEventListener('scroll', onScrollChange, false);
  }, [onScrollChange]);

  // transition effect between active contexts
  useEffect(() => {
    let endColor = activeContext?.color ?? baseColor.current;
    if (!endColor) return;
    window.document.body.style.backgroundColor = endColor;
  }, [activeContext, initialColor, timeout]);

  return (
    <ThemeColorContext.Provider
      value={{
        colorContexts: colorContexts.current,
        onScrollChange,
      }}
    >
      {children}
    </ThemeColorContext.Provider>
  );
};

/* ---------------------------------- Hook ---------------------------------- */

interface IScrollThemeColorHookOptions {
  priority?: boolean;
  disabled?: boolean;
  scrollFrac?: number;
  nodeRef?: MutableRefObject<HTMLElement>;
}

/**
 * Enables dynamic meta-tag theme coloring. Example usage:
 *
 * ```
 * useMetaThemeColor("#000000", { priority: true, scrollFrac: 1 });
 * ```
 */
export const useMetaThemeColor = (
  color: string,
  {
    priority = false,
    disabled = false,
    scrollFrac = 0,
    nodeRef,
  }: IScrollThemeColorHookOptions
) => {
  const id = useId();
  const { colorContexts, onScrollChange } = useContext(ThemeColorContext);

  // on mount, create entry in color contexts array for this element
  useEffect(() => {
    const top = nodeRef?.current
      ? nodeRef.current.getBoundingClientRect().top
      : window.innerHeight * scrollFrac;
    colorContexts[id] = {
      id,
      color,
      priority,
      disabled,
      top,
    };
    onScrollChange();
    // remove color context on dismount
    return () => {
      delete colorContexts[id];
      onScrollChange();
    };
  }, [
    id,
    color,
    priority,
    scrollFrac,
    nodeRef,
    disabled,
    colorContexts,
    onScrollChange,
  ]);

  // on resize, re-calculate the top position
  useEffect(() => {
    function resizeHandler() {
      const top = nodeRef?.current
        ? nodeRef.current.getBoundingClientRect().top
        : window.innerHeight * scrollFrac;
      colorContexts[id].top = top;
    }
    window.addEventListener('resize', resizeHandler, false);
    return () => window.removeEventListener('resize', resizeHandler, false);
  }, [nodeRef, scrollFrac, colorContexts, id]);
};

/* -------------------------------- Component ------------------------------- */

/**
 * Component wrapper allows use of client component in server component.
 *
 * @param param0
 * @returns
 */
export const MetaThemeColor = function ({
  color,
  ...options
}: IScrollThemeColorHookOptions & { color: string }) {
  // toggle the meta color on menu open
  useMetaThemeColor(color, options);
  return <></>;
};
