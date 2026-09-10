const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 17 + 5) % 100,
  bottom: (i * 29) % 60,
  size: 3 + ((i * 5) % 6),
  delay: `${(i % 9) * 0.7}s`,
  color: i % 3 === 0 ? "#FFD700" : "#00BFFF",
}));

/** Floating energy motes for HeroVerse surfaces. */
export function EnergyParticles({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="animate-energy-drift absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 14px 3px ${p.color}`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
