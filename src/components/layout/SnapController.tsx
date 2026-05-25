"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Disables scroll-snap on the page-scroll-container for every route
 * except the homepage. This prevents legal pages, landing pages, etc.
 * from auto-jumping to the footer (which is the only snap point there).
 */
export default function SnapController() {
  const pathname = usePathname();

  useEffect(() => {
    const container = document.querySelector(
      ".page-scroll-container"
    ) as HTMLElement | null;
    if (!container) return;

    if (pathname === "/") {
      container.style.scrollSnapType = "";
    } else {
      container.style.scrollSnapType = "none";
    }
  }, [pathname]);

  return null;
}
