"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { HiOutlineArrowDown } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import { personalInfo } from "@/data";

// ─── Animation variants ───────────────────────────────────────────────────────
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" as const },
  },
};

// ─── Hexagonal clip-path helper (CSS polygon) ─────────────────────────────────
// A regular hexagon expressed as clip-path polygon
const HEX_CLIP = "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)";

export default function Hero() {
  const info = personalInfo as typeof personalInfo & {
    cvPath: string;
    photo: string;
    subtext: string;
    taglines: string[];
  };

  // Build typewriter sequence inside to ensure data availability
  const typewriterSeq = info.taglines.flatMap((t: string) => [t, 2200]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-[#0a0a0f]"
    >
      {/* ── Full-page background photo ── */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/PhotoforBanner.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.50] dark:opacity-[0.18] mix-blend-luminosity dark:mix-blend-normal"
        />
        {/* dark/light vignette so edges fade into background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,#ffffff_100%)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,#0a0a0f_100%)]" />
      </div>

      {/* ── Animated gradient mesh (CSS only) ── */}
      <div className="hero-gradient-mesh" aria-hidden />

      {/* ── Floating particle dots ── */}
      <div className="particles" aria-hidden>
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="particle" style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>

      {/* ── Main content grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-20 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8 lg:gap-16">

          {/* ───────────── LEFT — Text ───────────── */}
          <motion.div
            className="flex-1 text-center md:text-left"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Greeting */}
            <motion.p
              variants={fadeUp}
              className="text-violet-600 dark:text-violet-400 font-space-grotesk text-sm sm:text-base font-medium tracking-[0.2em] uppercase mb-4"
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="font-space-grotesk font-black leading-none tracking-tight mb-4
                         text-4xl sm:text-5xl lg:text-6xl xl:text-7xl
                         text-slate-900 dark:text-white"
            >
              {info.name}
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              variants={fadeUp}
              className="h-10 sm:h-12 flex items-center justify-center md:justify-start mb-5"
            >
              <TypeAnimation
                sequence={typewriterSeq}
                wrapper="span"
                speed={48}
                deletionSpeed={65}
                repeat={Infinity}
                className="
                  font-space-grotesk font-semibold
                  text-xl sm:text-2xl lg:text-3xl
                  bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-indigo-400
                  bg-clip-text text-transparent
                "
              />
            </motion.div>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="text-slate-900/50 dark:text-white/50 text-sm sm:text-base font-inter leading-relaxed mb-10 max-w-md mx-auto md:mx-0"
            >
              {info.subtext}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              {/* Primary */}
              <a
                id="cta-view-work"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative inline-flex items-center justify-center gap-2
                           px-7 py-3.5 rounded-2xl font-semibold text-sm font-inter text-slate-900 dark:text-white
                           bg-gradient-to-r from-violet-600 to-indigo-500
                           shadow-lg shadow-violet-500/30
                           hover:shadow-violet-500/50 hover:scale-[1.03]
                           transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Work
                  <HiOutlineArrowDown
                    size={15}
                    className="group-hover:translate-y-0.5 transition-transform duration-300"
                  />
                </span>
                {/* shimmer on hover */}
                <span className="
                  absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                  bg-gradient-to-r from-transparent via-white/20 to-transparent
                  transition-transform duration-700 skew-x-12
                " />
              </a>

              {/* Outline */}
              <a
                id="cta-download-cv"
                href={info.cvPath}
                download
                className="inline-flex items-center justify-center gap-2
                           px-7 py-3.5 rounded-2xl font-semibold text-sm font-inter
                           text-slate-900/80 dark:text-white/80 hover:text-slate-900 dark:text-white
                           border border-slate-900/20 dark:border-white/20 hover:border-violet-500/60
                           hover:bg-violet-500/10 hover:scale-[1.03]
                           transition-all duration-300"
              >
                <FiDownload size={15} />
                Download CV
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              variants={fadeIn}
              className="hidden md:flex items-center gap-2 mt-14 text-slate-900/30 dark:text-white/30"
            >
              <span className="scroll-line" />
              <span className="text-xs font-inter tracking-widest uppercase">Scroll</span>
            </motion.div>
          </motion.div>

          {/* ───────────── RIGHT — Photo ───────────── */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Outer glow ring */}
            <div className="hex-glow-ring">
              {/* Rotating gradient border */}
              <div className="hex-border-ring" aria-hidden />

              {/* Photo frame */}
              <div
                className="hex-frame"
                style={{ clipPath: HEX_CLIP }}
              >
                <Image
                  src={info.photo}
                  alt={`${info.name} profile photo`}
                  fill
                  sizes="(max-width: 768px) 220px, 320px"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Inline styles (CSS-only particles + mesh + hex) ── */}
      <style jsx>{`
        /* ── Gradient mesh ── */
        .hero-gradient-mesh {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 70% 40%, rgba(109,40,217,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 45% 40% at 20% 70%, rgba(79,70,229,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 35% 30% at 85% 80%, rgba(168,85,247,0.10) 0%, transparent 60%);
          animation: meshShift 12s ease-in-out infinite alternate;
        }

        @keyframes meshShift {
          0%   { filter: blur(0px); }
          50%  { filter: blur(2px); }
          100% { filter: blur(0px); }
        }

        /* ── Floating particles ── */
        .particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(139,92,246,0.35);
          animation: floatParticle var(--dur, 8s) var(--delay, 0s) ease-in-out infinite alternate;
        }

        /* Size + position variations using --i */
        .particle:nth-child(4n+1)  { width: 3px; height: 3px; top: calc(var(--i) * 4% + 2%);  left: calc(var(--i) * 4% + 1%);  --dur: 7s;  --delay: calc(var(--i) * -0.3s); }
        .particle:nth-child(4n+2)  { width: 2px; height: 2px; top: calc(var(--i) * 3% + 10%); left: calc(var(--i) * 4% + 5%);  --dur: 9s;  --delay: calc(var(--i) * -0.4s); background: rgba(168,85,247,0.25); }
        .particle:nth-child(4n+3)  { width: 4px; height: 4px; top: calc(var(--i) * 3% + 5%);  left: calc(var(--i) * 3% + 15%); --dur: 11s; --delay: calc(var(--i) * -0.2s); background: rgba(99,102,241,0.30); }
        .particle:nth-child(4n)    { width: 2px; height: 2px; top: calc(var(--i) * 4% + 20%); left: calc(var(--i) * 3% + 8%);  --dur: 6s;  --delay: calc(var(--i) * -0.5s); background: rgba(196,181,253,0.20); }

        @keyframes floatParticle {
          0%   { transform: translateY(0)   scale(1);   opacity: 0.3; }
          50%  { transform: translateY(-18px) scale(1.3); opacity: 0.7; }
          100% { transform: translateY(4px)  scale(0.9); opacity: 0.2; }
        }

        /* ── Hex photo ── */
        .hex-glow-ring {
          position: relative;
          width: 280px;
          height: 280px;
        }

        @media (min-width: 1024px) {
          .hex-glow-ring { width: 360px; height: 360px; }
        }

        /* animated spinning gradient border */
        .hex-border-ring {
          position: absolute;
          inset: -4px;
          clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
          background: conic-gradient(from 0deg, #7c3aed, #6366f1, #a855f7, #7c3aed);
          animation: spinRing 4s linear infinite;
          filter: blur(1px);
        }

        @keyframes spinRing {
          to { transform: rotate(360deg); }
        }

        /* inner photo container */
        .hex-frame {
          position: absolute;
          inset: 4px;
          overflow: hidden;
        }

        /* ── Scroll indicator line ── */
        .scroll-line {
          display: block;
          width: 40px;
          height: 1px;
          background: linear-gradient(to right, rgba(139,92,246,0.8), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleX(1); }
          50%       { opacity: 1;   transform: scaleX(1.4); }
        }
      `}</style>
    </section>
  );
}
