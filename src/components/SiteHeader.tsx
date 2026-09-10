import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Search, Sparkles as SparkleIcon, Zap, Heart, Bookmark, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useUniverse } from "@/lib/universe-context";

const links = [
  { to: "/watchlist", label: "Watchlist", icon: Bookmark },
  { to: "/favorites", label: "Favorites", icon: Heart },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function SiteHeader() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { universe } = useUniverse();
  const hero = universe.id === "heroverse";

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const search = query ? { q: query } : {};
    if (hero) navigate({ to: "/heroverse", search });
    else navigate({ to: "/dreamverse", search });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-glass-border/60 glass-panel">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:gap-6">
        <Link to="/" className="flex items-center gap-2">
          {hero ? (
            <Zap className="h-5 w-5 text-primary" />
          ) : (
            <SparkleIcon className="h-5 w-5 text-primary" />
          )}
          <span className="font-display text-xl font-semibold text-gradient">CineVerse</span>
        </Link>

        <span className="hidden rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground sm:inline">
          {universe.name}
        </span>

        <form onSubmit={onSubmit} className="order-last w-full sm:order-none sm:ml-auto sm:w-64">
          <label className="relative block">
            <span className="sr-only">Search movies</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={hero ? "Search heroes, sagas…" : "Search titles, genres…"}
              className="w-full rounded-full border border-glass-border bg-card/70 py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        </form>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            to={hero ? "/heroverse" : "/dreamverse"}
            activeProps={{ className: "bg-secondary text-secondary-foreground" }}
            className="rounded-full px-3 py-2 text-muted-foreground transition hover:bg-secondary/70 hover:text-foreground"
          >
            Home
          </Link>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              className="rounded-full px-3 py-2 text-muted-foreground transition hover:bg-secondary/70 hover:text-foreground"
            >
              <l.icon className="h-4 w-4 sm:hidden" />
              <span className="hidden sm:inline">{l.label}</span>
            </Link>
          ))}
          {!user ? (
            <Link
              to="/login"
              className="ml-1 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Sign in
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
