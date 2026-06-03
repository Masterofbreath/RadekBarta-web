"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Disables scroll-snap on the page-scroll-container for every route
 * except the homepage. This prevents legal pages, landing pages, etc.
 * from auto-jumping to the footer (which is the only snap point there).
 */
export default function SnapController() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const container = document.querySelector(
      ".page-scroll-container"
    ) as HTMLElement | null;
    if (!container) return;

    // Disable snap FIRST so no snap-jump can occur, then reset scroll
    if (pathname === "/") {
      container.style.scrollSnapType = "";
    } else {
      container.style.scrollSnapType = "none";
    }
    container.scrollTop = 0;
  }, [pathname]);

  return null;
}
