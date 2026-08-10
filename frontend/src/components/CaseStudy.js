import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { useLang } from "@/i18n";

const EASE = [0.22, 1, 0.36, 1];

export default function CaseStudy({ project, onClose, onNext }) {
  const lenis = useLenis();
  const { t } = useLang();
  const labels = t("caseStudy");

  useEffect(() => {
    if (project) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [project, lenis]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          data-testid="case-study-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-0 z-[80] bg-[#050508]/90 backdrop-blur-xl"
        >
          <div
            data-lenis-prevent
            className="h-full overflow-y-auto"
          >
            <div className="min-h-full px-6 sm:px-10 py-8 max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-14">
                <span className="font-mono-x text-[10px] tracking-[0.3em] uppercase text-[#ffd76a]/70">
                  {project.cat} — {project.year}
                </span>
                <button
                  data-testid="case-study-close"
                  data-cursor="link"
                  onClick={onClose}
                  aria-label={labels.close}
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-[#ffd76a]/60 hover:text-[#ffd76a] transition-colors duration-500"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                className="font-display font-semibold uppercase tracking-tight leading-[0.95] text-[clamp(2.4rem,7vw,6rem)] mb-14"
              >
                {project.name}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                className="grid sm:grid-cols-3 gap-8 border-y border-white/10 py-8 mb-14 font-mono-x text-xs"
              >
                <div>
                  <p className="text-white/30 tracking-[0.25em] uppercase mb-2">{labels.scope}</p>
                  <p className="text-white/75 leading-relaxed">{project.scope}</p>
                </div>
                <div>
                  <p className="text-white/30 tracking-[0.25em] uppercase mb-2">{labels.industry}</p>
                  <p className="text-white/75">{project.industry}</p>
                </div>
                <div>
                  <p className="text-white/30 tracking-[0.25em] uppercase mb-2">{labels.year}</p>
                  <p className="text-white/75">{project.year}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                className="grid md:grid-cols-2 gap-6 mb-14"
              >
                {project.gallery.map((src, i) => (
                  <div key={i} className="overflow-hidden rounded-lg border border-white/10">
                    <img
                      src={src}
                      alt={`${project.name} ${i + 1}`}
                      loading="lazy"
                      className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-700 ease-out-expo"
                    />
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
                className="grid md:grid-cols-2 gap-x-14 gap-y-12 mb-16"
              >
                <div>
                  <h3 className="font-mono-x text-[10px] tracking-[0.3em] uppercase text-[#ffd76a]/70 mb-4">
                    {labels.overview}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/65">{project.overview}</p>
                </div>
                <div>
                  <h3 className="font-mono-x text-[10px] tracking-[0.3em] uppercase text-[#ffd76a]/70 mb-4">
                    {labels.challenge}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/65">{project.challenge}</p>
                </div>
                <div>
                  <h3 className="font-mono-x text-[10px] tracking-[0.3em] uppercase text-[#ffd76a]/70 mb-4">
                    {labels.approach}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/65">{project.approach}</p>
                </div>
                <div>
                  <h3 className="font-mono-x text-[10px] tracking-[0.3em] uppercase text-[#ffd76a]/70 mb-4">
                    {labels.deliverables}
                  </h3>
                  <ul className="space-y-2.5">
                    {project.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-3 text-sm text-white/65">
                        <span className="w-1 h-1 rounded-full bg-[#ffd76a]/70 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <button
                data-testid="case-study-next"
                data-cursor="link"
                onClick={onNext}
                className="group flex items-center gap-4 border-t border-white/10 pt-10 pb-6 w-full text-left"
              >
                <span className="font-mono-x text-[10px] tracking-[0.3em] uppercase text-white/35">
                  {labels.next}
                </span>
                <span className="font-display font-medium uppercase tracking-tight text-2xl sm:text-4xl text-white/70 group-hover:text-white group-hover:translate-x-2 transition-all duration-700 ease-out-expo">
                  {project.nextName}
                </span>
                <ArrowRight
                  size={26}
                  strokeWidth={1.25}
                  className="ml-auto text-white/25 group-hover:text-[#ffd76a] group-hover:translate-x-2 transition-all duration-500"
                />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
