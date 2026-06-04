"use client";

import { useState, useMemo } from "react";

const INFLATION = 0.032;
const RENTA_HORIZON = 20; // let pro zobrazení "Zachováno jmění"

function formatCZK(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2).replace(".", ",")} mil. Kč`;
  }
  if (value >= 1_000) {
    return `${Math.round(value).toLocaleString("cs-CZ")} Kč`;
  }
  return `${Math.round(value)} Kč`;
}

function yearsLabel(v: number) {
  return `${v} ${v === 1 ? "rok" : v < 5 ? "roky" : "let"}`;
}

function depletionLabel(months: number): string {
  if (months < 12) {
    return `${months} ${months === 1 ? "měsíc" : months < 5 ? "měsíce" : "měsíců"}`;
  }
  const y = Math.round(months / 12);
  return yearsLabel(y);
}

interface SliderProps {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
  editable?: boolean; // kliknutí na hodnotu otevře inline input — umožní zadat číslo nad max slideru
}

function Slider({ label, hint, value, min, max, step, format, onChange, editable }: SliderProps) {
  const [draft, setDraft] = useState<string | null>(null);
  // Clamp visually — slider bar stays in range even when state holds out-of-range values
  const clampedVal = Math.min(max, Math.max(min, value));
  const pct = ((clampedVal - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline gap-2">
        <span className="text-sm font-medium text-dark leading-tight">
          {label}
          {hint && <span className="text-[#9b9b9b] font-normal text-xs ml-1">{hint}</span>}
        </span>
        {editable ? (
          draft !== null ? (
            <input
              type="number"
              autoFocus
              min={0}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={() => {
                const parsed = parseInt(draft, 10);
                if (!isNaN(parsed) && parsed >= 0) onChange(parsed);
                setDraft(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                if (e.key === "Escape") setDraft(null);
              }}
              className="text-sm font-heading font-700 text-[#97724f] shrink-0 text-right border-b border-[#97724f] bg-transparent outline-none w-32"
            />
          ) : (
            <button
              onClick={() => setDraft(String(value))}
              title="Klikněte pro zadání vlastní hodnoty"
              className="text-sm font-heading font-700 text-[#97724f] shrink-0 hover:underline cursor-text"
            >
              {format(value)}
            </button>
          )
        ) : (
          <span className="text-sm font-heading font-700 text-[#97724f] shrink-0">{format(value)}</span>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={clampedVal}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ background: `linear-gradient(to right, #97724f ${pct}%, #e8e5e2 ${pct}%)` }}
      />
    </div>
  );
}

