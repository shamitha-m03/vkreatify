import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const CHAPTERS = [
  {
    title: "Mission",
    body: "To help businesses communicate their ideas through creative, useful, and memorable digital content.",
  },
  {
    title: "Vision",
    body: "To become a trusted creative partner for ambitious brands in Coimbatore and beyond.",
  },
  {
    title: "Values",
    body: "Creativity with purpose. Clear communication. Consistent quality. Timely delivery. Long-term relationships.",
  },
];

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="relative px-6 sm:px-10 py-32 sm:py-56">
      <p className="font-mono-x text-[10px] tracking-[0.35em] uppercase text-[#ffd76a]/70 mb-10">
        ( About vKreatify )
      </p>

      <h2 className="font-display font-semibold uppercase tracking-tight leading-[0.95] text-[clamp(2.4rem,7.5vw,6.8rem)] max-w-6xl">
        {["CREATIVE CONTENT", "THAT CONNECTS", "AND CONVERTS."].map((line, i) => (
          <span key={line} className="mask-line">
            <motion.span
              data-testid={`about-line-${i}`}
              className={`block ${i === 1 ? "text-white/40" : ""}`}
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, delay: i * 0.12, ease: EASE }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h2>

      <div className="mt-24 sm:mt-36 grid gap-16 sm:gap-0">
        {CHAPTERS.map((c, i) => (
          <motion.div
            key={c.title}
            data-testid={`about-chapter-${i}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="sm:grid sm:grid-cols-12 gap-8 border-t border-white/10 pt-8 sm:pt-10 sm:pb-4"
          >
            <span className="sm:col-span-2 font-mono-x text-sm text-[#ffd76a]/70">
              Ch. 0{i + 1}
            </span>
            <h3 className="sm:col-span-4 font-display font-medium uppercase tracking-tight text-2xl sm:text-3xl text-white/85 mt-2 sm:mt-0">
              {c.title}
            </h3>
            <p className="sm:col-span-6 max-w-xl text-sm sm:text-base leading-relaxed text-white/55 mt-4 sm:mt-0">
              {c.body}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="mt-20 max-w-2xl text-sm leading-relaxed text-white/40"
      >
        vKreatify Digital Solutions Private Limited is a Coimbatore-based creative
        digital solutions company. Every design, reel, and content idea is developed
        to help a brand communicate better and connect with its audience.
      </motion.p>
    </section>
  );
}
