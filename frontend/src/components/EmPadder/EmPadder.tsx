 /*
 * EmPadder.tsx
 * author: evan kirkiles
 * created on Fri Apr 07 2023
 * 2023 evan's personal website
 *
 * A component which monitors resize events and changes the bottom padding
 * to keep it consistent with the em size.
 */
'use client';

import { HTMLProps, useLayoutEffect, useRef } from 'react';

export default function EmPadder(props: HTMLProps<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  // on window resize, adjust em padding
  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      let timeout: number;
      function onResize() {
        if (timeout) window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
          if (!ref.current) return;
          const emSize = parseFloat(window.getComputedStyle(ref.current).fontSize);
          const { width, height } = ref.current.getBoundingClientRect();
          let b = (height % (emSize)) / emSize;
          let r = (width % (emSize)) / emSize;
          ref.current.style.paddingBottom = `${((b < 0.7 ? b + 1 : b) - 0.15) * emSize}px`;
          ref.current.style.paddingRight = `${((r < 0.7 ? r + 1 : b) - 0.15) * emSize}px`;
          ref.current.style.transition = `padding 0.1s ease-in-out`;
        }, timeout ? 100 : 0);
      }
      onResize();
      window.addEventListener('resize', onResize, false);
      return () => window.removeEventListener('resize', onResize, false);
    }, []);
  }

  return (
    <section {...props} ref={ref}>
      {props.children}
    </section>
  );
}
