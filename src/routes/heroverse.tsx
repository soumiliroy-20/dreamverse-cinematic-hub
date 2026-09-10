import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Bookmark, Zap } from "lucide-react";
import heroImage from "@/assets/hero-heroverse.jpg";
import collectionArt from "@/assets/collection-heroverse.jpg";
import heroPortrait from "@/assets/hero-portrait.jpg";
import { AppShell } from "@/components/AppShell";
import { EnergyParticles } from "@/components/EnergyParticles";
import { MovieCard } from "@/components/MovieCard";
import { MovieRow } from "@/components/MovieRow";
import {
  heroCategories,
  heroCollections,
  heroMovies,
  heroes,
  moviesByCategory,
  searchMovies,
} from "@/data/movies";

type HeroSearch = { q?: string };

export const Route = createFileRoute("/heroverse")({
  validateSearch: (search: Record<string, unknown>): HeroSearch => {
    const raw = search["q"];
    return typeof raw === "string" && raw ? { q: raw } : {};
  },
  head: () => ({
    meta: [
      { title: "HeroVerse — Epic Cinema on CineVerse" },
      {
        name: "description",
        content:
          "Enter HeroVerse: cosmic sagas, futuristic cities and legendary heroes, streaming on CineVerse.",
      },
      { property: "og:title", content: "HeroVerse — Epic Cinema on CineVerse" },
      {
        property: "og:description",
        content: "Where legends rise, worlds collide, and heroes are born.",
      },
    ],
  }),
  component: HeroVerseHome,
});

function HeroVerseHome() {
  const { q } = Route.useSearch();
  const results = q ? searchMovies(q, "heroverse") : [];
  const continueWatching = heroMovies.filter((m) => m.progress);
  const trending = moviesByCategory("Trending Now", "heroverse");
  const recommended = [...heroMovies].sort((a, b) => b.rating - a.rating).slice(0, 8);

  if (q) {
    return (
      <AppShell>
        <h1 className="text-3xl font-semibold">
          Results for <span className="text-gradient">“{q}”</span>
        </h1>
        {results.length === 0 ? (
          <p className="mt-4 text-muted-foreground">
            No signal. Try a genre like “Action” or “Sci-Fi”.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {results.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        )}
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Cinematic hero banner */}
      <motion.section
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] border border-glass-border"
      >
        <img
          src={heroImage}
          alt="Futuristic skyline at the edge of a cosmic battle"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,11,22,0.95) 0%, rgba(8,11,22,0.7) 45%, rgba(8,11,22,0.25) 100%)",
          }}
        />
        <EnergyParticles />
        <div className="relative max-w-2xl px-6 py-20 sm:px-12 sm:py-32">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xs uppercase tracking-[0.4em] text-primary"
          >
            HeroVerse
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-6xl"
          >
            Welcome To HeroVerse
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-4 max-w-lg text-lg text-[#B6BDD0]"
          >
            Where legends rise, worlds collide, and heroes are born.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#featured-heroes"
              className="animate-energy-pulse inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <Zap className="h-4 w-4" /> Explore Heroes
            </a>
            <Link
              to="/watchlist"
              className="inline-flex items-center gap-2 rounded-full glass-panel px-6 py-3 font-semibold text-foreground transition hover:scale-[1.02]"
            >
              <Bookmark className="h-4 w-4" /> My Watchlist
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <div className="mt-14 space-y-14">
        {/* Featured collections */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Featured collections</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {heroCollections.map((c, i) => (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -10 }}
                className="group relative h-52 overflow-hidden rounded-3xl border border-glass-border transition-shadow hover:hero-glow"
              >
                <img
                  src={collectionArt}
                  alt=""
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  style={{ filter: `hue-rotate(${i * 28}deg) saturate(1.1)` }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(8,11,22,0.94), rgba(8,11,22,0.35) 60%, transparent)",
                  }}
                />
                <EnergyParticles className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <h3 className="font-display text-2xl text-white">{c.name}</h3>
                  <p className="mt-1 text-sm text-[#B6BDD0]">{c.blurb}</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-primary">
                    {c.count} titles
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <MovieRow title="Trending now" movies={trending} />

        <MovieRow title="Continue watching" movies={continueWatching} showProgress />

        {/* Featured heroes */}
        <section id="featured-heroes" className="space-y-6 scroll-mt-24">
          <h2 className="text-2xl font-semibold sm:text-3xl">Featured heroes</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {heroes.map((h, i) => (
              <motion.div
                key={h.id}
                whileHover={{ y: -10, rotateX: 6, rotateY: -6 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
                className="group text-center"
                style={{ perspective: 800 }}
              >
                <div className="animate-energy-pulse relative mx-auto h-28 w-28 overflow-hidden rounded-full border-2 border-primary/60 sm:h-32 sm:w-32">
                  <img
                    src={heroPortrait}
                    alt={`${h.name} portrait`}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ filter: `hue-rotate(${i * 40}deg) saturate(1.2)` }}
                  />
                </div>
                <h3 className="mt-4 font-display text-lg text-foreground">{h.name}</h3>
                <p className="text-xs uppercase tracking-widest text-primary">{h.alias}</p>
                <p className="mt-2 text-xs text-muted-foreground">{h.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <MovieRow title="Recommended for you" movies={recommended} />

        {heroCategories
          .filter((c) => c !== "Trending Now")
          .map((category) => (
            <MovieRow
              key={category}
              title={category}
              movies={moviesByCategory(category, "heroverse")}
            />
          ))}
      </div>
    </AppShell>
  );
}
