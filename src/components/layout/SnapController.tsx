"use client";

import { useLayoutEffect, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls to a hash element inside .page-scroll-container.
 *
 * WHY custom scroll: body has overflow:hidden on desktop, so native browser
 * hash navigation scrolls <html>/<body> (which can't scroll), not the actual
 * scrollable container. We must scroll the container directly.
 *
 * Uses instant positioning (no smooth animation) to avoid CSS snap/smooth
 * timing conflicts. Smooth behaviour is restored immediately after.
 */
export function scrollToHash(hash: string): boolean {
  const container = document.querySelector(
    ".page-scroll-container"
  ) as HTMLElement | null;
  const target = document.querySelector(hash) as HTMLElement | null;

  if (!container || !target) return false;

  // Explicitly disable snap and smooth before setting position
  container.style.scrollSnapType = "none";
  container.style.scrollBehavior = "auto";

  const navHeight = 80;
  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const newScrollTop =
    container.scrollTop + targetRect.top - containerRect.top - navHeight;

  container.scrollTop = newScrollTop;

  // Restore smooth scroll (not snap — that's managed by SnapController)
  requestAnimationFrame(() => {
    container.style.scrollBehavior = "";
  });

  return true;
}

/** Retries scrollToHash until the element is found (max ~800ms) */
function scrollToHashWithRetry(hash: string) {
  const delays = [0, 150, 350, 600, 900];
  const timers: ReturnType<typeof setTimeout>[] = [];

  delays.forEach((delay) => {
    timers.push(
      setTimeout(() => {
        scrollToHash(hash);
      }, delay)
    );
  });

  return () => timers.forEach(clearTimeout);
}

export default function SnapController() {
  const pathname = usePathname();

  // Sync (before paint): enable/disable snap, reset scroll
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

    // Always reset scroll to top on route change — hash scroll in useEffect below
    container.style.scrollBehavior = "auto";
    container.scrollTop = 0;
    // Re-enable smooth after instant reset
    requestAnimationFrame(() => {
      container.style.scrollBehavior = "";
    });
  }, [pathname]);

  // Async: if URL has hash, scroll to the target after route renders
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    return scrollToHashWithRetry(hash);
  }, [pathname]);

  // Same-page hash clicks (e.g. <a href="#kontakt"> when already on /investice)
  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash;
      if (hash) scrollToHashWithRetry(hash);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
