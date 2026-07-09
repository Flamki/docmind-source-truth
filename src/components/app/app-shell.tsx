"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Upload,
  Activity,
  Settings,
  Search,
  Bell,
  Command,
  Plus,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "./command-palette";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/dashboard#activity", label: "Activity", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-[260px] shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Logo />
      </div>
      <div className="px-3 py-3">
        <div className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-text-muted">Workspace</div>
            <div className="text-sm font-medium text-foreground">Not connected</div>
          </div>
          <ChevronRight className="h-4 w-4 text-text-muted" />
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 px-3">
        {nav.map((item) => {
          const active =
            item.href === "/dashboard" || item.href === "/dashboard#activity"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition",
                active
                  ? "bg-surface text-foreground shadow-[0_0_0_1px_var(--color-border)]"
                  : "text-text-secondary hover:bg-surface-soft hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-3">
        <div className="rounded-md border border-border bg-surface p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-text-secondary">Storage</span>
            <span className="font-mono text-text-primary">0 MB</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-soft">
            <div className="h-full w-0 rounded-full bg-primary" />
          </div>
          <button className="mt-3 w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-soft">
            Connect database
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2.5 px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            --
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">No account</div>
            <div className="truncate text-xs text-text-muted">Sign in to sync data</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({
  breadcrumb,
  onOpenPalette,
}: {
  breadcrumb: { label: string; to?: string }[];
  onOpenPalette: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur lg:px-6">
      <div className="hidden items-center gap-1.5 text-sm text-text-secondary md:flex">
        {breadcrumb.map((b, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-text-muted" />}
            {b.to ? (
              <Link href={b.to} className="hover:text-foreground">
                {b.label}
              </Link>
            ) : (
              <span className="text-foreground">{b.label}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-1 justify-center md:justify-end">
        <button
          onClick={onOpenPalette}
          className="group flex h-9 w-full max-w-md items-center gap-2 rounded-md border border-border bg-surface px-3 text-left text-sm text-text-muted hover:border-text-muted"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1">Search documents...</span>
          <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-text-secondary sm:inline">
            /
          </kbd>
        </button>
      </div>
      <button
        onClick={onOpenPalette}
        className="hidden h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-xs text-text-secondary hover:border-text-muted md:flex"
      >
        <Command className="h-3.5 w-3.5" />
        <span className="font-mono">K</span>
      </button>
      <button className="hidden h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text-secondary hover:text-foreground md:flex">
        <Bell className="h-4 w-4" />
      </button>
      <Link href="/upload">
        <Button size="sm" className="h-9 gap-1.5">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New upload</span>
        </Button>
      </Link>
    </header>
  );
}

export function AppShell({
  children,
  breadcrumb,
}: {
  children: ReactNode;
  breadcrumb: { label: string; to?: string }[];
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
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar breadcrumb={breadcrumb} onOpenPalette={() => setPaletteOpen(true)} />
        <main className="flex-1">{children}</main>
      </div>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
