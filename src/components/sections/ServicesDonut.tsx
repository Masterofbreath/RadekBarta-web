"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

/* ─── Data ─────────────────────────────────────────────────── */

const services = [
  {
    title: "Fyzické drahé kovy",
    shortLabel: "Drahé kovy",
    color: "#97724f",
    items: [
      {
        name: "Fyzické zlato a stříbro",
        desc: "Kotva vaší finanční jistoty v každé ekonomické situaci.",
      },
      {
        name: "Ochrana hodnoty",
        desc: "Aktiva, která odolávají inflaci a tržní nestabilitě.",
      },
    ],
  },
  {
    title: "Investiční nemovitosti",
    shortLabel: "Nemovitosti",
    color: "#2d2820",
    items: [
      {
        name: "Výběr nemovitostí",
        desc: "S potenciálem zhodnocení a stabilního dlouhodobého výnosu.",
      },
      {
        name: "Financování",
        desc: "Chytré využití hypoték a úvěrů pro budování trvalého majetku.",
      },
    ],
  },
  {
    title: "Permanentní strategie",
    shortLabel: "Permanentní",
    color: "#bfa07a",
    items: [
      {
        name: "Strategie pro každé počasí",
        desc: "Fond investuje do akcií, dluhopisů, zlata a peněžního trhu. Prověřená 40letá strategie Harryho Browna odolná vůči inflaci i recesi.",
      },
      {
        name: "Aktivně řízený",
        desc: "Složení portfolia pravidelně přizpůsobujeme vývoji trhů. Nemusíte sledovat trhy sami — my se postaráme.",
      },
    ],
  },
  {
    title: "Dragon strategie",
    shortLabel: "Dragon",
    color: "#6b5548",
    items: [
      {
        name: "Fond kvalifikovaných investorů",
        desc: "Přístup ke strategiím světových hedge fondů. Kombinuje akcie, dluhopisy, zlato, Managed Futures a Long Volatility. Od 1 milionu Kč.",
      },
      {
        name: "Navržen pro nestabilní trhy",
        desc: "Navržen pro různé tržní podmínky včetně krizí.",
      },
    ],
  },
];

/* ─── SVG helpers ───────────────────────────────────────────── */

const CX = 150, CY = 150, OR = 130, IR = 80;
const GAP_DEG = 4;
const SEG_DEG = 360 / services.length; // 90° each

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function segPath(i: number): string {
  const s = i * SEG_DEG + GAP_DEG / 2;
  const e = s + SEG_DEG - GAP_DEG;
  const os = polar(CX, CY, OR, s);
  const oe = polar(CX, CY, OR, e);
  const is_ = polar(CX, CY, IR, s);
  const ie = polar(CX, CY, IR, e);
  const large = SEG_DEG - GAP_DEG > 180 ? 1 : 0;
  return [
    `M ${os.x.toFixed(2)} ${os.y.toFixed(2)}`,
    `A ${OR} ${OR} 0 ${large} 1 ${oe.x.toFixed(2)} ${oe.y.toFixed(2)}`,
    `L ${ie.x.toFixed(2)} ${ie.y.toFixed(2)}`,
    `A ${IR} ${IR} 0 ${large} 0 ${is_.x.toFixed(2)} ${is_.y.toFixed(2)}`,
    "Z",
  ].join(" ");
}

/* ─── Card ──────────────────────────────────────────────────── */

