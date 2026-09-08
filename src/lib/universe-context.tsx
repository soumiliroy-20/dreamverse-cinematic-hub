import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type UniverseId = "dreamverse" | "heroverse";

export type UniverseTheme = {
  id: UniverseId;
  name: string;
  tagline: string;
  description: string;
  available: boolean;
  /** Matches the [data-universe] selector in styles.css */
  themeAttribute: UniverseId;
};

export const universes: Record<UniverseId, UniverseTheme> = {
  dreamverse: {
    id: "dreamverse",
    name: "DreamVerse",
    tagline: "Soft, luminous, endlessly romantic.",
    description:
      "Pastel worlds, slow-burn romances and gentle fantasies — curated for dreamers.",
    available: true,
    themeAttribute: "dreamverse",
  },
  heroverse: {
    id: "heroverse",
    name: "HeroVerse",
    tagline: "Bold, thunderous, larger than life.",
    description: "Epic sagas and legendary heroes. Arriving in a future release.",
    available: false,
    themeAttribute: "heroverse",
  },
};

type UniverseContextValue = {
  universe: UniverseTheme;
  universeList: UniverseTheme[];
  setUniverse: (id: UniverseId) => void;
  preferred: UniverseId | null;
};

const UniverseContext = createContext<UniverseContextValue | null>(null);
const STORAGE_KEY = "cineverse.universe";

export function UniverseProvider({ children }: { children: ReactNode }) {
  const [preferred, setPreferred] = useState<UniverseId | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as UniverseId | null;
    if (stored && stored in universes) setPreferred(stored);
  }, []);

  const active: UniverseId = preferred && universes[preferred].available ? preferred : "dreamverse";

  useEffect(() => {
    document.documentElement.setAttribute("data-universe", active);
  }, [active]);

  const value = useMemo<UniverseContextValue>(
    () => ({
      universe: universes[active],
      universeList: Object.values(universes),
      preferred,
      setUniverse: (id) => {
        setPreferred(id);
        localStorage.setItem(STORAGE_KEY, id);
      },
    }),
    [active, preferred],
  );

  return <UniverseContext.Provider value={value}>{children}</UniverseContext.Provider>;
}

export function useUniverse() {
  const ctx = useContext(UniverseContext);
  if (!ctx) throw new Error("useUniverse must be used inside UniverseProvider");
  return ctx;
}
