"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import {
  SiPython, SiR, SiMysql, SiLangchain, SiOpenai,
  SiGooglecloud, SiDocker, SiKubernetes, SiVercel,
  SiStreamlit, SiOllama,
} from "react-icons/si";
import { TbBrandFramerMotion, TbMathFunction } from "react-icons/tb";
import { FaBrain, FaDatabase, FaAws, FaMicrosoft } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = "aiml" | "genai" | "cloud" | "languages";

interface BarSkill  { name: string; pct: number; color: string }
interface IconSkill { name: string; icon: React.ElementType; color: string }
interface RingSkill { name: string; icon: React.ElementType; pct: number; color: string }

// ─── Data ─────────────────────────────────────────────────────────────────────

const AI_ML_SKILLS: BarSkill[] = [
  { name: "Machine Learning",    pct: 93, color: "from-violet-500 to-indigo-500"   },
  { name: "Deep Learning / DNN", pct: 88, color: "from-indigo-500 to-blue-500"     },
  { name: "NLP & Text Mining",   pct: 90, color: "from-violet-500 to-fuchsia-500"  },
  { name: "Computer Vision",     pct: 82, color: "from-fuchsia-500 to-rose-500"    },
  { name: "Reinforcement Learning", pct: 74, color: "from-rose-500 to-orange-500"  },
  { name: "MLOps & Deployment",  pct: 87, color: "from-orange-500 to-amber-400"    },
  { name: "Data Analysis",       pct: 92, color: "from-amber-400 to-yellow-400"    },
  { name: "Model Fine-Tuning",   pct: 85, color: "from-teal-400 to-cyan-400"       },
];

const GENAI_SKILLS: IconSkill[] = [
  { name: "LangChain",  icon: SiLangchain,         color: "#1C3C3C" },
  { name: "LlamaIndex", icon: FaBrain,             color: "#7C3AED" },
  { name: "ChromaDB",   icon: FaDatabase,          color: "#FF6B35" },
  { name: "OpenAI API", icon: SiOpenai,            color: "#10A37F" },
  { name: "Ollama",     icon: SiOllama,            color: "#9333EA" },
  { name: "FAISS",      icon: FaDatabase,          color: "#0066CC" },
  { name: "Streamlit",  icon: SiStreamlit,         color: "#FF4B4B" },
  { name: "Chainlit",   icon: TbBrandFramerMotion, color: "#6366F1" },
];

const CLOUD_SKILLS: IconSkill[] = [
  { name: "AWS",        icon: FaAws,         color: "#FF9900" },
  { name: "GCP",        icon: SiGooglecloud, color: "#4285F4" },
  { name: "Azure",      icon: FaMicrosoft,   color: "#0078D4" },
  { name: "Docker",     icon: SiDocker,      color: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes,  color: "#326CE5" },
  { name: "Vercel",     icon: SiVercel,      color: "#FFFFFF" },
];

