"use client";

import { useState, useEffect } from "react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

interface Props {
  testimonials: Testimonial[];
}

const CLAMP_LINES = 6;
// Aproximace: průměrně ~60 znaků na řádek × 6 řádků
const CLAMP_CHAR_THRESHOLD = 280;

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <line x1="5" y1="5" x2="15" y2="15" />
      <line x1="15" y1="5" x2="5" y2="15" />
    </svg>
  );
}

export default function TestimonialsSlider({ testimonials }: Props) {
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState<Testimonial | null>(null);

  // Zavření modalu klávesou Escape
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setExpanded(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  // Zablokování scrollu pod modalem
  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [expanded]);

  // Duplicate for seamless infinite loop (-50% = back to start)
  const looped = [...testimonials, ...testimonials];

  return (
    <>
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
          {looped.map((t, i) => {
            const isTruncated = t.quote.length > CLAMP_CHAR_THRESHOLD;
            return (
              <div
                key={i}
                className="shrink-0 w-[300px] sm:w-[340px] lg:w-[380px]"
                aria-hidden={i >= testimonials.length}
              >
                <div
                  onClick={() => setExpanded(t)}
                  className="group bg-white rounded-2xl lg:rounded-3xl p-8 border border-[#e8e5e2] hover:border-[#c5a889] transition-colors duration-300 h-full flex flex-col cursor-pointer"
                >
                  <span
                    className="font-heading font-700 text-5xl leading-none mb-4 block"
                    style={{ color: "#c5a889" }}
                  >
                    "
                  </span>
                  <p className={`text-[#1a1a1a] text-sm leading-relaxed flex-1 mb-4 line-clamp-${CLAMP_LINES}`}>
                    {t.quote}
                  </p>
                  {/* Hint "číst více" — zobrazí se jen u dlouhých referencí */}
                  {isTruncated && (
                    <p className="text-[#c5a889] text-xs font-medium mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Číst celou referenci →
                    </p>
                  )}
                  <div className="border-t border-[#e8e5e2] pt-4">
                    <p className="font-heading font-700 text-dark text-sm">{t.name}</p>
                    <p className="text-[#97724f] text-xs mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal s celou referencí */}
      {expanded && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
          onClick={() => setExpanded(null)}
        >
          <div
            className="bg-white rounded-2xl lg:rounded-3xl p-8 lg:p-10 max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <span
                className="font-heading font-700 text-5xl leading-none block"
                style={{ color: "#c5a889" }}
              >
                "
              </span>
              <button
                onClick={() => setExpanded(null)}
                aria-label="Zavřít"
                className="text-[#9b9b9b] hover:text-dark transition-colors mt-1 shrink-0"
              >
                <CloseIcon />
              </button>
            </div>
            <p className="text-[#1a1a1a] text-base leading-relaxed mb-6">
              {expanded.quote}
            </p>
            <div className="border-t border-[#e8e5e2] pt-4">
              <p className="font-heading font-700 text-dark text-sm">{expanded.name}</p>
              <p className="text-[#97724f] text-xs mt-0.5">{expanded.role}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
