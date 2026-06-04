"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

/* ─── Data (services[0..3] = pořadí karet v layoutu) ───────── */

const services = [
  {
    // karta 0 — vlevo nahoře
    title: "Fyzické drahé kovy",
    shortLabel: "Drahé kovy",
    color: "#97724f",
    items: [
      {
        name: "Fyzické zlato a stříbro",
        desc: "Reálná kotva finanční jistoty — fyzické kovy si zachovají hodnotu bez ohledu na stav ekonomiky, inflaci či politická rozhodnutí.",
      },
      {
        name: "Ochrana hodnoty",
        desc: "Tvrdá aktiva mimo bankovní systém, která odolávají inflaci, krizi i tržní nestabilitě — a vy je skutečně vlastníte.",
      },
    ],
  },
  {
    // karta 1 — vlevo dole
    title: "Investiční nemovitosti",
    shortLabel: "Nemovitosti",
    color: "#2d2820",
    items: [
      {
        name: "Výběr nemovitostí",
        desc: "Cíleně vybíráme lokality a typy nemovitostí s potenciálem kapitálového zhodnocení i stabilního pasivního výnosu z nájmu.",
      },
      {
        name: "Financování",
        desc: "Chytré využití hypoték a úvěrů jako páky pro systematické budování rostoucího nemovitostního portfolia.",
      },
    ],
  },
  {
    // karta 2 — vpravo nahoře
    title: "Permanentní strategie",
    shortLabel: "Permanentní",
    color: "#bfa07a",
    items: [
      {
        name: "Strategie pro každé počasí",
        desc: "Akcie, dluhopisy, zlato i peněžní trh v jednom. Brownova 40letá strategie odolná inflaci i recesi.",
      },
      {
        name: "Aktivně řízený",
        desc: "Složení přizpůsobujeme vývoji trhů — nemusíte trhy sledovat sami. Pravidelný review a přizpůsobení vaší situaci.",
      },
    ],
  },
  {
    // karta 3 — vpravo dole
    title: "Dragon strategie",
    shortLabel: "Dragon",
    color: "#6b5548",
    items: [
      {
        name: "Fond kvalifikovaných investorů",
        desc: "Strategie světových hedge fondů: akcie, dluhopisy, zlato, Managed Futures a Long Volatility. Vstup od 1\u00a0mil.\u00a0Kč.",
      },
      {
        name: "Navržen pro nestabilní trhy",
        desc: "Obstojí v různých podmínkách včetně krizí, recese i zvýšené volatility — navržen právě pro náročné období.",
      },
    ],
  },
];

/*
  Mapování segmentu grafu → indexu karty (service).

  segPath(i) kreslí segmenty CW od vrcholu (0° = nahoru):
    i=0: pravý horní (0°–90°)  → karta 2 (vpravo nahoře)
    i=1: pravý dolní (90°–180°) → karta 3 (vpravo dole)
    i=2: levý dolní  (180°–270°) → karta 1 (vlevo dole)
    i=3: levý horní  (270°–360°) → karta 0 (vlevo nahoře)
*/
const SEG_TO_SERVICE = [2, 3, 1, 0] as const;
// Inverse: serviceToSeg[serviceIdx] = segIdx
const SERVICE_TO_SEG = [3, 2, 0, 1] as const;

/* ─── SVG helpers ───────────────────────────────────────────── */

