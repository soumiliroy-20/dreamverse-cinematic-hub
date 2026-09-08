import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type LibraryContextValue = {
  watchlist: string[];
  favorites: string[];
  toggleWatchlist: (id: string) => void;
  toggleFavorite: (id: string) => void;
  inWatchlist: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
};

const LibraryContext = createContext<LibraryContextValue | null>(null);
const KEY = "cineverse.library";

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { watchlist?: string[]; favorites?: string[] };
        setWatchlist(parsed.watchlist ?? []);
        setFavorites(parsed.favorites ?? []);
      } catch {
        localStorage.removeItem(KEY);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ watchlist, favorites }));
  }, [watchlist, favorites, hydrated]);

  const value = useMemo<LibraryContextValue>(() => {
    const toggle = (setter: typeof setWatchlist) => (id: string) =>
      setter((list) => (list.includes(id) ? list.filter((x) => x !== id) : [id, ...list]));
    return {
      watchlist,
      favorites,
      toggleWatchlist: toggle(setWatchlist),
      toggleFavorite: toggle(setFavorites),
      inWatchlist: (id) => watchlist.includes(id),
      isFavorite: (id) => favorites.includes(id),
    };
  }, [watchlist, favorites]);

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used inside LibraryProvider");
  return ctx;
}
