import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const POSTS = [
  { year: "2026", cat: "Attention", title: "The First Second Decides Everything" },
  { year: "2026", cat: "Branding", title: "Why Consistency Beats Campaigns" },
  { year: "2026", cat: "Craft", title: "Design Is a Business Language" },
];

export default function Insights() {
  return (
    <section id="insights" data-testid="insights-section" className="relative px-6 sm:px-10 py-32 sm:py-48">
      <div className="flex items-end justify-between mb-14 sm:mb-20">
        <div>
          <p className="font-mono-x text-[10px] tracking-[0.35em] uppercase text-[#ffd76a]/70 mb-4">
            ( Journal )
          </p>
          <h2 className="font-display font-semibold uppercase tracking-tight leading-none text-[clamp(2.4rem,6.5vw,5.5rem)]">
            Insights
          </h2>
        </div>
      </div>

      <div className="border-t border-white/10">
        {POSTS.map((p, i) => (
          <motion.a
            key={p.title}
            href="#insights"
            onClick={(e) => e.preventDefault()}
            data-testid={`insight-row-${i}`}
            data-cursor="open"
            data-cursor-label="READ"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="group flex items-baseline gap-5 sm:gap-10 border-b border-white/10 py-8 sm:py-11 px-2 sm:px-6"
          >
            <span className="font-mono-x text-xs text-white/30 shrink-0">{p.year}</span>
            <span className="hidden md:block font-mono-x text-[10px] tracking-[0.3em] uppercase text-[#ffd76a]/50 w-28 shrink-0">
              {p.cat}
            </span>
            <h3 className="font-display font-medium uppercase tracking-tight leading-tight text-[clamp(1.3rem,3.4vw,2.8rem)] text-white/70 group-hover:text-white group-hover:translate-x-4 transition-all duration-700 ease-out-expo">
              {p.title}
            </h3>
            <ArrowRight
              size={24}
              strokeWidth={1.25}
              className="ml-auto shrink-0 self-center text-white/20 group-hover:text-[#ffd76a] group-hover:translate-x-2 transition-all duration-500"
            />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
