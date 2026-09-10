import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, ArrowRight, Zap } from "lucide-react";
import portalImage from "@/assets/dreamverse-portal.jpg";
import heroversePortal from "@/assets/heroverse-portal.jpg";
import { EnergyParticles } from "@/components/EnergyParticles";
import { Sparkles } from "@/components/Sparkles";
import { useUniverse } from "@/lib/universe-context";

export const Route = createFileRoute("/universe")({
  head: () => ({
    meta: [
      { title: "Choose your universe — CineVerse" },
      {
        name: "description",
        content:
          "Pick a cinematic universe on CineVerse: pastel DreamVerse or the epic, futuristic HeroVerse.",
      },
      { property: "og:title", content: "Choose your universe — CineVerse" },
      {
        property: "og:description",
        content: "DreamVerse or HeroVerse — your choice reshapes the whole experience.",
      },
    ],
  }),
  component: UniverseSelection,
});

function UniverseSelection() {
  const { setUniverse, preferred, travelTo, universe, transition } = useUniverse();
  const navigate = useNavigate();

  const choose = (id: "dreamverse" | "heroverse") => {
    if (universe.id === id) {
      setUniverse(id);
      navigate({ to: id === "heroverse" ? "/heroverse" : "/dreamverse" });
      return;
    }
    travelTo(id);
  };

  return (
    <div className="relative min-h-screen px-4 py-14">
      <Sparkles />
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="font-display text-xl font-semibold text-gradient">
          CineVerse
        </Link>
        <h1 className="mt-8 text-4xl font-semibold sm:text-5xl">Choose your universe</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Your choice is saved and shapes the whole experience — palette, motion and curation.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <motion.button
            type="button"
            whileHover={{ y: -8 }}
            disabled={transition.active}
            onClick={() => choose("dreamverse")}
            className="relative overflow-hidden rounded-[2rem] glass-panel p-8 text-left disabled:opacity-70"
          >
            <img
              src={portalImage}
              alt="DreamVerse portal"
              loading="lazy"
              width={1024}
              height={640}
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            <div className="relative">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Available now
              </span>
              <h2 className="mt-4 font-display text-4xl">DreamVerse</h2>
              <p className="mt-2 text-muted-foreground">
                Soft, luminous, endlessly romantic. Pastel fantasies and quiet dramas.
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary">
                {preferred === "dreamverse" ? (
                  <>
                    <Check className="h-4 w-4" /> Your universe
                  </>
                ) : (
                  <>
                    Enter DreamVerse <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </span>
            </div>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ y: -8 }}
            disabled={transition.active}
            onClick={() => choose("heroverse")}
            className="relative overflow-hidden rounded-[2rem] glass-panel p-8 text-left disabled:opacity-70"
          >
            <img
              src={heroversePortal}
              alt="HeroVerse portal"
              loading="lazy"
              width={1024}
              height={640}
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(8,11,22,0.9), rgba(8,11,22,0.35) 65%, transparent)",
              }}
            />
            <EnergyParticles />
            <div className="relative">
              <span className="rounded-full bg-[#00BFFF] px-3 py-1 text-xs font-medium text-[#05080F]">
                Now open
              </span>
              <h2 className="mt-4 font-display text-4xl text-white">HeroVerse</h2>
              <p className="mt-2 text-[#B6BDD0]">
                Bold, thunderous, larger than life. Cosmic sagas and legendary heroes.
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#00BFFF]">
                {preferred === "heroverse" ? (
                  <>
                    <Check className="h-4 w-4" /> Your universe
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" /> Open the portal
                  </>
                )}
              </span>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
