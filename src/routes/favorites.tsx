import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MovieCard } from "@/components/MovieCard";
import { allMovies } from "@/data/movies";
import { useLibrary } from "@/lib/library-context";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Your Favorites — CineVerse" },
      { name: "description", content: "The DreamVerse films you loved most, kept close." },
      { property: "og:title", content: "Your Favorites — CineVerse" },
      { property: "og:description", content: "The DreamVerse films you loved most." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites } = useLibrary();
  const loved = allMovies.filter((m) => favorites.includes(m.id));

  return (
    <AppShell>
      <h1 className="flex items-center gap-3 text-4xl font-semibold">
        <Heart className="h-7 w-7 text-primary" /> Favorites
      </h1>
      <p className="mt-2 text-muted-foreground">The ones that stayed with you.</p>

      {loved.length === 0 ? (
        <div className="mt-10 rounded-3xl glass-panel p-10 text-center">
          <p className="text-muted-foreground">No favorites yet — tap the heart on any card.</p>
          <Link
            to="/dreamverse"
            className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Find something to love
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {loved.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