function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-1 p-1 bg-[#eeebe8] rounded-xl w-fit">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            value === opt.value
              ? "bg-white text-dark shadow-sm"
              : "text-[#6b6b6b] hover:text-dark"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function InvestmentCalculator() {
  /* ── Hlavní kalkulačka ── */
  const [initial, setInitial] = useState(500_000);
  const [monthly, setMonthly] = useState(5_000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(7);

  /* ── Nekonečná renta ── */
  const [withdrawalPct, setWithdrawalPct] = useState(5); // % výběru ročně z portfolia — může být mimo rozsah slideru
  const [kczDraft, setKczDraft] = useState<string | null>(null); // dočasný stav při editaci Kč inputu

  /* ── Konečná renta ── */
  const [finiteRentaRate, setFiniteRentaRate] = useState(5); // úroková sazba v PMT vzorci
  const [rentaYears, setRentaYears] = useState(20);

  /* ── Přepínač režimu renty ── */
  const [rentaMode, setRentaMode] = useState<"infinite" | "finite">("infinite");

  /* ── Inflace ── */
  const [withInflation, setWithInflation] = useState(false);

  /* ══════════════════════════════════════════
     Výpočty — hlavní kalkulačka
  ══════════════════════════════════════════ */
  const { yearlyData, totalInvested, finalValue } = useMemo(() => {
    const r = returnRate / 100 / 12;
    const data: { year: number; invested: number; value: number }[] = [];
    for (let y = 1; y <= years; y++) {
      const n = y * 12;
      const fv =
        initial * Math.pow(1 + r, n) +
        (r > 0 ? monthly * ((Math.pow(1 + r, n) - 1) / r) : monthly * n);
      data.push({ year: y, invested: initial + monthly * n, value: Math.round(fv) });
    }
    const last = data[data.length - 1];
    return { yearlyData: data, totalInvested: last.invested, finalValue: last.value };
  }, [initial, monthly, years, returnRate]);

  const deflate = (nominal: number, yrs: number) =>
    withInflation ? nominal / Math.pow(1 + INFLATION, yrs) : nominal;

  const dispFinalValue = deflate(finalValue, years);
  const dispInvested   = deflate(totalInvested, years);
  const dispProfit     = dispFinalValue - dispInvested;
  const dispProfitPct  = dispInvested > 0 ? Math.round((dispProfit / dispInvested) * 100) : 0;

  /* ══════════════════════════════════════════
     Výpočty — Nekonečná renta
     Portfolio dále roste tempem returnRate.
     Klient si vybírá withdrawalPct % ročně.
  ══════════════════════════════════════════ */
  const infiniteMonthly = (finalValue * withdrawalPct / 100) / 12;
  const infiniteAnnual  = infiniteMonthly * 12;

  // Portfolio roste tempem returnRate a zároveň se z něj vybírá pevná měsíční částka
  const infGrowthR  = returnRate / 100 / 12; // měsíční výnos z hlavní kalkulačky
  const nHorizon    = RENTA_HORIZON * 12;

  const remainingAfterHorizon = infGrowthR > 0
    ? finalValue * Math.pow(1 + infGrowthR, nHorizon)
      - infiniteMonthly * (Math.pow(1 + infGrowthR, nHorizon) - 1) / infGrowthR
    : finalValue - infiniteMonthly * nHorizon;

  // Stav portfolia: roste / stabilní / klesá
  const netAnnual = returnRate - withdrawalPct; // čistý roční přírůstek v %
  const sustainStatus: "growing" | "stable" | "shrinking" =
    netAnnual > 0.05 ? "growing" : netAnnual < -0.05 ? "shrinking" : "stable";

  // Za kolik měsíců se portfolio vyčerpá (jen při klesání)
  // Vzorec: B(n) = P×(1+r)^n − m×((1+r)^n−1)/r = 0  →  n = log(m/(m−P×r)) / log(1+r)
  let monthsToDepletion: number | null = null;
  if (sustainStatus === "shrinking" && infiniteMonthly > 0) {
    if (infGrowthR > 0) {
      const denominator = infiniteMonthly - finalValue * infGrowthR;
      if (denominator > 0) {
        const n = Math.log(infiniteMonthly / denominator) / Math.log(1 + infGrowthR);
        monthsToDepletion = Math.max(1, Math.round(n));
      }
    } else {
      monthsToDepletion = Math.max(1, Math.round(finalValue / infiniteMonthly));
    }
  }

  /* ══════════════════════════════════════════
     Výpočty — Konečná renta (PMT vzorec, nezměněno)
  ══════════════════════════════════════════ */
  const finiteMonthlyRate = finiteRentaRate / 100 / 12;
  const nFinite = rentaYears * 12;
  const finiteMonthly = finiteMonthlyRate > 0
    ? (finalValue * finiteMonthlyRate) / (1 - Math.pow(1 + finiteMonthlyRate, -nFinite))
    : finalValue / nFinite;
  const finiteAnnual   = finiteMonthly * 12;
  const totalPaidOut   = finiteMonthly * nFinite;

  /* ══════════════════════════════════════════
     Společné hodnoty pro zobrazení
  ══════════════════════════════════════════ */
  const monthlyRenta = rentaMode === "infinite" ? infiniteMonthly : finiteMonthly;
  const annualRenta  = rentaMode === "infinite" ? infiniteAnnual  : finiteAnnual;

  const dispMonthlyRenta = deflate(monthlyRenta, years);
  const dispAnnualRenta  = deflate(annualRenta, years);
  const dispTotalPaidOut = rentaMode === "finite" ? deflate(totalPaidOut, years + rentaYears / 2) : null;
  const dispRemaining    = deflate(Math.max(0, remainingAfterHorizon), years + RENTA_HORIZON);

  /* ══════════════════════════════════════════
     SVG graf
  ══════════════════════════════════════════ */
  const svgW = 600, svgH = 180;
  const pad  = { top: 16, right: 16, bottom: 24, left: 16 };
  const chartW = svgW - pad.left - pad.right;
  const chartH = svgH - pad.top  - pad.bottom;
  const maxVal = Math.max(...yearlyData.map((d) => d.value));
  const toX = (i: number) => pad.left + (i / Math.max(yearlyData.length - 1, 1)) * chartW;
  const toY = (v: number) => pad.top  + chartH - (v / maxVal) * chartH;
  const valuePath    = yearlyData.map((d, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(d.value)}`).join(" ");
  const investedPath = yearlyData.map((d, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(d.invested)}`).join(" ");
  const valueArea    = valuePath    + ` L${toX(yearlyData.length - 1)},${pad.top + chartH} L${pad.left},${pad.top + chartH} Z`;
  const investedArea = investedPath + ` L${toX(yearlyData.length - 1)},${pad.top + chartH} L${pad.left},${pad.top + chartH} Z`;
  const labelYears   = yearlyData.filter((d) => d.year % (years > 15 ? 5 : years > 7 ? 2 : 1) === 0 || d.year === years);

  return (
    <section className="bg-[#f6f6f6] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Záhlaví + inflační toggle ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
              Kalkulačka
            </p>
            <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-dark mb-4">
              Spočítejte si
              <br />
              svůj potenciál
            </h2>
            <p className="text-[#6b6b6b] text-base leading-relaxed">
              Orientační výpočet složeného úročení. Skutečné výnosy závisí na zvolené strategii a vývoji trhů.
            </p>
          </div>

          <button
            onClick={() => setWithInflation((v) => !v)}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all border shrink-0 ${
              withInflation
                ? "bg-dark text-white border-dark"
                : "bg-white text-[#6b6b6b] border-[#e8e5e2] hover:border-[#97724f] hover:text-dark"
            }`}
          >
            <span className={`w-2 h-2 rounded-full transition-colors ${withInflation ? "bg-amber-400" : "bg-[#d0ccc8]"}`} />
            Reálná hodnota
            <span className="opacity-60 font-normal">(inflace 3,2 %)</span>
          </button>
        </div>

        {/* ── Hlavní kalkulačka ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="space-y-7">
            <Slider label="Počáteční investice" value={initial} min={0} max={10_000_000} step={10_000}
              format={formatCZK} onChange={setInitial} editable />
            <Slider label="Měsíční příspěvek" value={monthly} min={0} max={200_000} step={500}
              format={formatCZK} onChange={setMonthly} />
            <Slider label="Investiční horizont" value={years} min={1} max={30} step={1}
              format={yearsLabel} onChange={setYears} />
            <Slider label="Modelový výnos" hint="(p.a.)" value={returnRate} min={1} max={15} step={0.5}
              format={(v) => `${v} %`} onChange={setReturnRate} />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-5 border border-[#e8e5e2]">
                <p className="text-[#6b6b6b] text-xs mb-2">Vloženo celkem</p>
                <p className="font-heading font-700 text-dark text-sm leading-snug">{formatCZK(dispInvested)}</p>
                {withInflation && <p className="text-[#b0aba6] text-[10px] mt-0.5">v dnešních Kč</p>}
              </div>
              <div className="bg-[#97724f] rounded-2xl p-5">
                <p className="text-white/70 text-xs mb-2">Hodnota portfolia</p>
                <p className="font-heading font-700 text-white text-sm leading-snug">{formatCZK(dispFinalValue)}</p>
                {withInflation && <p className="text-white/40 text-[10px] mt-0.5">v dnešních Kč</p>}
              </div>
              <div className="bg-white rounded-2xl p-5 border border-[#e8e5e2]">
                <p className="text-[#6b6b6b] text-xs mb-2">Váš výdělek</p>
                <p className="font-heading font-700 text-[#97724f] text-sm leading-snug">+{formatCZK(dispProfit)}</p>
                <p className="text-[#c5a889] text-xs mt-0.5">+{dispProfitPct} %</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e5e2] p-4 overflow-hidden">
              <div className="flex items-center gap-4 mb-3 px-1">
                <span className="flex items-center gap-1.5 text-xs text-[#6b6b6b]">
                  <span className="w-3 h-0.5 bg-[#97724f] rounded block" />
                  Hodnota portfolia
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#6b6b6b]">
                  <span className="w-3 h-0.5 bg-[#c5a889] rounded block" />
                  Vloženo
                </span>
              </div>
              <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad-value" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#97724f" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#97724f" stopOpacity="0.02" />
                  </linearGradient>
                  <linearGradient id="grad-invested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c5a889" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#c5a889" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <path d={valueArea} fill="url(#grad-value)" />
                <path d={investedArea} fill="url(#grad-invested)" />
                <path d={investedPath} fill="none" stroke="#c5a889" strokeWidth="1.5" strokeLinecap="round" />
                <path d={valuePath}    fill="none" stroke="#97724f" strokeWidth="2"   strokeLinecap="round" />
                {labelYears.map((d, i) => (
                  <text key={i} x={toX(yearlyData.indexOf(d))} y={svgH - 4}
                    textAnchor="middle" fontSize="11" fill="#9b9b9b">{d.year}r</text>
                ))}
              </svg>
            </div>

            <p className="text-[#9b9b9b] text-xs leading-relaxed">
              {withInflation
                ? "Hodnoty jsou přepočítány na kupní sílu dnešní koruny (inflace 3,2 % p.a.). Nezohledňují daně ani poplatky."
                : "Výpočet je orientační a nezohledňuje inflaci, daně ani poplatky. Historická výkonnost není zárukou budoucích výnosů."}
            </p>
          </div>
        </div>

        {/* ── Oddělovač ── */}
        <div className="border-t border-[#e0dbd6] my-10 lg:my-14" />

        {/* ── Záhlaví renty + přepínač ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
              Renta z portfolia
            </p>
            <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-dark mb-4">
              Kolik si budete moci
              <br />
              každý měsíc vybírat?
            </h2>
            <p className="text-[#6b6b6b] text-base leading-relaxed">
              Vychází z hodnoty portfolia po {yearsLabel(years)} ({formatCZK(dispFinalValue)}
              {withInflation ? " v dnešních Kč" : ""}).
              Portfolio stále úročí tempem z kalkulačky výše.
            </p>
          </div>
          <SegmentedControl
            options={[
              { label: "Nekonečná", value: "infinite" },
              { label: "Na dobu určitou", value: "finite" },
            ]}
            value={rentaMode}
            onChange={(v) => setRentaMode(v as "infinite" | "finite")}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Vstupy renty ── */}
          <div className="space-y-6">

            {/* Propojená hodnota portfolia */}
            <div className="bg-white rounded-2xl p-5 border border-[#e8e5e2] flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#6b6b6b] uppercase tracking-wider font-semibold mb-1">
                  Hodnota portfolia po {yearsLabel(years)}
                </p>
                <p className="text-[#9b9b9b] text-xs">propojeno s kalkulačkou výše</p>
              </div>
              <span className="font-heading font-700 text-[#97724f] text-lg shrink-0">
                {formatCZK(dispFinalValue)}
                {withInflation && <span className="block text-[10px] font-normal text-[#c5a889] text-right">v dnešních Kč</span>}
              </span>
            </div>

            {rentaMode === "infinite" ? (
              <>
                {/* Pokračující výnos — read-only, propojeno s hlavní kalkulačkou */}
                <div className="bg-white rounded-2xl p-5 border border-[#e8e5e2] flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-[#6b6b6b] uppercase tracking-wider font-semibold mb-1">
                      Výnos portfolia (p.a.)
                    </p>
                    <p className="text-[#9b9b9b] text-xs">pokračující úročení z kalkulačky — portfolio stále roste</p>
                  </div>
                  <span className="font-heading font-700 text-dark text-lg shrink-0">{returnRate} %</span>
                </div>

                {/* Míra výběru — slider */}
                <div className="space-y-5">
                  <Slider
                    label="Míra výběru"
                    hint="(% p.a. z hodnoty portfolia)"
                    value={withdrawalPct}
                    min={0.5}
                    max={20}
                    step={0.5}
                    format={(v) => `${+v.toFixed(1)} %`}
                    onChange={setWithdrawalPct}
                  />

                  {/* Bidirectionální vstup — přesná Kč částka, bez limitu */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-sm font-medium text-dark">nebo zadejte přesnou měsíční částku</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        min={0}
                        step={100}
                        value={kczDraft !== null ? kczDraft : String(Math.max(0, Math.round(infiniteMonthly)))}
                        onFocus={() => setKczDraft(String(Math.max(0, Math.round(infiniteMonthly))))}
                        onChange={(e) => setKczDraft(e.target.value)}
                        onBlur={() => {
                          const val = kczDraft !== null ? parseInt(kczDraft, 10) : NaN;
                          if (!isNaN(val) && val >= 0 && finalValue > 0) {
                            // Bez clampu — dovolíme libovolnou částku, indikátor ukáže kontext
                            const pct = (val * 12 / finalValue) * 100;
                            setWithdrawalPct(Math.max(0, +pct.toFixed(2)));
                          } else {
                            // Prázdné / neplatné → zachovej 1 Kč jako minimum
                            setWithdrawalPct(finalValue > 0 ? Math.max(0, +((1 * 12 / finalValue) * 100).toFixed(2)) : 0);
                          }
                          setKczDraft(null);
                        }}
                        className="w-full bg-white border border-[#e8e5e2] rounded-xl px-4 py-3 pr-16 text-sm font-heading font-700 text-[#97724f] focus:outline-none focus:border-[#97724f] transition-colors"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#9b9b9b]">Kč/měs.</span>
                    </div>
                  </div>
                </div>

                {/* Indikátor udržitelnosti */}
                <div className={`rounded-2xl p-4 border text-sm ${
                  sustainStatus === "growing"
                    ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                    : sustainStatus === "stable"
                    ? "bg-[#f6f6f6] border-[#e8e5e2] text-[#6b6b6b]"
                    : "bg-amber-50 border-amber-100 text-amber-800"
                }`}>
                  {sustainStatus === "growing" && (
                    <>
                      <span className="font-semibold">Portfolio roste.</span>{" "}
                      Vybíráte {+withdrawalPct.toFixed(1)} %, portfolio vydělává {returnRate} % — čistý přírůstek{" "}
                      <span className="font-semibold whitespace-nowrap">+{netAnnual.toFixed(1)}&nbsp;%/rok</span>.
                      Za {RENTA_HORIZON} let bude portfolio hodnotnější.
                    </>
                  )}
                  {sustainStatus === "stable" && (
                    <>
                      <span className="font-semibold">Portfolio je stabilní.</span>{" "}
                      Vybíráte přesně tolik, kolik vydělává ({returnRate} %). Jistina zůstane nezměněna navždy.
                    </>
                  )}
                  {sustainStatus === "shrinking" && (
                    <>
                      <span className="font-semibold">Portfolio se zmenšuje.</span>{" "}
                      Vybíráte {+withdrawalPct.toFixed(1)} %, ale portfolio vydělává jen {returnRate} %.{" "}
                      {monthsToDepletion !== null && (
                        <>Portfolio se vyčerpá přibližně za{" "}
                        <span className="font-semibold">{depletionLabel(monthsToDepletion)}</span>.</>
                      )}
                    </>
                  )}
                </div>

                <p className="text-[#9b9b9b] text-xs leading-relaxed">
                  Výnos portfolia a míra výběru jsou záměrně odděleny. Portfolio nadále roste tempem z kalkulačky,
                  vy si vybíráte zvolenou mírou výběru. Záporný rozdíl = portfolio se postupně spotřebuje.
                </p>
              </>
            ) : (
              <>
                {/* Konečná renta — původní logika */}
                <Slider
                  label="Úroková sazba portfolia"
                  hint="(p.a.) — výnos zbývajícího kapitálu"
                  value={finiteRentaRate}
                  min={0.5}
                  max={12}
                  step={0.5}
                  format={(v) => `${v} %`}
                  onChange={setFiniteRentaRate}
                />
                <Slider
                  label="Doba výplaty renty"
                  value={rentaYears}
                  min={5}
                  max={40}
                  step={1}
                  format={yearsLabel}
                  onChange={setRentaYears}
                />
                <p className="text-[#9b9b9b] text-xs leading-relaxed">
                  Konečná renta: portfolio se spotřebuje za {yearsLabel(rentaYears)}. Měsíčně dostanete více, ale na konci nezůstane nic.
                </p>
              </>
            )}
          </div>

          {/* ── Výsledky renty ── */}
          <div className="space-y-4">
            <div className="bg-[#97724f] rounded-3xl p-8 lg:p-10 text-center">
              <p className="text-white/70 text-sm mb-3">Měsíční renta</p>
              <p className="font-heading font-800 text-white text-4xl lg:text-5xl mb-1">
                {formatCZK(dispMonthlyRenta)}
              </p>
              <p className="text-white/50 text-xs">
                {rentaMode === "infinite"
                  ? "každý měsíc"
                  : `každý měsíc po dobu ${yearsLabel(rentaYears)}`}
              </p>
              {withInflation && <p className="text-white/40 text-[10px] mt-2">v dnešní kupní síle</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-[#e8e5e2] text-center">
                <p className="text-[#6b6b6b] text-xs mb-2">Roční renta</p>
                <p className="font-heading font-700 text-dark text-base">{formatCZK(dispAnnualRenta)}</p>
              </div>

              {rentaMode === "infinite" ? (
                <div className={`rounded-2xl p-5 border text-center ${
                  sustainStatus === "growing" ? "bg-emerald-50 border-emerald-100" :
                  sustainStatus === "shrinking" && remainingAfterHorizon <= 0 ? "bg-amber-50 border-amber-100" :
                  "bg-white border-[#e8e5e2]"
                }`}>
                  <p className="text-[#6b6b6b] text-xs mb-1">
                    Jmění za {RENTA_HORIZON} let výplat
                  </p>
                  <p className={`font-heading font-700 text-base ${
                    sustainStatus === "growing" ? "text-emerald-700" :
                    sustainStatus === "shrinking" && remainingAfterHorizon <= 0 ? "text-amber-700" :
                    "text-dark"
                  }`}>
                    {remainingAfterHorizon > 0 ? formatCZK(dispRemaining) : "Vyčerpáno"}
                  </p>
                  {withInflation && remainingAfterHorizon > 0 && (
                    <p className="text-[#b0aba6] text-[10px] mt-0.5">v dnešních Kč</p>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-6 border border-[#e8e5e2] text-center">
                  <p className="text-[#6b6b6b] text-xs mb-2">Celkem vyplaceno</p>
                  <p className="font-heading font-700 text-[#97724f] text-base">
                    {dispTotalPaidOut ? formatCZK(dispTotalPaidOut) : "—"}
                  </p>
                </div>
              )}
            </div>

            {rentaMode === "finite" && (
              <div className="bg-[#fff8f3] rounded-2xl p-4 border border-[#f0e6db] text-center">
                <p className="text-[#97724f] text-xs">
                  Po {yearsLabel(rentaYears)} výplaty zbývá:{" "}
                  <span className="font-semibold">0 Kč</span> — kapitál je plně spotřebován.
                </p>
              </div>
            )}

            <p className="text-[#9b9b9b] text-xs leading-relaxed text-center">
              Výpočet je orientační. Skutečné výnosy závisí na tržních podmínkách a zvolené strategii.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #97724f;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #97724f;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
        input[type="number"] { -moz-appearance: textfield; }
      `}</style>
    </section>
  );
}
