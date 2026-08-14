import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n";
import CaseStudy from "@/components/CaseStudy";
import ReelsIcon from "@/components/ReelsIcon";

export default function Work() {
  const { t } = useLang();
  const w = t("work");
  const items = w.items || [];
  const [active, setActive] = useState(null);
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 180, damping: 22, mass: 0.5 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const openCase = (i) => {
    setActive(null);
    setSelected(i);
  };

  return (
    <section
      id="work"
      data-testid="work-section"
      ref={ref}
      onMouseMove={onMove}
      className="relative px-6 sm:px-10 py-32 sm:py-48"
    >
      <div className="flex items-end justify-between mb-6 sm:mb-10">
        <div>
          <p className="font-mono-x text-[10px] tracking-[0.35em] uppercase text-[#ffd76a]/70 mb-4">
            {w.label}
          </p>
          <h2 className="font-display font-semibold uppercase tracking-tight leading-none text-[clamp(2.4rem,6.5vw,5.5rem)]">
            {w.title}
          </h2>
        </div>
        <span className="font-mono-x text-xs text-white/30">0{items.length}</span>
      </div>
      <p className="font-mono-x text-[10px] tracking-[0.2em] uppercase text-white/30 mb-14">
        {w.note}
      </p>

      <div className="border-t border-white/10 relative">
        {items.map((item, i) => {
          const hasReels = (item.cat || "").toLowerCase().includes("reel") || (item.scope || "").toLowerCase().includes("reel");
          return (
            <motion.div
              key={item.name}
              data-testid={`work-row-${i}`}
              data-cursor="open"
              data-cursor-label="OPEN"
              role="button"
              tabIndex={0}
              onClick={() => openCase(i)}
              onKeyDown={(e) => e.key === "Enter" && openCase(i)}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group border-b border-white/10 py-7 sm:py-10 px-2 sm:px-6"
            >
              <div className="flex items-center gap-4 sm:gap-8">
                <div className="flex items-center gap-3">
                  <h3 className="font-display font-medium uppercase tracking-tight leading-none text-[clamp(1.5rem,4.2vw,3.6rem)] text-white/70 group-hover:text-white group-hover:translate-x-4 transition-all duration-700 ease-out-expo">
                    {item.name}
                  </h3>
                  {hasReels && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ffd76a]/10 border border-[#ffd76a]/25 group-hover:bg-[#ffd76a]/20 group-hover:border-[#ffd76a]/50 transition-all duration-500">
                      <ReelsIcon size={16} color="#ffd76a" />
                      <span className="font-mono-x text-[8px] tracking-widest text-[#ffd76a] uppercase hidden md:inline-block">
                        REELS
                      </span>
                    </span>
                  )}
                </div>
                <ArrowUpRight
                  size={24}
                  strokeWidth={1.25}
                  className="self-center text-white/20 group-hover:text-[#ffd76a] group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-all duration-500"
                />
                <div className="ml-auto text-right hidden sm:block">
                  <p className="font-grotesk text-[11px] tracking-[0.2em] uppercase text-white/45 group-hover:text-white/75 transition-colors duration-500">
                    {item.cat}
                  </p>
                  <p className="font-mono-x text-[10px] text-white/25 mt-1">
                    {item.industry} — {item.year}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {active !== null && selected === null && (
            <motion.div
              data-testid="work-preview"
              className="pointer-events-none absolute z-20 hidden md:block w-[22rem] h-[15rem] overflow-hidden rounded-lg"
              style={{ left: sx, top: sy, translateX: "-50%", translateY: "-60%" }}
              initial={{ opacity: 0, scale: 0.7, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.75, filter: "blur(10px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={items[active].img}
                alt={items[active].name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 to-transparent" />
              <p className="absolute bottom-3 left-4 font-mono-x text-[9px] tracking-[0.3em] uppercase text-[#ffd76a]">
                {items[active].cat}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CaseStudy
        project={
          selected !== null
            ? { ...items[selected], nextName: items[(selected + 1) % items.length].name }
            : null
        }
        onClose={() => setSelected(null)}
        onNext={() => setSelected((s) => (s + 1) % items.length)}
      />
    </section>
  );
}
