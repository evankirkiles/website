/*
 * PageContext.tsx
 * author: evan kirkiles
 * created on Fri Jun 23 2023
 * 2023 the nobot space 
 */
"use client";

import { usePathname } from "next/navigation";
import React, { PropsWithChildren, useContext, useEffect } from "react";
import { useState } from "react";

interface PageContextProps {
  setNextPage: (path: string) => void;
}

export const PageContext = React.createContext<PageContextProps>({
  setNextPage: () => void 0
});

export default function PageContextProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [nextPage, setNextPage] = useState<string | null>(null);
  // useEffect(() => {
    
  // }, []);

  return <PageContext.Provider value={{ setNextPage }}>
    {children}
  </PageContext.Provider>
}