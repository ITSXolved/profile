"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiPlay, HiOutlineExternalLink } from "react-icons/hi";
import { FaYoutube } from "react-icons/fa";

// ─── Media data ────────────────────────────────────────────────────────────────
const VIDEOS = [
  {
    id: "JnRwzr0G0ns",
    title: "Risala Update Interview",
    subtitle: "AI Technology Leadership & Innovation",
    description:
      "In-depth interview on the future of Generative AI, enterprise transformation, and the role of technology in education — featured on Risala Update.",
    channel: "Risala Update",
    tag: "Featured Interview",
    tagColor: "#6C63FF",
    tagBg: "rgba(108,99,255,0.15)",
  },
];

function VideoCard({ video }: { video: (typeof VIDEOS)[number] }) {
  const [playing, setPlaying] = useState(false);
  const thumbSrc = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Video player / thumbnail */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/[0.08] bg-black shadow-2xl shadow-black/50 group">
        <AnimatePresence mode="wait">
          {!playing ? (
            <motion.div
              key="thumbnail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => setPlaying(true)}
            >
              {/* Thumbnail */}
              <Image
                src={thumbSrc}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 900px"
                unoptimized
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

              {/* Gradient overlay bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  {/* outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-xl scale-150" />
                  <div className="relative w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl shadow-black/50">
                    <HiPlay size={32} className="text-violet-700 translate-x-0.5" />
                  </div>
                </motion.div>
              </div>

              {/* YouTube badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10">
                <FaYoutube size={16} className="text-red-500" />
                <span className="text-white/80 text-xs font-inter font-semibold">{video.channel}</span>
              </div>

              {/* Tag badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-inter font-semibold"
                style={{ background: video.tagBg, color: video.tagColor, border: `1px solid ${video.tagColor}30` }}>
                {video.tag}
              </div>

              {/* Bottom title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/60 text-xs font-inter uppercase tracking-widest mb-1">{video.channel}</p>
                <h3 className="text-white font-space-grotesk font-bold text-xl sm:text-2xl">{video.title}</h3>
              </div>
            </motion.div>
          ) : (
            <motion.iframe
              key="player"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </AnimatePresence>
      </div>

      {/* Video details card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]"
      >
        <div className="flex-1">
          <span className="text-xs font-inter font-semibold uppercase tracking-widest mb-2 block"
            style={{ color: video.tagColor }}>{video.tag}</span>
          <p className="text-white/55 font-inter text-sm leading-relaxed max-w-2xl">{video.description}</p>
        </div>
        <a
          href={`https://youtu.be/${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-inter font-semibold text-white/80 border border-white/15 hover:border-violet-500/50 hover:text-white hover:bg-violet-500/10 transition-all duration-200"
        >
          <FaYoutube size={16} className="text-red-500" />
          Watch on YouTube
          <HiOutlineExternalLink size={14} />
        </a>
      </motion.div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Media() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="media" ref={ref} className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #0d0d18 100%)" }}>

      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px]"
        style={{ background: "radial-gradient(ellipse, rgba(108,99,255,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-4">
          <span className="h-px w-10 bg-gradient-to-r from-violet-500 to-transparent" />
          <span className="text-violet-400 font-inter text-xs tracking-[0.22em] uppercase font-semibold">Media</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-space-grotesk font-black text-3xl sm:text-4xl text-white mb-3">
          Press &amp;{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Interviews</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/40 font-inter text-sm mb-12 max-w-lg">
          Featured appearances, keynote talks, and media conversations on AI, leadership, and the future of technology.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}>
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
