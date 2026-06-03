"use client";

import { useState, useMemo } from "react";

function formatCZK(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2).replace(".", ",")} mil. Kč`;
  }
  return value.toLocaleString("cs-CZ", { style: "currency", currency: "CZK", maximumFractionDigits: 0 });
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step, format, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium text-dark">{label}</span>
        <span className="text-sm font-heading font-700 text-[#97724f]">{format(value)}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #97724f ${pct}%, #e8e5e2 ${pct}%)`,
          }}
        />
      </div>
    </div>
  );
}

export default function InvestmentCalculator() {
  const [initial, setInitial] = useState(500_000);
  const [monthly, setMonthly] = useState(5_000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(7);

  // Compound interest with monthly contributions
  const { yearlyData, totalInvested, finalValue } = useMemo(() => {
    const r = returnRate / 100 / 12; // monthly rate
    const yearlyData: { year: number; invested: number; value: number }[] = [];

    for (let y = 1; y <= years; y++) {
      const n = y * 12;
      const fv =
        initial * Math.pow(1 + r, n) +
        (r > 0 ? monthly * ((Math.pow(1 + r, n) - 1) / r) : monthly * n);
      const invested = initial + monthly * n;
      yearlyData.push({ year: y, invested, value: Math.round(fv) });
    }

    const last = yearlyData[yearlyData.length - 1];
    return {
      yearlyData,
      totalInvested: last.invested,
      finalValue: last.value,
    };
  }, [initial, monthly, years, returnRate]);

  const profit = finalValue - totalInvested;
  const profitPct = totalInvested > 0 ? ((profit / totalInvested) * 100).toFixed(0) : "0";

  // SVG chart
  const svgW = 600;
  const svgH = 180;
  const pad = { top: 16, right: 16, bottom: 24, left: 16 };
  const chartW = svgW - pad.left - pad.right;
  const chartH = svgH - pad.top - pad.bottom;
  const maxVal = Math.max(...yearlyData.map((d) => d.value));

  const toX = (i: number) => pad.left + (i / (yearlyData.length - 1 || 1)) * chartW;
  const toY = (v: number) => pad.top + chartH - (v / maxVal) * chartH;

  const valuePath = yearlyData
    .map((d, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(d.value)}`)
    .join(" ");
  const investedPath = yearlyData
    .map((d, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(d.invested)}`)
    .join(" ");

  const valueAreaPath =
    valuePath +
    ` L${toX(yearlyData.length - 1)},${pad.top + chartH} L${pad.left},${pad.top + chartH} Z`;
  const investedAreaPath =
    investedPath +
    ` L${toX(yearlyData.length - 1)},${pad.top + chartH} L${pad.left},${pad.top + chartH} Z`;

  // Year labels (every 5 years or all if ≤10)
  const labelYears = yearlyData.filter((d) => d.year % (years > 10 ? 5 : years > 5 ? 2 : 1) === 0 || d.year === years);

  return (
    <section className="bg-[#f6f6f6] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 lg:mb-16 max-w-2xl">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Sliders */}
          <div className="space-y-7">
            <Slider
              label="Počáteční investice"
              value={initial}
              min={0}
              max={5_000_000}
              step={10_000}
              format={formatCZK}
              onChange={setInitial}
            />
            <Slider
              label="Měsíční příspěvek"
              value={monthly}
              min={0}
              max={100_000}
              step={500}
              format={formatCZK}
              onChange={setMonthly}
            />
            <Slider
              label="Investiční horizont"
              value={years}
              min={1}
              max={30}
              step={1}
              format={(v) => `${v} ${v === 1 ? "rok" : v < 5 ? "roky" : "let"}`}
              onChange={setYears}
            />
            <Slider
              label="Modelový výnos (p.a.)"
              value={returnRate}
              min={1}
              max={15}
              step={0.5}
              format={(v) => `${v} %`}
              onChange={setReturnRate}
            />
          </div>

          {/* Results + Chart */}
          <div className="space-y-6">
            {/* Result cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-5 border border-[#e8e5e2]">
                <p className="text-[#6b6b6b] text-xs mb-1">Vloženo celkem</p>
                <p className="font-heading font-700 text-dark text-sm leading-snug">{formatCZK(totalInvested)}</p>
              </div>
              <div className="bg-[#97724f] rounded-2xl p-5">
                <p className="text-white/70 text-xs mb-1">Odhadovaná hodnota</p>
                <p className="font-heading font-700 text-white text-sm leading-snug">{formatCZK(finalValue)}</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-[#e8e5e2]">
                <p className="text-[#6b6b6b] text-xs mb-1">Zhodnocení</p>
                <p className="font-heading font-700 text-[#97724f] text-sm leading-snug">
                  +{profitPct} %
                </p>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="bg-white rounded-2xl border border-[#e8e5e2] p-4 overflow-hidden">
              <div className="flex items-center gap-4 mb-3 px-1">
                <span className="flex items-center gap-1.5 text-xs text-[#6b6b6b]">
                  <span className="w-3 h-0.5 bg-[#97724f] rounded block" />
                  Odhadovaná hodnota
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#6b6b6b]">
                  <span className="w-3 h-0.5 bg-[#c5a889] rounded block" />
                  Vloženo
                </span>
              </div>
              <svg
                viewBox={`0 0 ${svgW} ${svgH}`}
                className="w-full"
                preserveAspectRatio="none"
              >
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

                {/* Area fills */}
                <path d={valueAreaPath} fill="url(#grad-value)" />
                <path d={investedAreaPath} fill="url(#grad-invested)" />

                {/* Lines */}
                <path d={investedPath} fill="none" stroke="#c5a889" strokeWidth="1.5" strokeLinecap="round" />
                <path d={valuePath} fill="none" stroke="#97724f" strokeWidth="2" strokeLinecap="round" />

                {/* Year labels */}
                {labelYears.map((d, i) => (
                  <text
                    key={i}
                    x={toX(yearlyData.indexOf(d))}
                    y={svgH - 4}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#9b9b9b"
                  >
                    {d.year}r
                  </text>
                ))}
              </svg>
            </div>

            <p className="text-[#9b9b9b] text-xs leading-relaxed">
              Výpočet je orientační a nezohledňuje inflaci, daně ani poplatky. Historická výkonnost není zárukou budoucích výnosů.
            </p>
          </div>
        </div>
      </div>

      {/* Slider thumb styles */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #97724f;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #97724f;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
        }
      `}</style>
    </section>
  );
}
