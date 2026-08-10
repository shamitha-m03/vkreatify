import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LINES = [
  { text: "ATTENTION IS", gold: false },
  { text: "EARNED IN THE", gold: false },
  { text: "FIRST SECOND.", gold: true },
];

function Line({ text, gold, progress, index }) {
  const start = index * 0.18;
  const end = start + 0.4;
  const opacity = useTransform(progress, [start, end], [0.07, 1]);
  const y = useTransform(progress, [start, end], [70, 0]);
  const x = useTransform(progress, [start, end], [index % 2 === 0 ? 0 : 40, 0]);

  return (
    <motion.span
      data-testid={`statement-line-${index}`}
      style={{ opacity, y, x }}
      className={`block font-display font-semibold uppercase leading-[0.95] tracking-tight text-[clamp(2.6rem,8.5vw,7.5rem)] ${
        gold ? "text-[#ffd76a]" : "text-white"
      }`}
    >
      {text}
    </motion.span>
  );
}

export default function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.45"],
  });

  return (
    <section
      id="statement"
      data-testid="statement-section"
      ref={ref}
      className="relative min-h-[130vh] flex items-center px-6 sm:px-10 py-40"
    >
      <div className="max-w-[90rem]">
        <p className="font-mono-x text-[10px] tracking-[0.35em] uppercase text-white/35 mb-10">
          ( The First Impression )
        </p>
        <h2>
          {LINES.map((l, i) => (
            <Line key={l.text} {...l} progress={scrollYProgress} index={i} />
          ))}
        </h2>
        <motion.p
          style={{
            opacity: useTransform(scrollYProgress, [0.6, 0.9], [0, 0.75]),
          }}
          className="mt-12 max-w-lg text-sm sm:text-base leading-relaxed text-white/55"
        >
          From scroll-stopping reels and creative posters to consistent visual
          branding — we help businesses present themselves with clarity,
          creativity, and confidence.
        </motion.p>
      </div>
    </section>
  );
}
