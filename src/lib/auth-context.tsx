import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type AppUser = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: AppUser | null;
  ready: boolean;
  signIn: (email: string, password: string) => Promise<AppUser>;
  signUp: (name: string, email: string, password: string) => Promise<AppUser>;
  signOut: () => void;
  updateProfile: (patch: Partial<Pick<AppUser, "name" | "email">>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "cineverse.user";

/**
 * Local, auth-ready facade. Swap the three async methods for a real
 * auth provider later without touching any UI component.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw) as AppUser);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setReady(true);
  }, []);

  const persist = (next: AppUser | null) => {
    setUser(next);
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      signIn: async (email) => {
        const next: AppUser = {
          id: crypto.randomUUID(),
          name: email.split("@")[0] || "Dreamer",
          email,
        };
        persist(next);
        return next;
      },
      signUp: async (name, email) => {
        const next: AppUser = { id: crypto.randomUUID(), name, email };
        persist(next);
        return next;
      },
      signOut: () => persist(null),
      updateProfile: (patch) => {
        if (!user) return;
        persist({ ...user, ...patch });
      },
    }),
    [user, ready],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
