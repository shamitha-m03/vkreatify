import { Asterisk } from "lucide-react";
import { useLang } from "@/i18n";

export default function Marquee() {
  const { t } = useLang();
  const ITEMS = t("marquee.items") || [];
  const row = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div
      data-testid="marquee-section"
      className="relative border-y border-white/10 py-6 sm:py-8 overflow-hidden select-none"
    >
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center shrink-0">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span
                  className={`font-display uppercase tracking-tight text-[clamp(1.4rem,3.4vw,2.8rem)] px-6 ${
                    item.includes("Braaaand") ? "text-stroke-gold font-semibold" : "text-white/35 font-medium"
                  }`}
                >
                  {item}
                </span>
                <Asterisk size={20} className="text-[#ffd76a]/50 shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
