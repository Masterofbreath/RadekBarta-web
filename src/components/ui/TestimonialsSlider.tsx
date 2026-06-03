"use client";

import { useState } from "react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: Props) {
  const [paused, setPaused] = useState(false);

  // Duplicate for seamless infinite loop (-50% = back to start)
  const looped = [...testimonials, ...testimonials];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        className="flex gap-6 w-max px-6 lg:px-12 pb-6"
        style={{
          animation: "testimonials-scroll 80s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
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
    </div>
  );
}
