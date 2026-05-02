"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";
import { HiOutlineBriefcase, HiOutlineChip, HiOutlineUserGroup, HiOutlineAcademicCap } from "react-icons/hi";
import { BsArrowUpRight } from "react-icons/bs";

const STATS = [
  { icon: HiOutlineBriefcase,   label: "Years Experience", value: 9,  suffix: "+" },
  { icon: HiOutlineChip,        label: "Projects Shipped", value: 15, suffix: "+" },
  { icon: HiOutlineUserGroup,   label: "Leadership Roles", value: 3,  suffix: ""  },
  { icon: HiOutlineAcademicCap, label: "Cert. Domains",    value: 6,  suffix: ""  },
];

const HIGHLIGHTS = [
  { color: "from-violet-500 to-indigo-500",  label: "GenAI & LLMs"         },
  { color: "from-fuchsia-500 to-violet-500", label: "VR/XR Learning"       },
  { color: "from-indigo-500 to-blue-500",    label: "EdTech Platforms"      },
  { color: "from-blue-500 to-cyan-400",      label: "Pharma IT Automation"  },
  { color: "from-cyan-400 to-teal-400",      label: "Retail AI"             },
  { color: "from-teal-400 to-green-400",     label: "Cognitive Science"     },
];

function useCounter(target: number, duration = 1400, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let val = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      val += step;
      if (val >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(val));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function StatCard({ icon: Icon, label, value, suffix, active }: (typeof STATS)[0] & { active: boolean }) {
  const count = useCounter(value, 1400, active);
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex flex-col items-center justify-center gap-1.5 rounded-2xl p-4 text-center
                 bg-slate-900/[0.04] dark:bg-white/[0.04] border border-slate-900/[0.08] dark:border-white/[0.08]
                 hover:border-violet-500/40 hover:bg-slate-900/[0.07] dark:bg-white/[0.07] transition-colors duration-300"
    >
      <div className="w-9 h-9 rounded-xl bg-violet-500/15 flex items-center justify-center mb-1">
        <Icon className="text-violet-400" size={18} />
      </div>
      <span className="font-space-grotesk font-black text-2xl text-slate-900 dark:text-white leading-none">{count}{suffix}</span>
      <span className="text-slate-900/40 dark:text-white/40 text-xs font-inter leading-tight">{label}</span>
    </motion.div>
  );
}

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const itemV: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="relative py-28 overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0a0f] dark:to-[#0d0d18]">

      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/3 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section label */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-14">
          <span className="h-px w-10 bg-gradient-to-r from-violet-500 to-transparent" />
          <span className="text-violet-400 font-inter text-xs tracking-[0.22em] uppercase font-semibold">About Me</span>
        </motion.div>

        <motion.div variants={containerV} initial="hidden" animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — photo + stats */}
          <motion.div variants={itemV} className="flex flex-col gap-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-900/[0.03] dark:bg-white/[0.03] group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 dark:to-[#0a0a0f]/80 z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-indigo-600/0
                              group-hover:from-violet-600/10 group-hover:to-indigo-600/10 transition-all duration-500 z-10" />
              <div className="relative w-full aspect-[9/16]">
                <Image src="/images/Photo2.jpeg" alt="Sainul Abid M" fill
                  sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                <p className="font-space-grotesk font-bold text-slate-900 dark:text-white text-lg">Sainul Abid M</p>
                <p className="text-violet-400 text-sm font-inter">CTO · Director · AI Architect</p>
              </div>
              <a href="https://linkedin.com/in/sainulabid" target="_blank" rel="noopener noreferrer"
                className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full
                           text-xs font-inter font-semibold bg-[#0077b5]/80 text-slate-900 dark:text-white backdrop-blur-sm
                           hover:bg-[#0077b5] transition-colors duration-200">
                LinkedIn <BsArrowUpRight size={10} />
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
              {STATS.map((s) => <StatCard key={s.label} {...s} active={isInView} />)}
            </div>
          </motion.div>

          {/* RIGHT — bio */}
          <motion.div variants={itemV} className="flex flex-col gap-7">
            <h2 className="font-space-grotesk font-black text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
              Building the{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">future</span>
              {" "}of intelligent systems
            </h2>

            <div className="space-y-5 text-slate-900/60 dark:text-white/60 font-inter text-base leading-relaxed">
              <p>
                I&apos;m an AI Technology Leader driving innovation at the intersection of{" "}
                <span className="text-violet-400 font-medium">Generative AI</span>, machine learning,
                and immersive technologies. Currently serving as{" "}
                <span className="text-slate-900/85 dark:text-white/85 font-medium">CTO at Iluzia Labs</span> and{" "}
                <span className="text-slate-900/85 dark:text-white/85 font-medium">Director at AyaTech</span>, I architect
                intelligent systems—from enterprise GenAI chatbots and RAG pipelines to VR learning
                environments and data-driven EdTech platforms.
              </p>
              <p>
                My work spans pharma IT automation, retail AI, cognitive science research, and
                sustainable urbanization—each driven by one belief:{" "}
                <span className="text-slate-900/90 dark:text-white/90 font-semibold italic">technology should solve real human problems.</span>
              </p>
            </div>

            <div>
              <p className="text-slate-900/30 dark:text-white/30 text-xs font-inter uppercase tracking-widest mb-3 font-semibold">Focus Areas</p>
              <div className="flex flex-wrap gap-2">
                {HIGHLIGHTS.map(({ color, label }) => (
                  <span key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-inter
                               font-semibold text-slate-900/85 dark:text-white/85 bg-slate-900/[0.05] dark:bg-white/[0.05] border border-slate-900/[0.08] dark:border-white/[0.08]
                               hover:border-violet-500/40 transition-colors duration-200">
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${color} flex-shrink-0`} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <blockquote className="pl-5 border-l-2 border-violet-500/50 text-slate-900/40 dark:text-white/40 font-inter italic text-sm leading-relaxed">
              &ldquo;From pharma automation to VR classrooms — every system I build is one step closer
              to technology that truly serves humanity.&rdquo;
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
