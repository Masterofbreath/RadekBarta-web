"use client";

import { useLayoutEffect, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls to a hash target inside the .page-scroll-container.
 * Necessary because body has overflow:hidden on desktop — native browser
 * hash navigation scrolls the document, not the custom scroll container.
 * Exported so other components (e.g. InvesticeHero) can reuse it.
 */
export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const container = document.querySelector(
    ".page-scroll-container"
  ) as HTMLElement | null;
  const target = document.querySelector(hash) as HTMLElement | null;
  if (!target) return;

  const navHeight = 80; // fixed nav height (h-20 = 5rem)

  if (container) {
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const newScrollTop =
      container.scrollTop + targetRect.top - containerRect.top - navHeight;
    container.scrollTo({ top: newScrollTop, behavior });
  } else {
    target.scrollIntoView({ behavior });
  }
}

/**
 * Controls scroll-snap on the .page-scroll-container:
 * - Enabled on homepage ("/")
 * - Disabled on all other routes
 *
 * Also handles hash anchor scrolling, which native browser can't do
 * because body has overflow:hidden on desktop.
 */
export default function SnapController() {
  const pathname = usePathname();

  // Sync: disable/enable snap + reset scroll before paint
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

    // Reset scroll to top on every route change (hash scroll handled below)
    container.scrollTop = 0;
  }, [pathname]);

  // After render: scroll to hash if present (cross-page navigation)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    // Wait for the incoming page's components to mount
    const timer = setTimeout(() => scrollToHash(hash), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Same-page hash changes (e.g. clicking <a href="#kontakt"> on investice page)
  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash;
      if (hash) scrollToHash(hash);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
