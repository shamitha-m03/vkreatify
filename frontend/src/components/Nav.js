import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "insights", label: "Insights" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      let current = "";
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          current = l.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        data-testid="main-nav"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-5 transition-all duration-700 ${
          scrolled ? "backdrop-blur-xl bg-[#050508]/70 border-b border-white/5" : ""
        }`}
      >
        <button
          data-testid="nav-logo"
          data-cursor="link"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display font-semibold text-lg tracking-tight leading-none"
        >
          v<span className="text-[#ffd76a]">K</span>reatify
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              data-cursor="link"
              onClick={() => go(l.id)}
              className={`group relative font-grotesk text-[11px] tracking-[0.28em] uppercase transition-all duration-500 hover:tracking-[0.38em] ${
                active === l.id ? "text-white" : "text-white/45 hover:text-white"
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-px bg-[#ffd76a] transition-all duration-500 ${
                  active === l.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </nav>

        <button
          data-testid="mobile-menu-button"
          data-cursor="link"
          onClick={() => setOpen(true)}
          className="md:hidden text-white/80"
          aria-label="Open menu"
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-[#050508]/95 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display font-semibold text-lg">
                v<span className="text-[#ffd76a]">K</span>reatify
              </span>
              <button
                data-testid="mobile-menu-close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-white/80"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  data-testid={`mobile-nav-link-${l.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => go(l.id)}
                  className="text-left font-display text-4xl font-medium uppercase tracking-tight text-white/80 py-2"
                >
                  <span className="font-mono-x text-xs text-[#ffd76a]/70 mr-4">
                    0{i + 1}
                  </span>
                  {l.label}
                </motion.button>
              ))}
            </div>
            <div className="px-8 pb-10 font-mono-x text-[10px] tracking-[0.2em] text-white/35 uppercase">
              Coimbatore, Tamil Nadu — Est. 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
