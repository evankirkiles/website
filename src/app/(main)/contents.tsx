/*
 * contents.tsx
 * author: evan kirkiles
 * created on Tue Jun 06 2023
 * 2023 the nobot space 
 */
"use client";

import { useMetaTheme } from "meta-theme-swap";
import { HTMLProps, useRef } from "react";

export default function PageContents(props: HTMLProps<HTMLDivElement>) {
  const itemsRef = useRef<HTMLDivElement>(null);
  useMetaTheme(itemsRef, { color: "#000000" });
  return (
    <section {...props} ref={itemsRef} />
  )
}