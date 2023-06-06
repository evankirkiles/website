/*
 * ThemeColorContext.tsx
 * author: evan kirkiles
 * created on Wed Apr 05 2023
 * 2023 evan's personal website
 */
'use client';

import { MetaThemeProvider } from 'meta-theme-swap';
import {
  createContext,
  HTMLProps,
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
  timeout?: number;
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
  timeout?: number;
}

export const ScrollThemeColorBody = ({
  initialColor,
  timeout = 0,
  ...props
}: HTMLProps<HTMLBodyElement> & IThemeColorProviderProps) => {
  // read in the existing DOM meta tag and its color, if it exists
  const bodyRef = useRef<HTMLBodyElement>(null);
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
    baseColor.current =
      initialColor ??
      metaTag?.content ??
      bodyRef?.current?.style.backgroundColor ??
      null;
    if (metaTag) metaTag.remove();
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

  return (
    <ThemeColorContext.Provider
      value={{
        colorContexts: colorContexts.current,
        onScrollChange,
      }}
    >
      <body
        {...props}
        style={{
          ...props.style,
          transition: `background-color ${
            activeContext?.timeout ?? timeout / 1000
          }s ease-in-out`,
          backgroundColor:
            activeContext?.color ?? baseColor.current ?? undefined,
        }}
        ref={bodyRef}
      ></body>
    </ThemeColorContext.Provider>
  );
};

/* ---------------------------------- Hook ---------------------------------- */

interface IScrollThemeColorHookOptions {
  priority?: boolean;
  disabled?: boolean;
  scrollFrac?: number;
  timeout?: number;
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
    timeout,
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
      timeout,
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
    timeout,
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

export const MetaThemeProviderWrapper = function({ children}: PropsWithChildren) {
  return <MetaThemeProvider>
    {children}
  </MetaThemeProvider>
}