import { motion } from "framer-motion";

const STEPS = [
  { title: "Understand", body: "We learn about your business, audience, and goals." },
  { title: "Plan", body: "We develop the content direction, creative concept, and delivery plan." },
  { title: "Create", body: "Our team designs, edits, and refines the required content." },
  { title: "Review", body: "You share feedback and approve the final work." },
  { title: "Deliver", body: "We provide high-quality, platform-ready files." },
];

export default function Process() {
  return (
    <section id="process" data-testid="process-section" className="relative px-6 sm:px-10 py-32 sm:py-48">
      <p className="font-mono-x text-[10px] tracking-[0.35em] uppercase text-[#ffd76a]/70 mb-4">
        ( How We Work )
      </p>
      <h2 className="font-display font-semibold uppercase tracking-tight leading-none text-[clamp(2.4rem,6.5vw,5.5rem)] mb-16 sm:mb-24">
        Process
      </h2>

      <div className="grid gap-0">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.title}
            data-testid={`process-step-${i}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="group relative border-t border-white/10 py-8 sm:py-12 sm:grid sm:grid-cols-12 gap-8 items-baseline"
          >
            <span className="sm:col-span-3 font-display font-semibold text-5xl sm:text-7xl text-stroke group-hover:text-[#ffd76a]/25 transition-colors duration-700">
              0{i + 1}
            </span>
            <h3 className="sm:col-span-4 font-display font-medium uppercase tracking-tight text-2xl sm:text-4xl text-white/85 group-hover:translate-x-3 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] mt-3 sm:mt-0">
              {s.title}
            </h3>
            <p className="sm:col-span-5 max-w-md text-sm sm:text-base leading-relaxed text-white/50 mt-3 sm:mt-0">
              {s.body}
            </p>
          </motion.div>
        ))}
        <div className="border-t border-white/10" />
      </div>
    </section>
  );
}
