import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Bookmark, Star, Play } from "lucide-react";
import dreamPoster from "@/assets/poster-placeholder.jpg";
import heroPoster from "@/assets/poster-heroverse.jpg";
import type { Movie } from "@/data/movies";
import { movieUniverse } from "@/data/movies";
import { useLibrary } from "@/lib/library-context";

type Props = {
  movie: Movie;
  className?: string;
  showProgress?: boolean | undefined;
};

export function MovieCard({ movie, className = "", showProgress = false }: Props) {
  const { toggleFavorite, toggleWatchlist, isFavorite, inWatchlist } = useLibrary();
  const fav = isFavorite(movie.id);
  const saved = inWatchlist(movie.id);
  const hero = movieUniverse(movie) === "heroverse";
  const poster = hero ? heroPoster : dreamPoster;

  return (
    <motion.article
      whileHover={{ y: -8, scale: hero ? 1.03 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group relative overflow-hidden rounded-3xl glass-panel ${
        hero ? "transition-shadow hover:hero-glow" : ""
      } ${className}`}
    >
      <Link to="/movie/$movieId" params={{ movieId: movie.id }} className="block">
        <div className="relative aspect-2/3 overflow-hidden rounded-3xl">
          <img
            src={poster}
            alt={`${movie.title} poster`}
            loading="lazy"
            width={640}
            height={960}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{
              filter: hero
                ? `hue-rotate(${Number(movie.tint) - 210}deg) saturate(1.15) contrast(1.05)`
                : `hue-rotate(${Number(movie.tint) - 340}deg) saturate(1.1)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: hero
                ? "linear-gradient(to top, rgba(8,11,22,0.92) 0%, rgba(8,11,22,0.25) 45%, transparent 70%)"
                : "linear-gradient(to top, oklch(0.3 0.06 340 / 72%) 0%, transparent 55%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="font-display text-lg leading-tight text-white">{movie.title}</h3>
            <p className="mt-1 flex items-center gap-2 text-xs text-white/80">
              <Star className="h-3 w-3 fill-current" />
              {movie.rating.toFixed(1)} · {movie.year} · {movie.genres[0]}
            </p>
            {hero ? (
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Play className="h-3 w-3" /> Play trailer
              </span>
            ) : null}
            {showProgress && movie.progress ? (
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${movie.progress}%` }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
        <button
          type="button"
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={fav}
          onClick={() => toggleFavorite(movie.id)}
          className="grid h-9 w-9 place-items-center rounded-full glass-panel text-primary transition hover:scale-110"
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
        </button>
        <button
          type="button"
          aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
          aria-pressed={saved}
          onClick={() => toggleWatchlist(movie.id)}
          className="grid h-9 w-9 place-items-center rounded-full glass-panel text-primary transition hover:scale-110"
        >
          <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        </button>
      </div>
    </motion.article>
  );
}
