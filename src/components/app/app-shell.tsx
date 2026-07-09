"use client";

import Link from "next/link";
import { Command, LogIn, Search, Settings, UserRound } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Logo } from "./logo";
import { CommandPalette } from "./command-palette";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function TopBar({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <header className="z-30 shrink-0 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center gap-4 px-4 lg:px-8">
        <Logo className="shrink-0" />
        <button
          onClick={onOpenPalette}
          className="group mx-auto flex h-12 w-full max-w-3xl items-center gap-3 rounded-lg border border-border bg-surface px-4 text-left text-sm text-text-muted shadow-sm hover:border-text-muted"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1">Search</span>
          <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-text-secondary sm:inline">
            /
          </kbd>
        </button>
        <button
          onClick={onOpenPalette}
          className="hidden h-11 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-xs text-text-secondary hover:border-text-muted md:flex"
        >
          <Command className="h-3.5 w-3.5" />
          <span className="font-mono">K</span>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-11 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm font-medium shadow-sm hover:border-text-muted">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-primary">
              <UserRound className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">Profile</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="text-sm font-medium">Workspace profile</div>
              <div className="text-xs font-normal text-text-muted">No account connected</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/sign-in" className="cursor-pointer">
                <LogIn className="mr-2 h-4 w-4" />
                Sign in
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export function AppShell({
  children,
}: {
  children: ReactNode;
  breadcrumb?: { label: string; to?: string }[];
}) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setPaletteOpen(true);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <TopBar onOpenPalette={() => setPaletteOpen(true)} />
      <main className="min-w-0 flex-1">{children}</main>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
