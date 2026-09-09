import { motion } from "motion/react";
import { Repeat } from "lucide-react";
import { otherUniverse, universes, useUniverse } from "@/lib/universe-context";

type Props = {
  className?: string;
  label?: string;
  showTarget?: boolean;
};

/** Triggers the cinematic portal animation into the other universe. */
export function SwitchUniverseButton({ className = "", label, showTarget = true }: Props) {
  const { universe, travelTo, transition } = useUniverse();
  const target = universes[otherUniverse(universe.id)];

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      disabled={transition.active}
      onClick={() => travelTo(target.id)}
      className={`inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_30px_-8px_var(--primary)] transition disabled:opacity-60 ${className}`}
    >
      <Repeat className="h-4 w-4" />
      {label ?? "Switch universe"}
      {showTarget ? <span className="opacity-80">→ {target.name}</span> : null}
    </motion.button>
  );
}
