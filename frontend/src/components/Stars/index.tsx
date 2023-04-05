/*
 * index.tsx
 * author: evan kirkiles
 * created on Tue Apr 04 2023
 * 2023 the nobot space, 
 */
"use client";

import { HTMLProps, useEffect, useRef } from "react";



export default function Stars(props: HTMLProps<HTMLCanvasElement>) {
  const canvasRef = useRef(null);
  useEffect(() => {

  });

  return (
    <canvas {...props} ref={canvasRef} />
  )
}