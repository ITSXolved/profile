"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// TODO: Implement full SectionWrapper
// Wraps each section with: consistent padding, max-width, fade-in on scroll,
//                           optional heading and sub-heading

interface SectionWrapperProps {
  id: string;
  heading?: string;
  subHeading?: string;
  className?: string;
  children: React.ReactNode;
}

export default function SectionWrapper({
  id,
  heading,
  subHeading,
  className = "",
  children,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id={id} ref={ref} className={`py-24 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {heading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold font-space-grotesk">{heading}</h2>
            {subHeading && (
              <p className="mt-3 text-muted-foreground">{subHeading}</p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