const CX = 150, CY = 150, OR = 130, IR = 80;
const GAP_DEG = 4;
const SEG_DEG = 90; // 360 / 4

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function segPath(segIdx: number): string {
  const s = segIdx * SEG_DEG + GAP_DEG / 2;
  const e = s + SEG_DEG - GAP_DEG;
  const os = polar(CX, CY, OR, s);
  const oe = polar(CX, CY, OR, e);
  const is_ = polar(CX, CY, IR, s);
  const ie = polar(CX, CY, IR, e);
  return [
    `M ${os.x.toFixed(2)} ${os.y.toFixed(2)}`,
    `A ${OR} ${OR} 0 0 1 ${oe.x.toFixed(2)} ${oe.y.toFixed(2)}`,
    `L ${ie.x.toFixed(2)} ${ie.y.toFixed(2)}`,
    `A ${IR} ${IR} 0 0 0 ${is_.x.toFixed(2)} ${is_.y.toFixed(2)}`,
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
        style={{ backgroundColor: service.color, opacity: isActive ? 1 : 0.3 }}
      />

      {/* Title row */}
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
              <span className="font-semibold text-dark">{item.name}</span>
              {" — "}
              {item.desc}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Donut chart ───────────────────────────────────────────── */

function DonutChart({
  active,
  onSegEnter,
  onSegLeave,
}: {
  active: number | null;
  onSegEnter: (svcIdx: number) => void;
  onSegLeave: () => void;
}) {
  const activeService = active !== null ? services[active] : null;

  return (
    <svg
      viewBox="0 0 300 300"
      className="w-full h-full"
      style={{ overflow: "visible" }}
      aria-label="Přehled čtyř oblastí investic"
    >
      {/* Segmenty */}
      {([0, 1, 2, 3] as const).map((segIdx) => {
        const svcIdx = SEG_TO_SERVICE[segIdx];
        const svc = services[svcIdx];
        const isActive = active === svcIdx;
        return (
          <path
            key={segIdx}
            d={segPath(segIdx)}
            fill={svc.color}
            style={{
              opacity: active === null || isActive ? 1 : 0.28,
              transform: isActive ? "scale(1.06)" : "scale(1)",
              transformOrigin: `${CX}px ${CY}px`,
              transition: "transform 0.22s ease, opacity 0.22s ease",
              cursor: "pointer",
            }}
            onMouseEnter={() => onSegEnter(svcIdx)}
            onMouseLeave={onSegLeave}
          />
        );
      })}

      {/* Donut hole */}
      <circle cx={CX} cy={CY} r={IR - 4} fill="white" />

      {/* Středový obsah */}
      {activeService ? (
        <>
          <circle cx={CX} cy={CY - 20} r={6} fill={activeService.color} />
          {activeService.shortLabel.includes(" ") ? (
            <>
              <text x={CX} y={CY - 2} textAnchor="middle" fontSize="12" fill="#1a1a1a"
                fontWeight="700" fontFamily="system-ui,sans-serif">
                {activeService.shortLabel.split(" ")[0]}
              </text>
              <text x={CX} y={CY + 14} textAnchor="middle" fontSize="12" fill="#1a1a1a"
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
          <text x={CX} y={CY - 5} textAnchor="middle" fontSize="9" fill="#b5b0aa"
            fontFamily="system-ui,sans-serif" letterSpacing="0.12em">
            4 OBLASTI
          </text>
          <text x={CX} y={CY + 11} textAnchor="middle" fontSize="9" fill="#b5b0aa"
            fontFamily="system-ui,sans-serif" letterSpacing="0.06em">
            INVESTIC
          </text>
        </>
      )}
    </svg>
  );
}

/* ─── Main ──────────────────────────────────────────────────── */

export default function ServicesDonut() {
  const [active, setActive] = useState<number | null>(null);

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

        {/* ── Rozložení: [karta 0+1] | [donut] | [karta 2+3] ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_280px_1fr] gap-6 lg:gap-10 items-stretch lg:items-center">

          {/* Levý sloupec: karta 0 (vlevo nahoře) + karta 1 (vlevo dole) */}
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

          {/* Střed — donut */}
          <div className="flex justify-center items-center py-6 lg:py-0">
            <div className="w-full max-w-[260px] aspect-square">
              <DonutChart
                active={active}
                onSegEnter={(svcIdx) => setActive(svcIdx)}
                onSegLeave={() => setActive(null)}
              />
            </div>
          </div>

          {/* Pravý sloupec: karta 2 (vpravo nahoře) + karta 3 (vpravo dole) */}
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

// Suppress unused import warning — SERVICE_TO_SEG reserved for future connector lines
void SERVICE_TO_SEG;
