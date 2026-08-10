import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLang } from "@/i18n";

const NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER || "919999999999";

export default function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = `https://wa.me/${NUMBER}?text=${encodeURIComponent(t("whatsapp.msg"))}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          data-testid="whatsapp-float"
          data-cursor="link"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("whatsapp.tip")}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-6 left-6 z-[60] flex items-center gap-3"
        >
          <span className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#ffd76a] text-[#050508] shadow-[0_0_30px_rgba(255,215,106,0.35)]">
            <span className="absolute inset-0 rounded-full border border-[#ffd76a]/50 animate-ping [animation-duration:2.5s]" />
            <MessageCircle size={22} strokeWidth={1.75} className="relative" />
          </span>
          <span className="hidden sm:block font-grotesk text-[10px] tracking-[0.22em] uppercase text-white/0 group-hover:text-white/70 transition-colors duration-500">
            {t("whatsapp.tip")}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
