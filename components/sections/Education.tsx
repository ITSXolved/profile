"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  HiOutlineAcademicCap, HiOutlineBriefcase,
  HiOutlineChip, HiOutlineGlobe,
} from "react-icons/hi";
import { FaFlask } from "react-icons/fa";

// ─── Education data ────────────────────────────────────────────────────────────
const EDUCATION = [
  {
    degree: "MSc Cognitive Science",
    institution: "University College Cork (UCC)",
    year: "2021 – 2022",
    icon: HiOutlineAcademicCap,
    color: "#6C63FF",
    bg: "rgba(108,99,255,0.12)",
    type: "Masters",
  },
  {
    degree: "Diploma — Cloud Computing",
    institution: "NIELIT (Govt. of India)",
    year: "2022",
    icon: HiOutlineChip,
    color: "#00B4D8",
    bg: "rgba(0,180,216,0.12)",
    type: "Certification",
  },
  {
    degree: "B.Tech — Electrical & Electronics",
    institution: "APJ Abdul Kalam Tech. University",
    year: "2010 – 2014",
    icon: HiOutlineBriefcase,
    color: "#06D6A0",
    bg: "rgba(6,214,160,0.12)",
    type: "Bachelors",
  },
  {
    degree: "PG Diploma — Applied Statistics",
    institution: "IGNOU (Indira Gandhi National Open University)",
    year: "2023 – 2024",
    icon: FaFlask,
    color: "#FFA500",
    bg: "rgba(255,165,0,0.12)",
    type: "PG Diploma",
  },
  {
    degree: "CCPD",
    institution: "University College Cork (UCC)",
    year: "2020",
    icon: HiOutlineGlobe,
    color: "#FF6B6B",
    bg: "rgba(255,107,107,0.12)",
    type: "Certificate",
  },
  {
    degree: "UGC NET",
    institution: "National Testing Agency, India",
    year: "Qualified",
    icon: HiOutlineAcademicCap,
    color: "#A855F7",
    bg: "rgba(168,85,247,0.12)",
    type: "National Exam",
  },
];

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
function EduCard({ item }: { item: (typeof EDUCATION)[number] }) {
  const { icon: Icon, color, bg, degree, institution, year, type } = item;
  return (
    <motion.div
      variants={cardV}
      whileHover={{ scale: 1.03, y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex gap-4 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03]
                 hover:border-opacity-60 hover:bg-white/[0.06]
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
        <h3 className="font-space-grotesk font-bold text-white text-sm leading-snug mb-0.5">
          {degree}
        </h3>
        <p className="text-white/45 text-xs font-inter leading-tight truncate">{institution}</p>
        <p className="text-white/30 text-xs font-inter mt-1">{year}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="education" ref={ref} className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #0d0d18 100%)" }}>

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
          className="font-space-grotesk font-black text-2xl sm:text-3xl text-white mb-8">
          Academic{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Background
          </span>
        </motion.h2>

        {/* Desktop 2-col grid / Mobile horizontal scroll */}
        <div className="block md:hidden">
          {/* mobile: horizontal scroll */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {EDUCATION.map((item) => (
              <div key={item.degree} className="snap-start flex-shrink-0 w-72">
                <EduCard item={item} />
              </div>
            ))}
          </div>
        </div>

        <motion.div variants={containerV} initial="hidden" animate={isInView ? "show" : "hidden"}
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
          {EDUCATION.map((item) => (
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
