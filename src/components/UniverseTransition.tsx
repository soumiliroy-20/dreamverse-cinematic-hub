import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import { universes, useUniverse } from "@/lib/universe-context";

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 4 + ((i * 7) % 8),
  delay: (i % 10) * 0.05,
}));

const WAVES = [0, 1, 2, 3];

/**
 * The signature CineVerse portal sequence.
 * ~2.6s: particles dissolve, world darkens, portal opens,
 * energy waves fire, the destination logo emerges, page swaps behind it.
 */
export function UniverseTransition() {
  const { transition, commitTravel, endTravel } = useUniverse();
  const navigate = useNavigate();

  useEffect(() => {
    if (!transition.active) return;
    const target = universes[transition.to];

    const t1 = window.setTimeout(() => {
      commitTravel();
      void navigate({ to: target.home });
    }, 1250);
    const t2 = window.setTimeout(() => endTravel(), 2700);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [transition.active, transition.to, commitTravel, endTravel, navigate]);

  const toHero = transition.to === "heroverse";
  const fromName = universes[transition.from].name;
  const toName = universes[transition.to].name;
  const energy = toHero ? "#00BFFF" : "#FF69B4";
  const spark = toHero ? "#FFD700" : "#FFFFFF";
  const veil = toHero ? "#080B16" : "#FDF3F8";

  return (
    <AnimatePresence>
      {transition.active ? (
        <motion.div
          key="universe-portal"
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          aria-live="polite"
          role="status"
        >
          {/* 1–2. Old world dissolves and darkens */}
          <motion.div
            className="absolute inset-0"
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: veil }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />

          {PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                background: transition.from === "heroverse" ? "#00BFFF" : "#FF9CC8",
                boxShadow: `0 0 16px 4px ${transition.from === "heroverse" ? "#00BFFF" : "#FF9CC8"}`,
              }}
              initial={{ opacity: 0.9, scale: 1, y: 0 }}
              animate={{ opacity: 0, scale: 0, y: -60 }}
              transition={{ duration: 0.9, delay: p.delay, ease: "easeIn" }}
            />
          ))}

          {/* 3. Departing logo fades */}
          <motion.p
            className="absolute font-display text-4xl tracking-wide sm:text-6xl"
            style={{ color: transition.from === "heroverse" ? "#D9D9D9" : "#E7A7C6" }}
            initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            animate={{ opacity: 0, scale: 1.35, filter: "blur(14px)" }}
            transition={{ duration: 0.8, ease: "easeIn" }}
          >
            {fromName}
          </motion.p>

          {/* 4. Portal opens */}
          <motion.div
            className="absolute rounded-full"
            style={{
              border: `2px solid ${energy}`,
              boxShadow: `0 0 90px 20px ${energy}, inset 0 0 70px 10px ${energy}`,
            }}
            initial={{ width: 0, height: 0, opacity: 0, rotate: 0 }}
            animate={{
              width: [0, 420, 520, 2200],
              height: [0, 420, 520, 2200],
              opacity: [0, 1, 1, 0],
              rotate: [0, 90, 180, 320],
            }}
            transition={{ duration: 2.4, times: [0, 0.35, 0.62, 1], ease: "easeInOut" }}
          />

          {/* 5. Energy waves */}
          {WAVES.map((w) => (
            <motion.div
              key={w}
              className="absolute rounded-full"
              style={{ border: `1px solid ${w % 2 ? spark : energy}` }}
              initial={{ width: 80, height: 80, opacity: 0 }}
              animate={{ width: 1600, height: 1600, opacity: [0, 0.75, 0] }}
              transition={{ duration: 1.5, delay: 0.55 + w * 0.18, ease: "easeOut" }}
            />
          ))}

          {/* 6. Destination logo emerges */}
          <motion.div
            className="relative text-center"
            initial={{ opacity: 0, scale: 0.7, filter: "blur(18px)" }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.7, 1, 1.04, 1.25], filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 1, times: [0, 0.25, 0.7, 1] }}
          >
            <p
              className="text-xs uppercase tracking-[0.6em]"
              style={{ color: toHero ? "#B6BDD0" : "#C98AAE" }}
            >
              Entering
            </p>
            <p
              className="mt-3 font-display text-5xl font-semibold sm:text-8xl"
              style={{
                color: toHero ? "#FFFFFF" : "#7A2E55",
                textShadow: `0 0 40px ${energy}`,
              }}
            >
              {toName}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
