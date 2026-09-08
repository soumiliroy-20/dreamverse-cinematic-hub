import { motion } from "motion/react";
import type { Movie } from "@/data/movies";
import { MovieCard } from "./MovieCard";

type Props = {
  title: string;
  movies: Movie[];
  showProgress?: boolean;
};

export function MovieRow({ title, movies, showProgress }: Props) {
  if (movies.length === 0) return null;
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h2 className="px-1 text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
      <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            showProgress={showProgress}
            className="w-40 shrink-0 snap-start sm:w-48 lg:w-56"
          />
        ))}
      </div>
    </motion.section>
  );
}
