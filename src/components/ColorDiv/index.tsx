/*
 * index.tsx
 * author: evan kirkiles
 * created on Sun Jun 11 2023
 * 2023 the nobot space 
 */
"use client";

import { useMetaTheme } from "meta-theme-swap";
import { HTMLProps, useRef } from "react";

interface ColorDivProps {
  color: string;
  priority?: number;
}

export function ColorDiv({ color, priority, ...props }: HTMLProps<HTMLDivElement> & ColorDivProps) {
  const ref = useRef(null);
  useMetaTheme(ref, { color, priority });
  return <div {...props} ref={ref}/>
}

export function ColorMain({ color, priority, ...props }: HTMLProps<HTMLDivElement> & ColorDivProps) {
  const ref = useRef(null);
  useMetaTheme(ref, { color, priority });
  return <main {...props}  ref={ref}/>
}

export function ColorSection({ color, priority, ...props }: HTMLProps<HTMLDivElement> & ColorDivProps) {
  const ref = useRef(null);
  useMetaTheme(ref, { color, priority });
  return <main {...props}  ref={ref}/>
}

export function ColorFooter({ color, priority, ...props }: HTMLProps<HTMLDivElement> & ColorDivProps) {
  const ref = useRef(null);
  useMetaTheme(ref, { color, priority });
  return <footer {...props}  ref={ref}/>
}