function Card({
  service,
  isActive,
  onEnter,
  onLeave,
}: {
  service: (typeof services)[0];
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="relative bg-[#f6f6f6] rounded-2xl lg:rounded-3xl p-7 lg:p-8 border border-[#e8e5e2] transition-all duration-300 h-full overflow-hidden cursor-default"
      style={{
        boxShadow: isActive
          ? `0 0 0 2px ${service.color}, 0 6px 28px rgba(0,0,0,0.07)`
          : "none",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Top color bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl lg:rounded-t-3xl transition-opacity duration-300"
        style={{ backgroundColor: service.color, opacity: isActive ? 1 : 0.35 }}
      />

      {/* Title */}
      <div className="flex items-center gap-2.5 mb-5 mt-1">
        <span
          className="w-2 h-2 rounded-full shrink-0 transition-transform duration-300"
          style={{
            backgroundColor: service.color,
            transform: isActive ? "scale(1.4)" : "scale(1)",
          }}
        />
        <h3 className="font-heading font-700 text-dark text-base lg:text-lg leading-tight">
          {service.title}
        </h3>
      </div>

      {/* Items */}
      <ul className="space-y-3">
        {service.items.map((item, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a889] mt-[6px] shrink-0" />
            <p className="text-[#555] text-sm leading-relaxed">
              {item.name && (
                <>
                  <span className="font-semibold text-dark">{item.name}</span>
                  {" — "}
                </>
              )}
              {item.desc}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */

export default function ServicesDonut() {
  const [active, setActive] = useState<number | null>(null);

  const activeService = active !== null ? services[active] : null;

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <Reveal>
            <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
              Co nabízím
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-dark mb-6">
              Komplexní přístup
              <br />
              k vašemu bohatství
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[#6b6b6b] text-lg leading-relaxed">
              Pomáhám rodinám i podnikatelům najít klid v nejisté době —
              nabízím jedinečnou kombinaci investic, které jsou prověřeny
              časem.
            </p>
          </Reveal>
        </div>

        {/* ── Rozložení: [karta 0 + 1] | [donut] | [karta 2 + 3] ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_280px_1fr] gap-6 lg:gap-10 items-stretch lg:items-center">

          {/* Levý sloupec — Fyzické drahé kovy + Investiční nemovitosti */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {[0, 1].map((idx) => (
              <Card
                key={idx}
                service={services[idx]}
                isActive={active === idx}
                onEnter={() => setActive(idx)}
                onLeave={() => setActive(null)}
              />
            ))}
          </div>

          {/* Střed — Donut chart */}
          <div className="flex justify-center items-center py-6 lg:py-0">
            <div className="w-full max-w-[260px] aspect-square">
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full"
                style={{ overflow: "visible" }}
                aria-label="Přehled oblastí investic"
              >
                {/* Segmenty */}
                {services.map((svc, i) => (
                  <path
                    key={i}
                    d={segPath(i)}
                    fill={svc.color}
                    style={{
                      opacity: active === null || active === i ? 1 : 0.28,
                      transform: active === i ? "scale(1.06)" : "scale(1)",
                      transformOrigin: `${CX}px ${CY}px`,
                      transition: "transform 0.22s ease, opacity 0.22s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                  />
                ))}

                {/* Donut hole — bílý kruh */}
                <circle cx={CX} cy={CY} r={IR - 4} fill="white" />

                {/* Středový obsah */}
                <g style={{ transition: "opacity 0.2s ease", opacity: 1 }}>
                  {activeService ? (
                    <>
                      {/* Barevná tečka */}
                      <circle cx={CX} cy={CY - 22} r={6} fill={activeService.color} />
                      {/* Název */}
                      {activeService.shortLabel.includes(" ") ? (
                        <>
                          <text x={CX} y={CY - 4} textAnchor="middle" fontSize="12" fill="#1a1a1a"
                            fontWeight="700" fontFamily="system-ui,sans-serif" letterSpacing="0">
                            {activeService.shortLabel.split(" ")[0]}
                          </text>
                          <text x={CX} y={CY + 12} textAnchor="middle" fontSize="12" fill="#1a1a1a"
                            fontWeight="700" fontFamily="system-ui,sans-serif">
                            {activeService.shortLabel.split(" ").slice(1).join(" ")}
                          </text>
                        </>
                      ) : (
                        <text x={CX} y={CY + 5} textAnchor="middle" fontSize="12" fill="#1a1a1a"
                          fontWeight="700" fontFamily="system-ui,sans-serif">
                          {activeService.shortLabel}
                        </text>
                      )}
                    </>
                  ) : (
                    <>
                      <text x={CX} y={CY - 6} textAnchor="middle" fontSize="9" fill="#b0aba6"
                        fontFamily="system-ui,sans-serif" letterSpacing="0.12em">
                        4 OBLASTI
                      </text>
                      <text x={CX} y={CY + 10} textAnchor="middle" fontSize="9" fill="#b0aba6"
                        fontFamily="system-ui,sans-serif" letterSpacing="0.06em">
                        INVESTIC
                      </text>
                    </>
                  )}
                </g>
              </svg>
            </div>
          </div>

          {/* Pravý sloupec — Permanentní strategie + Dragon strategie */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {[2, 3].map((idx) => (
              <Card
                key={idx}
                service={services[idx]}
                isActive={active === idx}
                onEnter={() => setActive(idx)}
                onLeave={() => setActive(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