const LANG_SKILLS: RingSkill[] = [
  { name: "Python",  icon: SiPython,          pct: 96, color: "#3B82F6" },
  { name: "R",       icon: SiR,              pct: 80, color: "#8B5CF6" },
  { name: "SQL",     icon: SiMysql,          pct: 88, color: "#06B6D4" },
  { name: "MATLAB",  icon: TbMathFunction,   pct: 72, color: "#F59E0B" },
];

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "aiml",      label: "AI / ML",       icon: FaBrain   },
  { id: "genai",     label: "GenAI Stack",   icon: BsGridFill },
  { id: "cloud",     label: "Cloud / DevOps",icon: SiDocker   },
  { id: "languages", label: "Languages",     icon: SiPython   },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkillBar({ name, pct, color, i, animate }: BarSkill & { i: number; animate: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm font-inter">
        <span className="text-slate-900/75 dark:text-white/75 font-medium">{name}</span>
        <span className="text-slate-900/40 dark:text-white/40 text-xs tabular-nums">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-900/[0.06] dark:bg-white/[0.06] overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${pct}%` : 0 }}
          transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        />
      </div>
    </div>
  );
}

function IconCard({ name, icon: Icon, color }: IconSkill) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex flex-col items-center gap-2.5 p-4 rounded-2xl
                 bg-slate-900/[0.04] dark:bg-white/[0.04] border border-slate-900/[0.07] dark:border-white/[0.07]
                 hover:border-violet-500/30 hover:bg-slate-900/[0.07] dark:bg-white/[0.07]
                 transition-colors duration-300 cursor-default"
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-900/[0.06] dark:bg-white/[0.06]">
        <Icon size={24} style={{ color }} />
      </div>
      <span className="text-slate-900/60 dark:text-white/60 text-xs font-inter font-medium text-center leading-tight">{name}</span>
    </motion.div>
  );
}

const RING_R = 38;
const RING_CIRC = 2 * Math.PI * RING_R;

function RingCard({ name, icon: Icon, pct, color, animate }: RingSkill & { animate: boolean }) {
  const dash = animate ? RING_CIRC * (1 - pct / 100) : RING_CIRC;
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex flex-col items-center gap-3 p-5 rounded-2xl
                 bg-slate-900/[0.04] dark:bg-white/[0.04] border border-slate-900/[0.07] dark:border-white/[0.07]
                 hover:border-violet-500/30 transition-colors duration-300"
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={RING_R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <motion.circle
            cx="48" cy="48" r={RING_R}
            fill="none" stroke={color} strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={RING_CIRC}
            initial={{ strokeDashoffset: RING_CIRC }}
            animate={{ strokeDashoffset: dash }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.2 }}
          />
        </svg>
        <div className="flex flex-col items-center">
          <Icon size={22} style={{ color }} />
          <span className="text-slate-900 dark:text-white font-space-grotesk font-bold text-base mt-0.5">{pct}%</span>
        </div>
      </div>
      <span className="text-slate-900/70 dark:text-white/70 text-sm font-inter font-semibold">{name}</span>
    </motion.div>
  );
}

// ─── Tab content panels ────────────────────────────────────────────────────────

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit:  { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

function AiMlPanel({ animate }: { animate: boolean }) {
  return (
    <motion.div key="aiml" variants={panelVariants} initial="hidden" animate="show" exit="exit"
      className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
      {AI_ML_SKILLS.map((s, i) => <SkillBar key={s.name} {...s} i={i} animate={animate} />)}
    </motion.div>
  );
}

function GenAiPanel() {
  return (
    <motion.div key="genai" variants={panelVariants} initial="hidden" animate="show" exit="exit"
      className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {GENAI_SKILLS.map((s) => <IconCard key={s.name} {...s} />)}
    </motion.div>
  );
}

function CloudPanel() {
  return (
    <motion.div key="cloud" variants={panelVariants} initial="hidden" animate="show" exit="exit"
      className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {CLOUD_SKILLS.map((s) => <IconCard key={s.name} {...s} />)}
    </motion.div>
  );
}

function LangPanel({ animate }: { animate: boolean }) {
  return (
    <motion.div key="languages" variants={panelVariants} initial="hidden" animate="show" exit="exit"
      className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {LANG_SKILLS.map((s) => <RingCard key={s.name} {...s} animate={animate} />)}
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function Skills() {
  const [active, setActive] = useState<TabId>("aiml");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="relative py-28 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-[#0d0d18] dark:to-[#0a0a0f]">

      {/* bg accent */}
      <div aria-hidden className="pointer-events-none absolute top-20 right-0 w-[600px] h-[600px]"
        style={{ background: "radial-gradient(circle at right, rgba(99,102,241,0.07) 0%, transparent 65%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section label */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-4">
          <span className="h-px w-10 bg-gradient-to-r from-violet-500 to-transparent" />
          <span className="text-violet-400 font-inter text-xs tracking-[0.22em] uppercase font-semibold">Skills</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-space-grotesk font-black text-3xl sm:text-4xl text-slate-900 dark:text-white mb-12">
          Technical{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Arsenal</span>
        </motion.h2>

        {/* Tab switcher */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-2xl bg-slate-900/[0.04] dark:bg-white/[0.04] border border-slate-900/[0.07] dark:border-white/[0.07] w-fit">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              id={`tab-${id}`}
              onClick={() => setActive(id)}
              className={`
                relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-inter font-semibold
                transition-all duration-250
                ${active === id
                  ? "text-slate-900 dark:text-white shadow-lg shadow-violet-500/20"
                  : "text-slate-900/40 dark:text-white/40 hover:text-slate-900/70 dark:text-white/70"
                }
              `}
            >
              {active === id && (
                <motion.span layoutId="tab-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/80 to-indigo-600/80 border border-violet-500/30"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon size={14} />
                {label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Panel */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="min-h-[280px] p-6 sm:p-8 rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-900/[0.07] dark:border-white/[0.07]">
          <AnimatePresence mode="wait">
            {active === "aiml"      && <AiMlPanel animate={isInView} />}
            {active === "genai"     && <GenAiPanel />}
            {active === "cloud"     && <CloudPanel />}
            {active === "languages" && <LangPanel animate={isInView} />}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
