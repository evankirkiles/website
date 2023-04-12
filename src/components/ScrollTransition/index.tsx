/*
 * index.tsx
 * author: evan kirkiles
 * created on Wed Apr 12 2023
 * 2023 the nobot space,
 */
'use client';

import classNames from 'classnames';
import { HTMLProps, useEffect, useReducer, useState } from 'react';

interface IScrollTransitionProps {
  triggerFrac: number;
  beforeClass?: string;
  afterClass?: string;
}

export default function ScrollTransition({
  triggerFrac,
  beforeClass,
  afterClass,
  children,
  ...props
}: HTMLProps<HTMLDivElement> & IScrollTransitionProps) {
  const [pastTrigger, checkPastTrigger] = useReducer(
    () => window.scrollY > triggerFrac * window.innerWidth,
    false
  );
  useEffect(() => {
    checkPastTrigger();
    window.addEventListener('scroll', checkPastTrigger, false);
    return () => window.removeEventListener('scroll', checkPastTrigger, false);
  }, [triggerFrac]);

  return (
    <div
      {...props}
      className={classNames(
        props.className,
        pastTrigger ? afterClass : beforeClass
      )}
    >
      {children}
    </div>
  );
}
