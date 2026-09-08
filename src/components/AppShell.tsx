import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./SiteHeader";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12">{children}</main>
      <footer className="mx-auto max-w-7xl px-4 pb-10 pt-6 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <p>© {new Date().getFullYear()} CineVerse · DreamVerse edition</p>
          <Link
            to="/universe"
            className="rounded-full bg-[#FF69B4] px-4 py-2 font-medium text-white shadow-sm transition-transform hover:scale-105 hover:bg-[#FF1493] active:scale-95"
          >
            Switch universe
          </Link>
        </div>
      </footer>
    </div>
  );
}
