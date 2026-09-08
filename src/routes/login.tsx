import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Sparkles } from "@/components/Sparkles";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — CineVerse" },
      { name: "description", content: "Sign in to CineVerse to continue exploring DreamVerse." },
      { property: "og:title", content: "Sign in — CineVerse" },
      { property: "og:description", content: "Sign in to continue exploring DreamVerse." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setBusy(true);
    await signIn(email, password);
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
        <h1 className="mt-6 text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your dreams kept your seat warm.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <Field label="Email" type="email" value={email} onChange={setEmail} />
          <Field label="Password" type="password" value={password} onChange={setPassword} />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="text-primary underline-offset-4 hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export function Field({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-glass-border bg-card/70 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
