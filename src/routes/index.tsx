import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sparkles as SparkleIcon, ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-dreamverse.jpg";
import portalImage from "@/assets/dreamverse-portal.jpg";
import heroverseImage from "@/assets/heroverse-preview.jpg";
import { Sparkles } from "@/components/Sparkles";
import { MovieCard } from "@/components/MovieCard";
import { collections, moviesByCategory } from "@/data/movies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CineVerse — Discover Movies Across Cinematic Universes" },
      {
        name: "description",
        content:
          "CineVerse is a multi-universe movie discovery platform. Step into DreamVerse for pastel worlds, dreamy romances and gentle fantasies.",
      },
      { property: "og:title", content: "CineVerse — Discover Movies Across Cinematic Universes" },
      {
        property: "og:description",
        content: "Step into DreamVerse: pastel worlds, dreamy romances and gentle fantasies.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const trending = moviesByCategory("Trending Now");

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <span className="flex items-center gap-2">
          <SparkleIcon className="h-5 w-5 text-primary" />
          <span className="font-display text-2xl font-semibold text-gradient">CineVerse</span>
        </span>
        <nav className="flex items-center gap-2 text-sm">
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-muted-foreground transition hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90"
          >
            Get started
          </Link>
        </nav>
      </header>

      <section className="relative mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] glass-panel">
          <img
            src={heroImage}
            alt="Dreamy pastel clouds"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <Sparkles />
          <div className="relative px-6 py-20 sm:px-14 sm:py-28">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl text-5xl leading-[1.05] font-semibold sm:text-7xl"
            >
              Every story has its <span className="text-gradient">own universe</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-lg text-muted-foreground"
            >
              CineVerse curates cinema into worlds you can step inside. Begin with DreamVerse — soft
              light, slow romance and pastel fantasy.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                to="/universe"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
              >
                <Play className="h-4 w-4" /> Enter a universe
              </Link>
              <Link
                to="/dreamverse"
                className="inline-flex items-center gap-2 rounded-full glass-panel px-6 py-3 font-medium text-foreground transition hover:scale-[1.02]"
              >
                Browse DreamVerse <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 py-16">
        <div>
          <h2 className="text-3xl font-semibold">Featured collections</h2>
          <p className="mt-2 text-muted-foreground">Hand-picked moods, refreshed every week.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="hover-lift relative overflow-hidden rounded-3xl glass-panel p-6"
            >
              <Sparkles />
              <h3 className="font-display text-2xl">{c.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
              <p className="mt-6 text-xs uppercase tracking-widest text-primary">
                {c.count} titles
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 pb-16">
        <h2 className="text-3xl font-semibold">Trending in DreamVerse</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {trending.slice(0, 5).map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem] glass-panel p-8">
            <img
              src={portalImage}
              alt="DreamVerse portal"
              loading="lazy"
              width={1024}
              height={640}
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            <div className="relative">
              <p className="text-xs uppercase tracking-widest text-primary">Universe 01</p>
              <h3 className="mt-2 font-display text-4xl">DreamVerse</h3>
              <p className="mt-3 max-w-sm text-muted-foreground">
                Pastel worlds, luminous romance and quiet wonder. Open now.
              </p>
              <Link
                to="/universe"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Choose universe <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] glass-panel p-8">
            <img
              src={heroverseImage}
              alt="HeroVerse teaser"
              loading="lazy"
              width={1024}
              height={640}
              className="absolute inset-0 h-full w-full object-cover opacity-35"
            />
            <div className="relative">
              <p className="text-xs uppercase tracking-widest text-primary">Universe 02</p>
              <h3 className="mt-2 font-display text-4xl">HeroVerse</h3>
              <p className="mt-3 max-w-sm text-muted-foreground">
                Epic sagas and legendary heroes. The portal opens in a future release.
              </p>
              <span className="mt-6 inline-flex rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground">
                Coming soon
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
