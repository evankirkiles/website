/*
 * ThemeColorContext.tsx
 * author: evan kirkiles
 * created on Wed Apr 05 2023
 * 2023 evan's personal website
 */

import { colorInterp } from '@/utils/colors';
import { createContext, PropsWithChildren, Ref, useEffect, useRef } from 'react';

interface IColorContext {
  _type: string;
  color: string;
  priority?: number;
}

interface IColorContextScroll extends IColorContext {
  _type: 'scrollFrac';
  scrollFrac: number;
}

interface IColorContextBreakpoint {
  _type: 'node';
  node: Ref<HTMLElement>;
}

interface IThemeColorContext {
  colorMap: Record<string, IColorContextScroll | IColorContextBreakpoint>;
  initialColor?: string;
}

// 1. Create a context to store the theme color
const ThemeColorContext = createContext<IThemeColorContext>({
  colorMap: {},
});

/* -------------------------------- Provider -------------------------------- */

interface IThemeColorProviderProps {
  initialColor?: string;
}

export const ThemeColorProvider = ({
  children,
  initialColor,
}: PropsWithChildren<IThemeColorProviderProps>) => {
  // read in the existing DOM meta tag and its color, if it exists
  const themeColorTag = useRef<HTMLMetaElement | null>(null);
  const baseColor = useRef<string | null>(initialColor ?? null);

  // lifecycle DOM selectors
  useEffect(() => {
    // find the theme color tag on mount
    themeColorTag.current = document.querySelector('meta[name="theme-color"]');
    baseColor.current = initialColor ?? themeColorTag.current?.content ?? null;
    return () => {
      // reset the theme color tag on dismount
      if (themeColorTag.current && baseColor.current)
        themeColorTag.current.content = baseColor.current;
      // and remove the background-color body style we added
      window.document.body.style.removeProperty('background-color');
    };
  }, [initialColor]);

  // scroll listener iterates through the attached color contexts
  useEffect(() => {

  }, []);
  

  const [themeColor, setThemeColor] = useState('#ffffff');
  return (
    <ThemeColorContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
};
