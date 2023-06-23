/*
 * index.tsx
 * author: evan kirkiles
 * created on Fri Jun 23 2023
 * 2023 the nobot space 
 */
"use client";

import { PageContext } from "@/contexts/PageContext";
import Link from "next/link";
import { useContext } from "react";

export default function PageLink(props: Parameters<typeof Link>[0]) {
  const { setNextPage } = useContext(PageContext);
  return <Link {...props} onClick={(...args) => {
    setNextPage(props.href.toString());
    document.body.setAttribute("data-ewk-nextpage", props.href.toString());
    props.onClick && props.onClick(...args);
  }} />
}