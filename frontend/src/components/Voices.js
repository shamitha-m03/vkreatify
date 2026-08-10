import { Quote } from "lucide-react";
import { useLang } from "@/i18n";

export default function Voices() {
  const { t } = useLang();
  const v = t("voices");
  const items = v.items || [];
  const row = [...items, ...items];

  return (
    <section id="voices" data-testid="voices-section" className="relative py-32 sm:py-48 overflow-hidden">
      <div className="px-6 sm:px-10 mb-14 sm:mb-20">
        <p className="font-mono-x text-[10px] tracking-[0.35em] uppercase text-[#ffd76a]/70 mb-4">
          {v.label}
        </p>
        <div className="flex items-end justify-between gap-8">
          <h2 className="font-display font-semibold uppercase tracking-tight leading-none text-[clamp(2.4rem,6.5vw,5.5rem)]">
            {v.title}
          </h2>
          <p className="hidden md:block max-w-xs font-mono-x text-[10px] tracking-[0.15em] uppercase text-white/30 leading-relaxed text-right">
            {v.note}
          </p>
        </div>
      </div>

      <div className="marquee-hover relative border-y border-white/10 py-10 overflow-hidden select-none">
        <div className="animate-marquee-slow flex w-max">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0">
              {row.map((item, i) => (
                <div
                  key={`${half}-${i}`}
                  data-testid={`voice-card-${i % items.length}`}
                  className="w-[21rem] sm:w-[26rem] shrink-0 mx-4 border border-white/10 rounded-xl p-7 bg-white/[0.02] backdrop-blur-sm"
                >
                  <Quote size={18} strokeWidth={1.5} className="text-[#ffd76a]/60 mb-5" />
                  <p className="text-sm leading-relaxed text-white/70 min-h-[6.5rem]">
                    “{item.quote}”
                  </p>
                  <div className="mt-6 pt-5 border-t border-white/10 flex items-baseline justify-between gap-3">
                    <span className="font-grotesk text-xs tracking-[0.15em] uppercase text-white/55">
                      {item.name}
                    </span>
                    <span className="font-mono-x text-[10px] text-white/30 shrink-0">
                      {item.place} · (sample)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
