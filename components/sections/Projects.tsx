"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import Image from "next/image";
import { HiOutlineStar, HiOutlineX, HiOutlineExternalLink, HiOutlineCode } from "react-icons/hi";
import { projects } from "@/data";

// ─── Filter config ─────────────────────────────────────────────────────────────
const FILTERS = ["All", "GenAI", "ML/Data", "EdTech", "VR", "Research"] as const;
type Filter = (typeof FILTERS)[number];

// ─── Tag colour map ────────────────────────────────────────────────────────────
const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  GenAI:          { bg: "rgba(108,99,255,0.15)",  text: "#A5B4FC" },
  "Agentic AI":   { bg: "rgba(108,99,255,0.12)",  text: "#C4B5FD" },
  RAG:            { bg: "rgba(99,102,241,0.15)",   text: "#A5B4FC" },
  Kubernetes:     { bg: "rgba(50,108,229,0.15)",   text: "#93C5FD" },
  "ML/Data":      { bg: "rgba(6,214,160,0.12)",    text: "#6EE7B7" },
  "Retail AI":    { bg: "rgba(6,214,160,0.10)",    text: "#6EE7B7" },
  "Cognitive Science":{ bg:"rgba(251,191,36,0.12)",text: "#FDE68A" },
  EdTech:         { bg: "rgba(255,107,107,0.12)",  text: "#FCA5A5" },
  VR:             { bg: "rgba(168,85,247,0.15)",   text: "#D8B4FE" },
  Research:       { bg: "rgba(251,191,36,0.12)",   text: "#FDE68A" },
  Sustainability: { bg: "rgba(52,211,153,0.12)",   text: "#6EE7B7" },
};
const DEFAULT_TAG = { bg: "rgba(255,255,255,0.08)", text: "rgba(255,255,255,0.6)" };

function tagStyle(tag: string) { return TAG_COLORS[tag] ?? DEFAULT_TAG; }

// ─── Gradient borders for featured cards ──────────────────────────────────────
const FEATURED_GRADIENTS = [
  "from-violet-600 via-fuchsia-500 to-indigo-500",
  "from-indigo-500 via-blue-500 to-cyan-400",
  "from-fuchsia-500 via-rose-500 to-orange-400",
  "from-teal-400 via-green-400 to-cyan-400",
  "from-amber-400 via-orange-500 to-rose-500",
  "from-violet-500 via-purple-500 to-pink-500",
];

