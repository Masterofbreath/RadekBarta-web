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

    const apply = () => {
      container.scrollTop = 0;
      if (pathname === "/") {
        container.style.scrollSnapType = "";
      } else {
        container.style.scrollSnapType = "none";
      }
    };

    // Immediate reset
    apply();
    // Second pass after browser scroll-restoration may fire (typically <50 ms)
    const id = setTimeout(apply, 80);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}
