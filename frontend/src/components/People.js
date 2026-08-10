import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const PEOPLE = [
  {
    name: "Ramesh Babu Pemmasani",
    role: "Director",
    img: "https://images.unsplash.com/photo-1764545973653-94c40d993495?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc4NjE5NDU3OXww&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Mohankumar Naveenkumar",
    role: "Director",
    img: "https://images.unsplash.com/photo-1770894807442-108cc33c0a7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc4NjE5NDU3OXww&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Kamesh",
    role: "Director",
    img: "https://images.unsplash.com/photo-1758600587730-a11917c13b85?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc4NjE5NDU3OXww&ixlib=rb-4.1.0&q=85",
  },
];

export default function People() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 180, damping: 22, mass: 0.5 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section
      id="people"
      data-testid="people-section"
      ref={ref}
      onMouseMove={onMove}
      className="relative px-6 sm:px-10 py-32 sm:py-48"
    >
      <p className="font-mono-x text-[10px] tracking-[0.35em] uppercase text-[#ffd76a]/70 mb-4">
        ( The People )
      </p>
      <h2 className="font-display font-semibold uppercase tracking-tight leading-none text-[clamp(2.4rem,6.5vw,5.5rem)] mb-16 sm:mb-24">
        Leadership
      </h2>

      <div className="border-t border-white/10 relative">
        {PEOPLE.map((p, i) => (
          <motion.div
            key={p.name}
            data-testid={`people-row-${i}`}
            data-cursor="open"
            data-cursor-label="OPEN"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="group border-b border-white/10 py-8 sm:py-12 px-2 sm:px-6 flex items-baseline gap-6 sm:gap-12"
          >
            <span className="font-mono-x text-xs text-white/30 group-hover:text-[#ffd76a] transition-colors duration-500">
              0{i + 1}
            </span>
            <h3 className="font-display font-medium uppercase tracking-tight leading-none text-[clamp(1.4rem,4vw,3.4rem)] text-white/70 group-hover:text-white group-hover:translate-x-4 transition-all duration-700 ease-out-expo">
              {p.name}
            </h3>
            <span className="ml-auto font-grotesk text-[11px] tracking-[0.25em] uppercase text-white/30 group-hover:text-white/70 transition-colors duration-500">
              {p.role}
            </span>
          </motion.div>
        ))}

        <AnimatePresence>
          {active !== null && (
            <motion.div
              data-testid="people-preview"
              className="pointer-events-none absolute z-20 hidden md:block w-[16rem] h-[20rem] overflow-hidden rounded-lg"
              style={{ left: sx, top: sy, translateX: "-50%", translateY: "-55%" }}
              initial={{ opacity: 0, scale: 0.7, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.75, filter: "blur(10px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={PEOPLE[active].img}
                alt={PEOPLE[active].name}
                className="w-full h-full object-cover grayscale contrast-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#ffd76a]/10 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/50 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
