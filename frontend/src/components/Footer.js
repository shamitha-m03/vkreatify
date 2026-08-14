import { ArrowUp } from "lucide-react";
import { useLang } from "@/i18n";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer data-testid="footer-section" className="relative px-6 sm:px-10 pt-24 pb-10 border-t border-white/10">
      <div className="flex flex-col sm:flex-row justify-between gap-10 mb-20">
        <div className="space-y-3 font-mono-x text-[10px] tracking-[0.2em] uppercase text-white leading-loose">
          <p>© 2026 Vkreatify Digital Solutions Private Limited</p>
          <p>CIN: U62090TZ2026PTC038392 — RoC Coimbatore</p>
          <p>Coimbatore, Tamil Nadu, India</p>
        </div>
        <button
          data-testid="footer-back-to-top"
          data-cursor="link"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group self-start sm:self-auto flex items-center gap-3 font-grotesk text-[11px] tracking-[0.25em] uppercase text-white hover:text-white transition-colors duration-500"
        >
          {t("footer.back")}
          <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#ffd76a]/60 group-hover:-translate-y-1 transition-all duration-500">
            <ArrowUp size={14} strokeWidth={1.5} />
          </span>
        </button>
      </div>

      <h2
        data-testid="footer-wordmark"
        className="font-display font-bold uppercase text-center leading-none tracking-tight text-[clamp(3.5rem,14vw,13rem)] text-stroke select-none"
      >
        vKreatify
      </h2>
    </footer>
  );
}
