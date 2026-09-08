const SPARKLES = [
  { top: "12%", left: "8%", size: 8, delay: "0s" },
  { top: "24%", left: "82%", size: 6, delay: "0.6s" },
  { top: "62%", left: "18%", size: 5, delay: "1.2s" },
  { top: "78%", left: "68%", size: 9, delay: "0.3s" },
  { top: "40%", left: "48%", size: 4, delay: "1.8s" },
  { top: "8%", left: "58%", size: 5, delay: "2.4s" },
  { top: "86%", left: "34%", size: 6, delay: "1.5s" },
  { top: "52%", left: "92%", size: 7, delay: "0.9s" },
];

export function Sparkles({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="animate-sparkle absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            boxShadow: "0 0 12px 3px oklch(1 0 0 / 70%)",
          }}
        />
      ))}
    </div>
  );
}
