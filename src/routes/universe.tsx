import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, Lock, ArrowRight } from "lucide-react";
import portalImage from "@/assets/dreamverse-portal.jpg";
import heroverseImage from "@/assets/heroverse-preview.jpg";
import { Sparkles } from "@/components/Sparkles";
import { useUniverse } from "@/lib/universe-context";

export const Route = createFileRoute("/universe")({
  head: () => ({
    meta: [
      { title: "Choose your universe — CineVerse" },
      {
        name: "description",
        content: "Pick a cinematic universe. DreamVerse is open now; HeroVerse is coming soon.",
      },
      { property: "og:title", content: "Choose your universe — CineVerse" },
      {
        property: "og:description",
        content: "DreamVerse is open now; HeroVerse is coming soon.",
      },
    ],
  }),
  component: UniverseSelection,
});

function UniverseSelection() {
  const { setUniverse, preferred } = useUniverse();
  const navigate = useNavigate();

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
            onClick={() => {
              setUniverse("dreamverse");
              navigate({ to: "/dreamverse" });
            }}
            className="relative overflow-hidden rounded-[2rem] glass-panel p-8 text-left"
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

          <div className="relative overflow-hidden rounded-[2rem] glass-panel p-8 opacity-90">
            <img
              src={heroverseImage}
              alt="HeroVerse preview"
              loading="lazy"
              width={1024}
              height={640}
              className="absolute inset-0 h-full w-full object-cover opacity-35"
            />
            <div className="relative">
              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                Coming soon
              </span>
              <h2 className="mt-4 font-display text-4xl">HeroVerse</h2>
              <p className="mt-2 text-muted-foreground">
                Bold, thunderous, larger than life. Epic sagas and legendary heroes.
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" /> Portal sealed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