// ─── Animation variants ────────────────────────────────────────────────────────
const cardV: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  exit:  { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};
const gridV: Variants = {
  show: { transition: { staggerChildren: 0.08 } },
};
const overlayV: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.25 } },
  exit:   { opacity: 0, transition: { duration: 0.2 } },
};
const modalV: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  show:   { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  exit:   { opacity: 0, scale: 0.94, y: 16, transition: { duration: 0.22 } },
};

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: (typeof projects)[number];
  index: number;
  onClick: () => void;
}) {
  const grad = FEATURED_GRADIENTS[index % FEATURED_GRADIENTS.length];

  return (
    <motion.div
      variants={cardV}
      layout
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      {/* gradient border wrapper for featured */}
      {project.featured && (
        <div className={`absolute -inset-[1.5px] rounded-2xl bg-gradient-to-br ${grad} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      )}

      <div className={`
        relative flex flex-col h-full rounded-2xl overflow-hidden
        bg-[#0d0d1a] border
        ${project.featured ? "border-white/[0.10]" : "border-white/[0.07]"}
        group-hover:border-transparent transition-colors duration-300
        shadow-lg group-hover:shadow-2xl group-hover:shadow-violet-500/10
      `}>
        {/* image / placeholder */}
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${grad} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
          )}
          {/* featured star badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-yellow-400 text-xs font-inter font-semibold">
              <HiOutlineStar size={11} />
              Featured
            </div>
          )}
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-transparent to-transparent" />
        </div>

        {/* body */}
        <div className="flex flex-col flex-1 p-5">
          {/* tag pills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map((t) => {
              const s = tagStyle(t);
              return (
                <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-inter font-semibold"
                  style={{ background: s.bg, color: s.text }}>
                  {t}
                </span>
              );
            })}
          </div>

          {/* title */}
          <h3 className="font-space-grotesk font-bold text-white text-base leading-snug mb-2 group-hover:text-violet-200 transition-colors duration-200">
            {project.title}
          </h3>

          {/* 2-line description */}
          <p className="text-white/50 text-sm font-inter leading-relaxed line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* footer */}
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-violet-400/70 text-xs font-inter">Click to explore →</span>
            <div className="flex gap-2">
              {project.liveUrl && <HiOutlineExternalLink size={14} className="text-white/30" />}
              {project.repoUrl && <HiOutlineCode size={14} className="text-white/30" />}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────────
function ProjectModal({
  project,
  index,
  onClose,
}: {
  project: (typeof projects)[number];
  index: number;
  onClose: () => void;
}) {
  const grad = FEATURED_GRADIENTS[index % FEATURED_GRADIENTS.length];
  return (
    <>
      <motion.div variants={overlayV} initial="hidden" animate="show" exit="exit"
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div variants={modalV} initial="hidden" animate="show" exit="exit"
          className="relative w-full max-w-xl bg-[#0d0d1a] border border-white/[0.10] rounded-3xl overflow-hidden shadow-2xl pointer-events-auto">

          {/* gradient header */}
          <div className={`h-2 w-full bg-gradient-to-r ${grad}`} />

          {/* close */}
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.07] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white transition-all">
            <HiOutlineX size={16} />
          </button>

          <div className="p-6 sm:p-8">
            {/* tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((t) => {
                const s = tagStyle(t);
                return <span key={t} className="px-2.5 py-1 rounded-full text-xs font-inter font-semibold" style={{ background: s.bg, color: s.text }}>{t}</span>;
              })}
              {project.featured && (
                <span className="px-2.5 py-1 rounded-full text-xs font-inter font-semibold bg-yellow-400/10 text-yellow-400 flex items-center gap-1">
                  <HiOutlineStar size={11} /> Featured
                </span>
              )}
            </div>

            <h2 className="font-space-grotesk font-black text-2xl sm:text-3xl text-white mb-4">{project.title}</h2>
            <p className="text-white/60 font-inter text-sm sm:text-base leading-relaxed mb-6">{project.description}</p>

            {/* links */}
            <div className="flex gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-inter font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-500 hover:opacity-90 transition-opacity">
                  <HiOutlineExternalLink size={14} /> Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-inter font-semibold text-white/80 border border-white/20 hover:border-violet-500/50 hover:text-white transition-all">
                  <HiOutlineCode size={14} /> Source
                </a>
              )}
              {!project.liveUrl && !project.repoUrl && (
                <span className="text-white/30 text-sm font-inter italic">Proprietary / NDA — details on request</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = projects.filter((p) =>
    filter === "All" ? true : p.tags.some((t) => t === filter || t.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <section id="projects" ref={ref} className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0d18 0%, #0a0a0f 100%)" }}>

      <div aria-hidden className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px]"
        style={{ background: "radial-gradient(circle at top right, rgba(108,99,255,0.07) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* label */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-4">
          <span className="h-px w-10 bg-gradient-to-r from-violet-500 to-transparent" />
          <span className="text-violet-400 font-inter text-xs tracking-[0.22em] uppercase font-semibold">Projects</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-space-grotesk font-black text-3xl sm:text-4xl text-white mb-8">
          Selected{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Work</span>
        </motion.h2>

        {/* Filter bar */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button key={f} id={`filter-${f.replace("/","")}`} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-inter font-semibold transition-all duration-200
                ${filter === f
                  ? "bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-lg shadow-violet-500/20"
                  : "bg-white/[0.05] text-white/50 hover:text-white hover:bg-white/[0.09] border border-white/[0.07]"
                }`}>
              {f}
            </button>
          ))}
        </motion.div>

        {/* Card grid */}
        <AnimatePresence mode="wait">
          <motion.div key={filter} variants={gridV} initial="hidden" animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProjectCard key={p.title} project={p} index={projects.indexOf(p)} onClick={() => setSelected(projects.indexOf(p))} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <ProjectModal project={projects[selected]} index={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
