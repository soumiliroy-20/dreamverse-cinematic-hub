import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Sparkles } from "@/components/Sparkles";
import { useAuth } from "@/lib/auth-context";
import { Field } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — CineVerse" },
      {
        name: "description",
        content: "Join CineVerse and build your watchlist across cinematic universes.",
      },
      { property: "og:title", content: "Create your account — CineVerse" },
      {
        property: "og:description",
        content: "Join CineVerse and build your watchlist across cinematic universes.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || password.length < 6) {
      setError("Add your name, email and a password of at least 6 characters.");
      return;
    }
    setBusy(true);
    await signUp(name, email, password);
    setBusy(false);
    navigate({ to: "/universe" });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <Sparkles />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-[2rem] glass-panel p-8"
      >
        <Link to="/" className="font-display text-2xl font-semibold text-gradient">
          CineVerse
        </Link>
        <h1 className="mt-6 text-3xl font-semibold">Begin your journey</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          One account, every universe we open.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <Field label="Name" type="text" value={name} onChange={setName} />
          <Field label="Email" type="email" value={email} onChange={setEmail} />
          <Field label="Password" type="password" value={password} onChange={setPassword} />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Creating…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already dreaming?{" "}
          <Link to="/login" className="text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
