import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const LINES = ["WE MAKE", "BRANDS", "UNIGNORABLE."];

export default function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      data-testid="hero-section"
      data-cursor="orb"
      className="relative min-h-screen flex flex-col justify-end px-6 sm:px-10 pb-14 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[46rem] h-[46rem] rounded-full bg-[radial-gradient(circle,rgba(255,157,46,0.07),transparent_65%)]" />
        <div className="absolute bottom-0 left-0 w-[38rem] h-[38rem] rounded-full bg-[radial-gradient(circle,rgba(80,120,220,0.06),transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-[90rem]">
        <motion.p
          data-testid="hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1.2, ease: EASE }}
          className="font-mono-x text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#ffd76a]/80 mb-6"
        >
          Creative Digital Solutions — Coimbatore
        </motion.p>

        <h1 className="font-display font-semibold uppercase leading-[0.9] tracking-tight text-[clamp(2.7rem,10.5vw,9.5rem)]">
          {LINES.map((line, i) => (
            <span key={line} className="mask-line">
              <motion.span
                data-testid={`hero-line-${i}`}
                className={`block ${i === 2 ? "text-stroke-gold" : ""}`}
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.85 + i * 0.16, duration: 1.3, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16">
          <motion.p
            data-testid="hero-subtext"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1, ease: EASE }}
            className="max-w-md text-sm sm:text-base leading-relaxed text-white/55"
          >
            vKreatify crafts scroll-stopping reels, posters, and visual identities
            that help businesses attract attention, communicate clearly, and grow online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.85, duration: 1, ease: EASE }}
            className="flex items-center gap-4"
          >
            <button
              data-testid="hero-cta-start"
              data-cursor="link"
              onClick={() => go("contact")}
              className="group relative overflow-hidden rounded-full border border-[#ffd76a]/50 px-7 py-3.5 font-grotesk text-[11px] tracking-[0.25em] uppercase text-[#ffd76a] whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-[#ffd76a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out-expo" />
              <span className="relative group-hover:text-[#050508] transition-colors duration-500">
                Start Your Project
              </span>
            </button>
            <button
              data-testid="hero-cta-work"
              data-cursor="link"
              onClick={() => go("work")}
              className="font-grotesk text-[11px] tracking-[0.25em] uppercase text-white/50 hover:text-white transition-colors duration-500"
            >
              View Our Work →
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        data-testid="hero-indicators"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.2 }}
        className="absolute bottom-14 right-6 sm:right-10 hidden sm:flex flex-col items-center gap-3"
      >
        <span className="font-mono-x text-[9px] tracking-[0.35em] uppercase text-white/35 rotate-90 origin-center translate-y-[-8px]">
          Scroll
        </span>
        <div className="w-px h-16 bg-white/15 overflow-hidden mt-6">
          <div className="w-full h-full bg-[#ffd76a]/70 scroll-line" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.2 }}
        className="absolute top-24 left-6 sm:left-10 font-mono-x text-[9px] tracking-[0.3em] uppercase text-white/30"
      >
        Est. 17.03.2026 — TN, IN
      </motion.div>
    </section>
  );
}
