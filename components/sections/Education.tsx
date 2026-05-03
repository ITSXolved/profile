"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  HiOutlineAcademicCap, HiOutlineBriefcase,
  HiOutlineChip, HiOutlineGlobe,
} from "react-icons/hi";
import { FaFlask } from "react-icons/fa";
import type { IconType } from "react-icons";
import { education } from "@/data";

// Map types to icons for dynamic rendering
const ICON_MAP: Record<string, IconType> = {
  "Masters": HiOutlineAcademicCap,
  "Bachelors": HiOutlineBriefcase,
  "National Exam": HiOutlineAcademicCap,
  "Certification": HiOutlineChip,
  "PG Diploma": FaFlask,
  "Certificate": HiOutlineGlobe,
};

const COLOR_MAP: Record<string, string> = {
  "Masters": "#6C63FF",
  "Bachelors": "#06D6A0",
  "National Exam": "#A855F7",
  "Certification": "#00B4D8",
  "PG Diploma": "#FFA500",
  "Certificate": "#FF6B6B",
};

const BG_MAP: Record<string, string> = {
  "Masters": "rgba(108,99,255,0.12)",
  "Bachelors": "rgba(6,214,160,0.12)",
  "National Exam": "rgba(168,85,247,0.12)",
  "Certification": "rgba(0,180,216,0.12)",
  "PG Diploma": "rgba(255,165,0,0.12)",
  "Certificate": "rgba(255,107,107,0.12)",
};

// ─── Animation variants ────────────────────────────────────────────────────────
const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const cardV: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ─── Education Card ────────────────────────────────────────────────────────────
function EduCard({ item }: { item: (typeof education)[number] }) {
  const Icon = ICON_MAP[item.type] || HiOutlineAcademicCap;
  const color = COLOR_MAP[item.type] || "#6C63FF";
  const bg = BG_MAP[item.type] || "rgba(108,99,255,0.12)";
  const { degree, institution, year, type } = item;

  return (
    <motion.div
      variants={cardV}
      whileHover={{ scale: 1.03, y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex gap-4 p-5 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-900/[0.03] dark:bg-white/[0.03]
                 hover:border-opacity-60 hover:bg-slate-900/[0.06] dark:bg-white/[0.06]
                 transition-colors duration-300 cursor-default"
      style={{ ["--accent" as string]: color }}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: bg }}>
        <Icon size={20} style={{ color }} />
      </div>

      {/* Text */}
      <div className="min-w-0">
        {/* type badge */}
        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-inter font-semibold mb-1.5"
          style={{ background: bg, color }}>
          {type}
        </span>
        <h3 className="font-space-grotesk font-bold text-slate-900 dark:text-white text-sm leading-snug mb-0.5">
          {degree}
        </h3>
        <p className="text-slate-900/45 dark:text-white/45 text-xs font-inter leading-tight truncate">{institution}</p>
        <p className="text-slate-900/30 dark:text-white/30 text-xs font-inter mt-1">{year}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="education" ref={ref} className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0a0f] dark:to-[#0d0d18]">

      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(108,99,255,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* label */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-4">
          <span className="h-px w-10 bg-gradient-to-r from-violet-500 to-transparent" />
          <span className="text-violet-400 font-inter text-xs tracking-[0.22em] uppercase font-semibold">Education</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-space-grotesk font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mb-8">
          Academic{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Background
          </span>
        </motion.h2>

        {/* Desktop 2-col grid / Mobile horizontal scroll */}
        <div className="block md:hidden">
          {/* mobile: horizontal scroll */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {education.map((item) => (
              <div key={item.degree} className="snap-start flex-shrink-0 w-72">
                <EduCard item={item} />
              </div>
            ))}
          </div>
        </div>

        <motion.div variants={containerV} initial="hidden" animate={isInView ? "show" : "hidden"}
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
          {education.map((item) => (
            <EduCard key={item.degree} item={item} />
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
