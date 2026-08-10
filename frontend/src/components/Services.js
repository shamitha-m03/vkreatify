import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n";

function Row({ s, i }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      data-testid={`service-row-${i}`}
      data-cursor="explore"
      data-cursor-label="EXPLORE"
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="row-glow group relative border-b border-white/10 py-8 sm:py-12 px-2 sm:px-6 transition-all duration-700 hover:py-10 sm:hover:py-16"
    >
      <div className="flex items-baseline gap-5 sm:gap-10">
        <span className="font-mono-x text-xs sm:text-sm text-white/30 group-hover:text-[#ffd76a] group-hover:-translate-y-1 transition-all duration-500">
          0{i + 1}
        </span>
        <h3 className="font-display font-medium uppercase tracking-tight leading-none text-[clamp(1.6rem,4.6vw,4rem)] text-white/75 group-hover:text-white group-hover:translate-x-3 sm:group-hover:translate-x-6 transition-all duration-700 ease-out-expo">
          {s.title}
        </h3>
        <span className="ml-auto hidden sm:block font-mono-x text-[10px] tracking-[0.3em] uppercase text-white/25 group-hover:text-white/60 transition-colors duration-500">
          {s.tag}
        </span>
        <ArrowUpRight
          size={26}
          strokeWidth={1.25}
          className="hidden sm:block text-white/20 group-hover:text-[#ffd76a] group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-all duration-500"
        />
      </div>
      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-out-expo">
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-2.5 pt-6 pl-10 sm:pl-24">
            {(s.chips || []).map((item) => (
              <span
                key={item}
                className="font-grotesk text-[10px] sm:text-xs tracking-[0.18em] uppercase text-white/50 border border-white/15 rounded-full px-4 py-1.5"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { t } = useLang();
  const sv = t("services");
  return (
    <section id="services" data-testid="services-section" className="relative px-6 sm:px-10 py-32 sm:py-48">
      <div className="flex items-end justify-between mb-14 sm:mb-20">
        <div>
          <p className="font-mono-x text-[10px] tracking-[0.35em] uppercase text-[#ffd76a]/70 mb-4">
            {sv.label}
          </p>
          <h2 className="font-display font-semibold uppercase tracking-tight leading-none text-[clamp(2.4rem,6.5vw,5.5rem)]">
            {sv.title}
          </h2>
        </div>
        <span className="font-mono-x text-xs text-white/30">05</span>
      </div>
      <div className="border-t border-white/10">
        {(sv.items || []).map((s, i) => (
          <Row key={s.title} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}
