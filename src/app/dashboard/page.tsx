import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Upload, MessageSquare, Quote, HardDrive, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Track document activity, storage, questions, and source-backed citations in DocMind.",
};

export default function Dashboard() {
  const stats = {
    documents: 0,
    questions: 0,
    citations: 0,
    storage: "0 MB",
  };
  const suggestedQuestions = [
    "Summarize this document in 5 bullets",
    "What are the risks mentioned?",
    "What decisions are required?",
    "What dates or deadlines are inside?",
  ];

  return (
    <AppShell breadcrumb={[{ label: "/dashboard", to: "/dashboard" }, { label: "Dashboard" }]}>
      <div className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Document workspace</h1>
            <p className="mt-1.5 text-sm text-text-secondary">
              Upload a document to start building source-backed answers.
            </p>
          </div>
          <Link href="/upload">
            <Button className="gap-1.5">
              <Upload className="h-4 w-4" /> Upload document
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Documents"
            value={stats.documents}
            trend="Ready for uploads"
            icon={FileText}
          />
          <StatCard
            label="Questions asked"
            value={stats.questions}
            trend="No questions yet"
            icon={MessageSquare}
          />
          <StatCard
            label="Citations generated"
            value={stats.citations}
            trend="No citations yet"
            icon={Quote}
          />
          <StatCard
            label="Storage used"
            value={stats.storage}
            trend="No files stored"
            icon={HardDrive}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded-xl border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <h2 className="text-sm font-semibold">Recent documents</h2>
              <Link href="/documents" className="text-xs text-text-secondary hover:text-foreground">
                View all
              </Link>
            </div>
            <div className="p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-semibold">No documents yet</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-text-secondary">
                Upload your first source document before reviewing activity or asking questions.
              </p>
              <Link href="/upload">
                <Button className="mt-5 gap-1.5">
                  <Upload className="h-4 w-4" /> Upload document
                </Button>
              </Link>
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
                      href="/documents"
                      className="flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-surface-soft hover:text-foreground"
                    >
                      <span className="truncate">{q}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div id="activity" className="rounded-xl border border-border bg-surface">
              <div className="border-b border-border px-5 py-3.5">
                <h2 className="text-sm font-semibold">Activity</h2>
              </div>
              <ol className="relative space-y-4 px-5 py-4">
                <li className="text-sm text-text-secondary">
                  Activity will appear after documents are uploaded or updated.
                </li>
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
      <div className="mt-1 flex items-center gap-1 text-xs text-text-muted">{trend}</div>
    </div>
  );
}
