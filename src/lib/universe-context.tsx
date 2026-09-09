import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type UniverseId = "dreamverse" | "heroverse";

export type UniverseTheme = {
  id: UniverseId;
  name: string;
  tagline: string;
  description: string;
  available: boolean;
  /** Matches the [data-universe] selector in styles.css */
  themeAttribute: UniverseId;
  /** Home route for this universe */
  home: "/dreamverse" | "/heroverse";
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
    home: "/dreamverse",
  },
  heroverse: {
    id: "heroverse",
    name: "HeroVerse",
    tagline: "Where legends rise and worlds collide.",
    description:
      "Cosmic sagas, futuristic cities and legendary heroes — cinema at maximum voltage.",
    available: true,
    themeAttribute: "heroverse",
    home: "/heroverse",
  },
};

export const otherUniverse = (id: UniverseId): UniverseId =>
  id === "dreamverse" ? "heroverse" : "dreamverse";

type Transition = {
  active: boolean;
  /** Universe we are travelling to */
  to: UniverseId;
  /** Universe we left */
  from: UniverseId;
};

type UniverseContextValue = {
  universe: UniverseTheme;
  universeList: UniverseTheme[];
  setUniverse: (id: UniverseId) => void;
  /** Kicks off the cinematic portal animation, then applies the universe. */
  travelTo: (id: UniverseId) => void;
  commitTravel: () => void;
  endTravel: () => void;
  transition: Transition;
  preferred: UniverseId | null;
};

const UniverseContext = createContext<UniverseContextValue | null>(null);
const STORAGE_KEY = "cineverse.universe";

export function UniverseProvider({ children }: { children: ReactNode }) {
  const [preferred, setPreferred] = useState<UniverseId | null>(null);
  const [transition, setTransition] = useState<Transition>({
    active: false,
    to: "dreamverse",
    from: "dreamverse",
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as UniverseId | null;
    if (stored && stored in universes) setPreferred(stored);
  }, []);

  const active: UniverseId = preferred && universes[preferred].available ? preferred : "dreamverse";

  useEffect(() => {
    document.documentElement.setAttribute("data-universe", active);
  }, [active]);

  const setUniverse = useCallback((id: UniverseId) => {
    setPreferred(id);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const travelTo = useCallback(
    (id: UniverseId) => {
      setTransition((t) => (t.active ? t : { active: true, to: id, from: active }));
    },
    [active],
  );

  const commitTravel = useCallback(() => {
    setTransition((t) => {
      if (t.active) setUniverse(t.to);
      return t;
    });
  }, [setUniverse]);

  const endTravel = useCallback(() => {
    setTransition((t) => ({ ...t, active: false }));
  }, []);

  const value = useMemo<UniverseContextValue>(
    () => ({
      universe: universes[active],
      universeList: Object.values(universes),
      preferred,
      setUniverse,
      travelTo,
      commitTravel,
      endTravel,
      transition,
    }),
    [active, preferred, setUniverse, travelTo, commitTravel, endTravel, transition],
  );

  return <UniverseContext.Provider value={value}>{children}</UniverseContext.Provider>;
}

export function useUniverse() {
  const ctx = useContext(UniverseContext);
  if (!ctx) throw new Error("useUniverse must be used inside UniverseProvider");
  return ctx;
}
