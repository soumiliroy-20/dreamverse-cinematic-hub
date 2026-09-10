import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MovieCard } from "@/components/MovieCard";
import { allMovies } from "@/data/movies";
import { useLibrary } from "@/lib/library-context";

export const Route = createFileRoute("/watchlist")({
  head: () => ({
    meta: [
      { title: "Your Watchlist — CineVerse" },
      { name: "description", content: "Every DreamVerse title you saved for later, in one place." },
      { property: "og:title", content: "Your Watchlist — CineVerse" },
      { property: "og:description", content: "Every DreamVerse title you saved for later." },
    ],
  }),
  component: WatchlistPage,
});

function WatchlistPage() {
  const { watchlist } = useLibrary();
  const saved = allMovies.filter((m) => watchlist.includes(m.id));

  return (
    <AppShell>
      <h1 className="flex items-center gap-3 text-4xl font-semibold">
        <Bookmark className="h-7 w-7 text-primary" /> Watchlist
      </h1>
      <p className="mt-2 text-muted-foreground">Saved for a softer evening.</p>

      {saved.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {saved.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </AppShell>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 rounded-3xl glass-panel p-10 text-center">
      <p className="text-muted-foreground">Your watchlist is still a blank page.</p>
      <Link
        to="/dreamverse"
        className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
      >
        Browse DreamVerse
      </Link>
    </div>
  );
}
