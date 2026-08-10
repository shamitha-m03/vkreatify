import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const WORK = [
  { name: "Midnight Masala", cat: "Reels & Posters", industry: "Restaurant", year: "2026", img: "https://images.unsplash.com/photo-1633164442172-dc4147f21954?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85" },
  { name: "Pulse Fitness Studio", cat: "Brand Identity", industry: "Fitness", year: "2026", img: "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg" },
  { name: "Lumen Jewellery", cat: "Product Campaign", industry: "Retail", year: "2026", img: "https://images.unsplash.com/photo-1670509624628-bbe8efe126a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85" },
  { name: "Nexus Academy", cat: "Content System", industry: "Education", year: "2026", img: "https://images.unsplash.com/photo-1633164442172-dc4147f21954?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBhcnQlMjAzZHxlbnwwfHx8fDE3ODYzNjI2MzJ8MA&ixlib=rb-4.1.0&q=85" },
  { name: "Verde Café", cat: "Launch Creatives", industry: "F&B", year: "2026", img: "https://images.pexels.com/photos/12537427/pexels-photo-12537427.jpeg" },
];

export default function Work() {
  const [active, setActive] = useState(null);
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
            ( Selected Work )
          </p>
          <h2 className="font-display font-semibold uppercase tracking-tight leading-none text-[clamp(2.4rem,6.5vw,5.5rem)]">
            Portfolio
          </h2>
        </div>
        <span className="font-mono-x text-xs text-white/30">0{WORK.length}</span>
      </div>
      <p className="font-mono-x text-[10px] tracking-[0.2em] uppercase text-white/30 mb-14">
        Concept showcase — client work published with permission
      </p>

      <div className="border-t border-white/10 relative">
        {WORK.map((w, i) => (
          <motion.div
            key={w.name}
            data-testid={`work-row-${i}`}
            data-cursor="view"
            data-cursor-label="VIEW"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group border-b border-white/10 py-7 sm:py-10 px-2 sm:px-6"
          >
            <div className="flex items-baseline gap-4 sm:gap-8">
              <h3 className="font-display font-medium uppercase tracking-tight leading-none text-[clamp(1.5rem,4.2vw,3.6rem)] text-white/70 group-hover:text-white group-hover:translate-x-4 transition-all duration-700 ease-out-expo">
                {w.name}
              </h3>
              <ArrowUpRight
                size={24}
                strokeWidth={1.25}
                className="self-center text-white/20 group-hover:text-[#ffd76a] group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-all duration-500"
              />
              <div className="ml-auto text-right hidden sm:block">
                <p className="font-grotesk text-[11px] tracking-[0.2em] uppercase text-white/45 group-hover:text-white/75 transition-colors duration-500">
                  {w.cat}
                </p>
                <p className="font-mono-x text-[10px] text-white/25 mt-1">
                  {w.industry} — {w.year}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {active !== null && (
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
                src={WORK[active].img}
                alt={WORK[active].name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 to-transparent" />
              <p className="absolute bottom-3 left-4 font-mono-x text-[9px] tracking-[0.3em] uppercase text-[#ffd76a]">
                {WORK[active].cat}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
