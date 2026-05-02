"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { HiOutlineSun, HiOutlineMoon, HiMenuAlt3, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Experience", href: "#experience" },
  { label: "Media",      href: "#media"      },
  { label: "Projects",   href: "#projects"   },
  { label: "Contact",    href: "#contact"    },
];

// ─── smooth scroll helper (works without next-scroll) ────────────────────────
function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // avoid hydration mismatch for theme icon
  useEffect(() => { setMounted(true); }, []);

  // transparent → solid on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // close mobile menu on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? "bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-slate-900/[0.06] dark:border-white/[0.06] shadow-lg shadow-black/5 dark:shadow-black/20"
          : "bg-transparent"
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── Monogram Logo ── */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
          className="flex-shrink-0 group"
          aria-label="Go to top"
        >
          <div className="
            relative w-10 h-10 rounded-xl flex items-center justify-center
            bg-gradient-to-br from-violet-600 to-indigo-500
            shadow-lg shadow-violet-500/25
            group-hover:shadow-violet-500/50 group-hover:scale-105
            transition-all duration-300
          ">
            <span className="font-space-grotesk font-bold text-slate-900 dark:text-white text-sm tracking-tight">
              SA
            </span>
            {/* pulse ring */}
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 opacity-0 group-hover:opacity-30 group-hover:scale-125 transition-all duration-500" />
          </div>
        </a>

        {/* ── Desktop Links ── */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={(e) => { e.preventDefault(); scrollTo(href); setMenuOpen(false); }}
                className="
                  relative px-4 py-2 text-sm font-medium font-inter
                  text-slate-900/70 dark:text-white/70 hover:text-slate-900 dark:text-white
                  transition-colors duration-200
                  after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                  after:h-0.5 after:w-0 hover:after:w-4/5
                  after:bg-gradient-to-r after:from-violet-500 after:to-indigo-400
                  after:rounded-full after:transition-all after:duration-300
                "
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Right Controls ── */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            id="theme-toggle"
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="
              w-9 h-9 rounded-lg flex items-center justify-center
              text-slate-900/70 dark:text-white/70 hover:text-slate-900 dark:text-white
              hover:bg-slate-900/10 dark:bg-white/10
              transition-all duration-200
            "
          >
            {mounted ? (
              isDark
                ? <HiOutlineSun size={18} />
                : <HiOutlineMoon size={18} />
            ) : (
              <span className="w-4 h-4 rounded-full bg-slate-900/20 dark:bg-white/20" />
            )}
          </button>

          {/* Hamburger (mobile) */}
          <button
            id="mobile-menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="
              md:hidden w-9 h-9 rounded-lg flex items-center justify-center
              text-slate-900/70 dark:text-white/70 hover:text-slate-900 dark:text-white hover:bg-slate-900/10 dark:bg-white/10
              transition-all duration-200
            "
          >
            {menuOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Slide-Down Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-2xl border-b border-slate-900/[0.06] dark:border-white/[0.06]"
          >
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open:   { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              className="flex flex-col px-6 py-4 gap-1"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <motion.li
                  key={label}
                  variants={{
                    open:   { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -16 },
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href); setMenuOpen(false); }}
                    className="
                      flex items-center gap-3 px-4 py-3 rounded-xl
                      text-slate-900/70 dark:text-white/70 hover:text-slate-900 dark:text-white hover:bg-slate-900/[0.06] dark:bg-white/[0.06]
                      font-medium text-sm font-inter
                      transition-all duration-200
                    "
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    {label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
