import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { activityFeed, mockDocuments, stats, suggestedQuestions } from "@/lib/mock-data";
import { StatusPill } from "@/components/app/status-pill";
import { DocIcon } from "@/components/app/doc-icon";
import { Button } from "@/components/app/../ui/button";
import { ArrowUpRight, Upload, TrendingUp, MessageSquare, Quote, HardDrive, FileText } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — DocMind" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell breadcrumb={[{ label: "/dashboard", to: "/dashboard" }, { label: "Dashboard" }]}>
      <div className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Good evening, Ayush</h1>
            <p className="mt-1.5 text-sm text-text-secondary">
              Here's what changed in your document workspace.
            </p>
          </div>
          <Link to="/upload">
            <Button className="gap-1.5">
              <Upload className="h-4 w-4" /> Upload document
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Documents" value={stats.documents} trend="+3 this week" icon={FileText} />
          <StatCard label="Questions asked" value={stats.questions} trend="+18 this week" icon={MessageSquare} />
          <StatCard label="Citations generated" value={stats.citations} trend="+42 this week" icon={Quote} />
          <StatCard label="Storage used" value={stats.storage} trend="of 500 MB" icon={HardDrive} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded-xl border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <h2 className="text-sm font-semibold">Recent documents</h2>
              <Link to="/documents" className="text-xs text-text-secondary hover:text-foreground">
                View all
              </Link>
            </div>
            <div className="divide-y divide-border">
              {mockDocuments.slice(0, 4).map((d) => (
                <Link
                  key={d.id}
                  to="/documents/$slug"
                  params={{ slug: d.slug }}
                  className="flex items-center gap-4 px-5 py-3.5 transition hover:bg-surface-soft"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-surface-soft text-text-secondary">
                    <DocIcon type={d.type} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{d.title}</div>
                    <div className="mt-0.5 text-xs text-text-muted">
                      {d.pages} pages · {d.size} · Updated {d.updatedAt}
                    </div>
                  </div>
                  <StatusPill status={d.status} />
                  <div className="hidden w-24 text-right text-xs text-text-secondary md:block">
                    {d.questions} questions
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-text-muted" />
                </Link>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-xl border border-border bg-surface">
              <div className="border-b border-border px-5 py-3.5">
                <h2 className="text-sm font-semibold">Ask better questions</h2>
                <p className="mt-0.5 text-xs text-text-muted">Templates that work well.</p>
              </div>
              <ul className="space-y-1 p-2">
                {suggestedQuestions.map((q) => (
                  <li key={q}>
                    <Link
                      to="/documents/$slug"
                      params={{ slug: "product-requirements" }}
                      className="flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-surface-soft hover:text-foreground"
                    >
                      <span className="truncate">{q}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-surface">
              <div className="border-b border-border px-5 py-3.5">
                <h2 className="text-sm font-semibold">Activity</h2>
              </div>
              <ol className="relative space-y-4 px-5 py-4">
                {activityFeed.map((a) => (
                  <li key={a.id} className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    <div className="flex-1">
                      <div className="text-sm">{a.text}</div>
                      <div className="text-xs text-text-muted">{a.time}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({
  label,
  value,
  trend,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  trend: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-secondary">{label}</span>
        <Icon className="h-4 w-4 text-text-muted" />
      </div>
      <div className="mt-3 font-mono text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 flex items-center gap-1 text-xs text-text-muted">
        <TrendingUp className="h-3 w-3 text-[color:var(--color-success)]" />
        {trend}
      </div>
    </div>
  );
}
