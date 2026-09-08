import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Sparkles } from "@/components/Sparkles";
import { useAuth } from "@/lib/auth-context";
import { useLibrary } from "@/lib/library-context";
import { useUniverse } from "@/lib/universe-context";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — CineVerse" },
      { name: "description", content: "Manage your CineVerse profile and preferred universe." },
      { property: "og:title", content: "Your Profile — CineVerse" },
      { property: "og:description", content: "Manage your profile and preferred universe." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, ready, signOut, updateProfile } = useAuth();
  const { universe, preferred } = useUniverse();
  const { watchlist, favorites } = useLibrary();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  if (!ready) return <AppShell>{null}</AppShell>;

  if (!user) {
    return (
      <AppShell>
        <div className="rounded-3xl glass-panel p-10 text-center">
          <h1 className="font-display text-3xl">You're browsing as a guest</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to keep your watchlist and favorites across devices.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Sign in
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="relative overflow-hidden rounded-[2rem] glass-panel p-8">
        <Sparkles />
        <div className="relative flex flex-wrap items-center gap-5">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-primary font-display text-3xl text-primary-foreground">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <button
            onClick={() => {
              signOut();
              navigate({ to: "/" });
            }}
            className="ml-auto rounded-full border border-border px-5 py-2.5 text-sm transition hover:bg-secondary"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="In watchlist" value={watchlist.length} />
        <Stat label="Favorites" value={favorites.length} />
        <Stat label="Universe" value={preferred ? universe.name : "Not set"} />
      </div>

      <div className="mt-6 rounded-3xl glass-panel p-8">
        <h2 className="text-2xl font-semibold">Display name</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="min-w-56 flex-1 rounded-2xl border border-glass-border bg-card/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={() => updateProfile({ name })}
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Save
          </button>
        </div>
        <Link
          to="/universe"
          className="mt-6 inline-block text-sm text-primary underline-offset-4 hover:underline"
        >
          Change preferred universe
        </Link>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-3xl glass-panel p-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
    </div>
  );
}
