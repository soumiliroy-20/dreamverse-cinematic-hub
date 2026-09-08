import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Play, Heart, Bookmark, Star } from "lucide-react";
import poster from "@/assets/poster-placeholder.jpg";
import heroImage from "@/assets/hero-dreamverse.jpg";
import { AppShell } from "@/components/AppShell";
import { MovieRow } from "@/components/MovieRow";
import { Sparkles } from "@/components/Sparkles";
import { getMovie, movies } from "@/data/movies";
import { useLibrary } from "@/lib/library-context";

export const Route = createFileRoute("/movie/$movieId")({
  loader: ({ params }) => {
    const movie = getMovie(params.movieId);
    if (!movie) throw notFound();
    return { movie };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Title unavailable — CineVerse" }, { name: "robots", content: "noindex" }] };
    }
    const { movie } = loaderData;
    return {
      meta: [
        { title: `${movie.title} (${movie.year}) — CineVerse` },
        { name: "description", content: movie.synopsis },
        { property: "og:title", content: `${movie.title} (${movie.year}) — CineVerse` },
        { property: "og:description", content: movie.synopsis },
      ],
    };
  },
  component: MovieDetails,
});

function MovieDetails() {
  const { movie } = Route.useLoaderData();
  const { toggleFavorite, toggleWatchlist, isFavorite, inWatchlist } = useLibrary();
  const similar = movies.filter(
    (m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g)),
  );

  return (
    <AppShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2.5rem] glass-panel"
      >
        <img
          src={heroImage}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <Sparkles />
        <div className="relative grid gap-8 p-6 sm:p-10 md:grid-cols-[260px_1fr]">
          <img
            src={poster}
            alt={`${movie.title} poster`}
            width={640}
            height={960}
            className="w-full max-w-64 rounded-3xl object-cover shadow-lg"
            style={{ filter: `hue-rotate(${Number(movie.tint) - 340}deg) saturate(1.1)` }}
          />
          <div>
            <p className="text-xs uppercase tracking-widest text-primary">
              {movie.genres.join(" · ")}
            </p>
            <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">{movie.title}</h1>
            <p className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-primary" /> {movie.rating.toFixed(1)}
              </span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
            </p>
            <p className="mt-5 max-w-2xl text-foreground/80">{movie.synopsis}</p>
            <dl className="mt-6 space-y-1 text-sm text-muted-foreground">
              <div>
                <dt className="inline font-medium text-foreground">Director: </dt>
                <dd className="inline">{movie.director}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">Cast: </dt>
                <dd className="inline">{movie.cast.join(", ")}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90">
                <Play className="h-4 w-4" /> Play
              </button>
              <button
                onClick={() => toggleWatchlist(movie.id)}
                aria-pressed={inWatchlist(movie.id)}
                className="inline-flex items-center gap-2 rounded-full glass-panel px-6 py-3 font-medium transition hover:scale-[1.02]"
              >
                <Bookmark className={`h-4 w-4 ${inWatchlist(movie.id) ? "fill-current" : ""}`} />
                {inWatchlist(movie.id) ? "In watchlist" : "Add to watchlist"}
              </button>
              <button
                onClick={() => toggleFavorite(movie.id)}
                aria-pressed={isFavorite(movie.id)}
                className="inline-flex items-center gap-2 rounded-full glass-panel px-6 py-3 font-medium transition hover:scale-[1.02]"
              >
                <Heart className={`h-4 w-4 ${isFavorite(movie.id) ? "fill-current" : ""}`} />
                {isFavorite(movie.id) ? "Favorited" : "Favorite"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-14">
        <MovieRow title="More like this" movies={similar} />
      </div>

      <Link
        to="/dreamverse"
        className="mt-10 inline-block text-sm text-primary underline-offset-4 hover:underline"
      >
        ← Back to DreamVerse
      </Link>
    </AppShell>
  );
}
