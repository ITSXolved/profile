"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const GALLERY_IMAGES = [
  {
    src: "/images/iNTERACTION WITH CHILDREN.jpeg",
    title: "Global Impact",
    desc: "Engaging with the next generation of innovators.",
  },
  {
    src: "/images/Meeting with ObaidullaKhan Azmi.jpeg",
    title: "Leadership",
    desc: "Discussing technology roadmaps with key stakeholders.",
  },
  {
    src: "/images/Talking In Profsummit.jpeg",
    title: "Thought Leadership",
    desc: "Keynote on AI integration at the Profsummit.",
  },
  {
    src: "/images/iNTERACTION WITH A MR. IDRIS VOHRA.jpeg",
    title: "Collaboration",
    desc: "Strategic planning sessions for enterprise AI.",
  },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" ref={ref} className="py-24 relative overflow-hidden bg-[#0a0a0f]">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-space-grotesk font-black text-3xl sm:text-4xl text-white mb-4">
            Leadership & <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Impact</span>
          </h2>
          <p className="text-white/40 font-inter text-sm max-w-xl mx-auto">
            Beyond the code: Snapshots of strategic collaboration, community engagement, and thought leadership.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.02]"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-space-grotesk font-bold text-white text-lg mb-1">{img.title}</h3>
                <p className="text-white/60 text-xs font-inter leading-relaxed">{img.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
