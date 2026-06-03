"use client";

import { useRef, useEffect } from "react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let paused = false;
    let animId: number;

    const tick = () => {
      if (!paused && container) {
        container.scrollLeft += 0.4;
        // Seamless loop: when we hit the midpoint, jump back to start
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    const pause = () => { paused = true; };
    const resume = () => { paused = false; };

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);
    container.addEventListener("touchstart", pause, { passive: true });
    container.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
      container.removeEventListener("touchstart", pause);
      container.removeEventListener("touchend", resume);
    };
  }, []);

  // Duplicate items for seamless infinite loop
  const looped = [...testimonials, ...testimonials];

  return (
    <div
      ref={containerRef}
      className="flex gap-6 overflow-x-auto pb-6 px-6 lg:px-12"
      style={{ scrollbarWidth: "none" }}
    >
      {looped.map((t, i) => (
        <div
          key={i}
          className="shrink-0 w-[300px] sm:w-[340px] lg:w-[380px]"
          aria-hidden={i >= testimonials.length}
        >
          <div className="bg-white rounded-2xl lg:rounded-3xl p-8 border border-[#e8e5e2] hover:border-[#c5a889] transition-colors duration-300 h-full flex flex-col">
            <span
              className="font-heading font-700 text-5xl leading-none mb-4 block"
              style={{ color: "#c5a889" }}
            >
              "
            </span>
            <p className="text-[#1a1a1a] text-sm leading-relaxed flex-1 mb-6 line-clamp-6">
              {t.quote}
            </p>
            <div className="border-t border-[#e8e5e2] pt-4">
              <p className="font-heading font-700 text-dark text-sm">{t.name}</p>
              <p className="text-[#97724f] text-xs mt-0.5">{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
