/*
 * index.tsx
 * author: evan kirkiles
 * created on Sat Apr 08 2023
 * 2023 the nobot space,
 */
'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, HTMLProps, RefAttributes } from 'react';

interface INavLinkProps {
  classNameActive?: string;
}

export default function NavLink({
  classNameActive,
  ...props
}: ComponentProps<typeof Link> & INavLinkProps) {
  const path = usePathname();
  return (
    <Link
      {...props}
      className={classNames(
        props.className,
        classNameActive
          ? {
              [classNameActive]: props.href === path,
            }
          : undefined
      )}
    />
  );
}
