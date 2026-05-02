"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { HiOutlineSparkles, HiOutlineCalendar } from "react-icons/hi";
import { experience } from "@/data";

// ─── Company accent colours ────────────────────────────────────────────────────
const COMPANY_META: Record<string, { color: string; bg: string; achievement?: string }> = {
  "AyaTech":            { color: "#FF6B6B", bg: "rgba(255,107,107,0.10)", achievement: "Scaled AI product suite across 3 verticals" },
  "Iluzia Labs":        { color: "#6C63FF", bg: "rgba(108,99,255,0.10)",  achievement: "Shipped GenAI + VR platform to 5k+ learners" },
  "Photon Interactive": { color: "#00B4D8", bg: "rgba(0,180,216,0.10)",   achievement: "38% CTR lift via personalisation engine"     },
  "Pristine AI":        { color: "#06D6A0", bg: "rgba(6,214,160,0.10)"  },
  "Mems International": { color: "#FFA500", bg: "rgba(255,165,0,0.10)"  },
};

const DEFAULT_META = { color: "#8B5CF6", bg: "rgba(139,92,246,0.10)" };

function getMeta(company: string) {
  return COMPANY_META[company] ?? DEFAULT_META;
}

// ─── Card animation variants (slide from each side) ───────────────────────────
const leftSlide: Variants = {
  hidden: { opacity: 0, x: -52 },
  show: {
    opacity: 1, x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
const rightSlide: Variants = {
  hidden: { opacity: 0, x: 52 },
  show: {
    opacity: 1, x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
const dotPop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.25, type: "spring", stiffness: 300 } },
};

// ─── Single timeline entry ─────────────────────────────────────────────────────
function TimelineCard({
  item,
  index,
}: {
  item: (typeof experience)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const isLeft = index % 2 === 0; // alternates on desktop
  const meta = getMeta(item.company);
  const isHighlighted = index < 3; // top 3 roles get achievement chip + active border

  const cardVariant = isLeft ? leftSlide : rightSlide;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 md:gap-6 mb-12 md:mb-16"
    >
      {/* ── Left side (desktop only, odd indices show card here) ── */}
      <div className={`hidden md:flex justify-end items-start ${!isLeft ? "opacity-0 pointer-events-none" : ""}`}>
        {isLeft && (
          <motion.div
            variants={cardVariant}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="w-full max-w-sm"
          >
            <Card item={item} meta={meta} isHighlighted={isHighlighted} align="right" />
          </motion.div>
        )}
      </div>

      {/* ── Centre dot ── */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          variants={dotPop}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="relative mt-6 flex-shrink-0"
        >
          {/* pulse ring */}
          {isHighlighted && (
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: meta.color, opacity: 0.3 }}
            />
          )}
          <div
            className="w-4 h-4 rounded-full border-2 border-slate-50 dark:border-[#0d0d18] z-10 relative"
            style={{ background: meta.color, boxShadow: `0 0 12px ${meta.color}80` }}
          />
        </motion.div>
      </div>

      {/* ── Right side (desktop even, mobile all) ── */}
      <div className={`flex justify-start items-start ${isLeft ? "md:opacity-0 md:pointer-events-none" : ""}`}>
        {/* mobile: always show; desktop: only for right-side entries */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="w-full md:max-w-sm"
        >
          {/* mobile dot + line */}
          <div className="flex items-start gap-4 md:hidden mb-4">
            <div className="flex flex-col items-center mt-1.5 flex-shrink-0">
              <div
                className="w-3.5 h-3.5 rounded-full border-2 border-slate-50 dark:border-[#0d0d18]"
                style={{ background: meta.color, boxShadow: `0 0 8px ${meta.color}80` }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <Card item={item} meta={meta} isHighlighted={isHighlighted} align="left" />
            </div>
          </div>

          {/* desktop right-side card */}
          {!isLeft && (
            <div className="hidden md:block">
              <Card item={item} meta={meta} isHighlighted={isHighlighted} align="left" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Card inner ───────────────────────────────────────────────────────────────
function Card({
  item,
  meta,
  isHighlighted,
  align,
}: {
  item: (typeof experience)[0];
  meta: { color: string; bg: string; achievement?: string };
  isHighlighted: boolean;
  align: "left" | "right";
}) {
  return (
    <div
      className={`
        relative rounded-2xl p-5 sm:p-6 border transition-all duration-300
        bg-slate-900/[0.03] dark:bg-white/[0.03] hover:bg-slate-900/[0.06] dark:bg-white/[0.06]
        ${isHighlighted
          ? "border-opacity-60 shadow-lg"
          : "border-slate-900/[0.07] dark:border-white/[0.07] hover:border-slate-900/[0.14] dark:border-white/[0.14]"
        }
      `}
      style={
        isHighlighted
          ? { borderColor: `${meta.color}55`, boxShadow: `0 0 28px ${meta.color}18` }
          : {}
      }
    >
      {/* top row: period badge */}
      <div className={`flex items-center gap-2 mb-3 ${align === "right" ? "justify-end" : ""}`}>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-inter font-semibold"
          style={{ background: meta.bg, color: meta.color }}
        >
          <HiOutlineCalendar size={11} />
          {item.period}
        </span>
      </div>

      {/* Role */}
      <h3
        className={`font-space-grotesk font-black text-xl sm:text-2xl text-slate-900 dark:text-white leading-tight mb-1 ${align === "right" ? "text-right" : ""}`}
      >
        {item.role}
      </h3>

      {/* Company */}
      <p
        className={`font-inter font-semibold text-base mb-4 ${align === "right" ? "text-right" : ""}`}
        style={{ color: meta.color }}
      >
        {item.company}
      </p>

      {/* Achievement chip */}
      {isHighlighted && meta.achievement && (
        <div className={`flex mb-4 ${align === "right" ? "justify-end" : ""}`}>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-inter font-semibold text-slate-900/90 dark:text-white/90"
            style={{ background: `${meta.color}22`, border: `1px solid ${meta.color}44` }}
          >
            <HiOutlineSparkles size={12} style={{ color: meta.color }} />
            {meta.achievement}
          </span>
        </div>
      )}

      {/* Bullet points */}
      <ul className="space-y-2">
        {item.points.map((pt, i) => (
          <li key={i} className={`flex gap-2.5 text-sm font-inter text-slate-900/55 dark:text-white/55 leading-relaxed ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: meta.color, opacity: 0.7 }} />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-28 overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0a0f] dark:to-[#0d0d18]"
    >
      {/* bg accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
        style={{ background: "radial-gradient(ellipse at bottom, rgba(108,99,255,0.07) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-px w-10 bg-gradient-to-r from-violet-500 to-transparent" />
          <span className="text-violet-400 font-inter text-xs tracking-[0.22em] uppercase font-semibold">
            Experience
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-space-grotesk font-black text-3xl sm:text-4xl text-slate-900 dark:text-white mb-16"
        >
          Career{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Timeline
          </span>
        </motion.h2>

        {/* Timeline wrapper */}
        <div className="relative">

          {/* Centre vertical line (desktop) */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px origin-top"
            style={{
              background: "linear-gradient(to bottom, rgba(108,99,255,0.6), rgba(139,92,246,0.2) 80%, transparent)",
            }}
          />

          {/* Left line (mobile) */}
          <div
            className="md:hidden absolute left-1.5 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(108,99,255,0.5), transparent)" }}
          />

          {/* Cards */}
          {experience.map((item, i) => (
            <TimelineCard key={item.company} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
