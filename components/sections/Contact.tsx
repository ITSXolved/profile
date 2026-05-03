"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlineCheckCircle, HiOutlineExclamationCircle } from "react-icons/hi";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { personalInfo } from "@/data";

const SOCIALS = [
  { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn", color: "#0077b5" },
  { icon: FaGithub, href: personalInfo.github, label: "GitHub", color: "#333" },
  { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: "Email", color: "#EA4335" },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "Collaboration", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }
      
      setStatus("success");
      setFormData({ name: "", email: "", subject: "Collaboration", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send message";
      setStatus("error");
      setErrorMessage(message);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" ref={ref} className="relative py-28 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-[#0d0d18] dark:to-[#0a0a0f]">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-px w-10 bg-gradient-to-r from-violet-500 to-transparent" />
          <span className="text-violet-400 font-inter text-xs tracking-[0.22em] uppercase font-semibold">Get In Touch</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-space-grotesk font-black text-3xl sm:text-4xl text-slate-900 dark:text-white mb-16"
        >
          Let&apos;s Build Something{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Great</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="text-slate-900/60 dark:text-white/60 font-inter text-lg leading-relaxed max-w-md">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              
              <div className="space-y-4">
                <ContactInfoCard icon={HiOutlineMail} title="Email" value={personalInfo.email} href={`mailto:${personalInfo.email}`} />
                <ContactInfoCard icon={FaLinkedin} title="LinkedIn" value="sainulabid" href={personalInfo.linkedin} />
                <ContactInfoCard icon={HiOutlineLocationMarker} title="Location" value="Kerala, India" />
              </div>
            </div>

            {/* Social Strip */}
            <div className="pt-6">
              <p className="text-slate-900/30 dark:text-white/30 text-xs font-inter uppercase tracking-widest mb-4 font-semibold">Follow Me</p>
              <div className="flex gap-4">
                {SOCIALS.map((soc) => (
                  <motion.a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="w-12 h-12 rounded-2xl bg-slate-900/[0.04] dark:bg-white/[0.04] border border-slate-900/[0.08] dark:border-white/[0.08] flex items-center justify-center text-slate-900/50 dark:text-white/50 hover:text-slate-900 dark:text-white transition-colors"
                  >
                    <soc.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative p-8 rounded-3xl bg-slate-900/[0.02] dark:bg-white/[0.02] border border-slate-900/[0.08] dark:border-white/[0.08] backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-slate-900/40 dark:text-white/40 text-xs font-inter uppercase tracking-wider ml-1">Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900/[0.04] dark:bg-white/[0.04] border border-slate-900/[0.1] dark:border-white/[0.1] rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-inter text-sm focus:outline-none focus:border-violet-500/50 focus:bg-slate-900/[0.06] dark:bg-white/[0.06] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-900/40 dark:text-white/40 text-xs font-inter uppercase tracking-wider ml-1">Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900/[0.04] dark:bg-white/[0.04] border border-slate-900/[0.1] dark:border-white/[0.1] rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-inter text-sm focus:outline-none focus:border-violet-500/50 focus:bg-slate-900/[0.06] dark:bg-white/[0.06] transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-900/40 dark:text-white/40 text-xs font-inter uppercase tracking-wider ml-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-900/[0.04] dark:bg-white/[0.04] border border-slate-900/[0.1] dark:border-white/[0.1] rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-inter text-sm focus:outline-none focus:border-violet-500/50 focus:bg-slate-900/[0.06] dark:bg-white/[0.06] transition-all appearance-none"
                >
                  <option className="bg-white dark:bg-[#0a0a0f]" value="Collaboration">Collaboration</option>
                  <option className="bg-white dark:bg-[#0a0a0f]" value="Hire">Hire</option>
                  <option className="bg-white dark:bg-[#0a0a0f]" value="Project">Project</option>
                  <option className="bg-white dark:bg-[#0a0a0f]" value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-slate-900/40 dark:text-white/40 text-xs font-inter uppercase tracking-wider ml-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900/[0.04] dark:bg-white/[0.04] border border-slate-900/[0.1] dark:border-white/[0.1] rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-inter text-sm focus:outline-none focus:border-violet-500/50 focus:bg-slate-900/[0.06] dark:bg-white/[0.06] transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                disabled={status === "submitting"}
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 text-slate-900 dark:text-white font-inter font-bold text-sm shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
              
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-400 text-sm font-medium justify-center mt-2"
                  >
                    <HiOutlineCheckCircle size={18} />
                    Message sent successfully!
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm font-medium justify-center mt-2"
                  >
                    <HiOutlineExclamationCircle size={18} />
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactInfoCard({ icon: Icon, title, value, href }: { icon: React.ElementType, title: string, value: string, href?: string }) {
  const Card = () => (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-500 group-hover:text-slate-900 dark:text-white transition-all duration-300">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-slate-900/30 dark:text-white/30 text-[10px] font-inter uppercase tracking-widest font-bold leading-none mb-1">{title}</p>
        <p className="text-slate-900/80 dark:text-white/80 font-inter text-sm font-medium group-hover:text-slate-900 dark:text-white transition-colors">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block w-fit">
      <Card />
    </a>
  ) : (
    <Card />
  );
}
