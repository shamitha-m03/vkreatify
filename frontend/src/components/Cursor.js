import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [variant, setVariant] = useState("default");
  const [label, setLabel] = useState("");
  const [fine, setFine] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    if (!mq.matches) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el) {
        setVariant(el.dataset.cursor);
        setLabel(el.dataset.cursorLabel || "");
      } else {
        setVariant("default");
        setLabel("");
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!fine) return null;

  const isOrb = variant === "orb";
  const active = variant !== "default" && !isOrb;

  return (
    <>
      <motion.div
        data-testid="cursor-dot"
        className="fixed top-0 left-0 z-[110] pointer-events-none w-[7px] h-[7px] rounded-full bg-[#ffd76a]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        data-testid="cursor-ring"
        className="fixed top-0 left-0 z-[105] pointer-events-none flex items-center justify-center rounded-full"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isOrb ? 90 : active ? 72 : 34,
          height: isOrb ? 90 : active ? 72 : 34,
          opacity: isOrb ? 0.55 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isOrb
              ? "bg-[radial-gradient(circle,rgba(255,215,106,0.35),transparent_70%)] blur-md"
              : active
                ? "border border-[#ffd76a]/70 bg-[#ffd76a]/5 backdrop-blur-[2px]"
                : "border border-white/30"
          }`}
        />
        {active && label && (
          <span className="relative font-mono-x text-[9px] tracking-[0.25em] text-[#ffd76a]">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
