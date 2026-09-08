import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Play, Info } from "lucide-react";
import heroImage from "@/assets/hero-dreamverse.jpg";
import { AppShell } from "@/components/AppShell";
import { MovieCard } from "@/components/MovieCard";
import { MovieRow } from "@/components/MovieRow";
import { Sparkles } from "@/components/Sparkles";
import { categories, collections, movies, moviesByCategory, searchMovies } from "@/data/movies";

type DreamSearch = { q?: string };

export const Route = createFileRoute("/dreamverse")({
  validateSearch: (search: Record<string, unknown>): DreamSearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "DreamVerse — Pastel Cinema on CineVerse" },
      {
        name: "description",
        content:
          "Browse DreamVerse: trending titles, dreamy romances, pastel fantasies and gentle dramas.",
      },
      { property: "og:title", content: "DreamVerse — Pastel Cinema on CineVerse" },
      {
        property: "og:description",
        content: "Trending titles, dreamy romances and pastel fantasies.",
      },
    ],
  }),
  component: DreamVerseHome,
});

function DreamVerseHome() {
  const { q } = Route.useSearch();
  const featured = movies[11];
  const continueWatching = movies.filter((m) => m.progress);
  const recommended = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const results = q ? searchMovies(q) : [];

  if (q) {
    return (
      <AppShell>
        <h1 className="text-3xl font-semibold">
          Results for <span className="text-gradient">“{q}”</span>
        </h1>
        {results.length === 0 ? (
          <p className="mt-4 text-muted-foreground">
            Nothing found. Try a genre like “Romance” or “Fantasy”.
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
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2.5rem] glass-panel"
      >
        <img
          src={heroImage}
          alt="Featured film backdrop"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <Sparkles />
        <div className="relative max-w-xl px-6 py-16 sm:px-12 sm:py-24">
          <p className="text-xs uppercase tracking-widest text-primary">Featured this week</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-6xl">{featured.title}</h1>
          <p className="mt-4 text-muted-foreground">{featured.synopsis}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {featured.year} · {featured.duration} · ★ {featured.rating.toFixed(1)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/movie/$movieId"
              params={{ movieId: featured.id }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Play className="h-4 w-4" /> Play
            </Link>
            <Link
              to="/movie/$movieId"
              params={{ movieId: featured.id }}
              className="inline-flex items-center gap-2 rounded-full glass-panel px-6 py-3 font-medium transition hover:scale-[1.02]"
            >
              <Info className="h-4 w-4" /> More info
            </Link>
          </div>
        </div>
      </motion.section>

      <div className="mt-14 space-y-12">
        <MovieRow title="Continue watching" movies={continueWatching} showProgress />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Collections</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((c) => (
              <div key={c.id} className="hover-lift relative overflow-hidden rounded-3xl glass-panel p-6">
                <Sparkles />
                <h3 className="font-display text-2xl">{c.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
                <p className="mt-5 text-xs uppercase tracking-widest text-primary">
                  {c.count} titles
                </p>
              </div>
            ))}
          </div>
        </section>

        <MovieRow title="Recommended for you" movies={recommended} />

        {categories.map((cat) => (
          <MovieRow key={cat} title={cat} movies={moviesByCategory(cat)} />
        ))}
      </div>
    </AppShell>
  );
}
