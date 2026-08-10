import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useLang } from "@/i18n";

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const [show, setShow] = useState(false);
  const { t } = useLang();
  const audioRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.stop();
        audioRef.current.ctx.close().catch(() => {});
        audioRef.current = null;
      }
    };
  }, []);

  const build = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 380;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.1;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();

    const padGain = ctx.createGain();
    padGain.gain.value = 0.04;
    padGain.connect(master);
    [220, 220.7, 329.6].forEach((f) => {
      const o = ctx.createOscillator();
      o.type = "triangle";
      o.frequency.value = f;
      o.connect(padGain);
      o.start();
    });
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.015;
    lfo.connect(lfoGain);
    lfoGain.connect(padGain.gain);
    lfo.start();

    const scale = [880, 1046.5, 1174.7, 1318.5, 1568, 1760];
    let timer;
    const chime = () => {
      const f = scale[Math.floor(Math.random() * scale.length)] * (Math.random() < 0.3 ? 0.5 : 1);
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      const g = ctx.createGain();
      const t0 = ctx.currentTime;
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.04 + Math.random() * 0.05, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.4 + Math.random());
      o.connect(g);
      if (ctx.createStereoPanner) {
        const pan = ctx.createStereoPanner();
        pan.pan.value = Math.random() * 1.6 - 0.8;
        g.connect(pan);
        pan.connect(master);
      } else {
        g.connect(master);
      }
      o.start(t0);
      o.stop(t0 + 2.6);
      timer = setTimeout(chime, 500 + Math.random() * 1800);
    };
    chime();

    return { ctx, master, stop: () => clearTimeout(timer) };
  };

  const toggle = async () => {
    if (!on) {
      if (!audioRef.current) audioRef.current = build();
      await audioRef.current.ctx.resume();
      const { master, ctx } = audioRef.current;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0.35, ctx.currentTime, 0.9);
      setOn(true);
    } else if (audioRef.current) {
      const { master, ctx } = audioRef.current;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
      setOn(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          data-testid="sound-toggle"
          data-cursor="link"
          onClick={toggle}
          aria-label={on ? t("sound.off") : t("sound.on")}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-6 right-6 z-[60] flex items-center gap-3"
        >
          <span className="hidden sm:block font-grotesk text-[10px] tracking-[0.22em] uppercase text-white/0 group-hover:text-white/70 transition-colors duration-500">
            {t("sound.tip")}
          </span>
          <span
            className={`relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full border transition-all duration-500 ${
              on
                ? "bg-[#ffd76a] text-[#050508] border-[#ffd76a] shadow-[0_0_30px_rgba(255,215,106,0.35)]"
                : "bg-white/[0.03] text-white/60 border-white/20 hover:border-[#ffd76a]/60 hover:text-[#ffd76a]"
            }`}
          >
            {on && (
              <span className="absolute inset-0 rounded-full border border-[#ffd76a]/50 animate-ping [animation-duration:2.5s]" />
            )}
            {on ? (
              <Volume2 size={20} strokeWidth={1.75} className="relative" />
            ) : (
              <VolumeX size={20} strokeWidth={1.75} className="relative" />
            )}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
