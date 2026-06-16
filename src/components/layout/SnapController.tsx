"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Disables scroll-snap on the page-scroll-container for every route
 * except the homepage. Respects hash anchors — if the URL contains a
 * hash (e.g. /investice#kontakt), does NOT reset scroll to top but
 * instead scrolls the target element into view after navigation.
 */
export default function SnapController() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const container = document.querySelector(
      ".page-scroll-container"
    ) as HTMLElement | null;
    if (!container) return;

    if (pathname === "/") {
      container.style.scrollSnapType = "";
    } else {
      container.style.scrollSnapType = "none";
    }

    const hash = window.location.hash;

    if (hash) {
      // Let the browser render the page first, then scroll to anchor
      requestAnimationFrame(() => {
        const target = document.querySelector(hash) as HTMLElement | null;
        if (target) {
          target.scrollIntoView({ behavior: "instant" });
        }
      });
    } else {
      container.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
