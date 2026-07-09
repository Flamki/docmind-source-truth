import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/app/logo";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Github,
  FileText,
  Sparkles,
  ShieldCheck,
  Upload,
  MessageSquare,
  Quote,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DocMind — Understand any document with source-backed AI" },
      {
        name: "description",
        content:
          "Upload PDFs, reports, and notes. Ask questions with source-backed answers and page-level citations you can verify.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <Workflow />
      <UseCases />
      <FAQ />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-text-secondary md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#use-cases" className="hover:text-foreground">Use cases</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
          <a href="#" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <Github className="h-4 w-4" /> GitHub
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/sign-in" className="text-sm text-text-secondary hover:text-foreground">
            Sign in
          </Link>
          <Link to="/sign-up">
            <Button size="sm">Start free</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_1fr] lg:py-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Citation-first AI workspace
          </div>
          <h1 className="mt-6 text-[44px] font-semibold leading-[1.05] tracking-tight md:text-[56px]">
            Understand any document with{" "}
            <span className="citation-highlight">source-backed</span> AI.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-text-secondary md:text-base">
            Upload PDFs, reports, notes, or briefs. Ask questions and get clear answers with
            citations you can verify — down to the page and paragraph.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/dashboard">
              <Button size="lg" className="h-11 gap-1.5 px-5">
                Try the workspace <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#">
              <Button size="lg" variant="outline" className="h-11 gap-1.5 px-5">
                <Github className="h-4 w-4" /> View GitHub
              </Button>
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-muted">
            {[
              "No hallucination guessing",
              "Citation-first answers",
              "Built for students, researchers, and job seekers",
            ].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" />
                {t}
              </div>
            ))}
          </div>
        </div>
        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-br from-accent-soft/60 to-transparent blur-2xl" />
      <div className="rounded-xl border border-border bg-surface shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_50px_-20px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-surface-soft" />
              <div className="h-2.5 w-2.5 rounded-full bg-surface-soft" />
              <div className="h-2.5 w-2.5 rounded-full bg-surface-soft" />
            </div>
          </div>
          <div className="font-mono text-[11px] text-text-muted">docmind.app/documents/prd</div>
          <div className="w-8" />
        </div>
        <div className="border-b border-border px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-primary" />
            <span className="font-medium">Product Requirements.pdf</span>
            <span className="ml-auto rounded-full border border-[color:var(--color-success)]/20 bg-[color:var(--color-success)]/10 px-2 py-0.5 text-[10px] font-medium text-[color:var(--color-success)]">
              Ready
            </span>
          </div>
        </div>
        <div className="space-y-4 p-4">
          <div className="flex justify-end">
            <div className="max-w-[75%] rounded-lg rounded-br-sm bg-surface-soft px-3 py-2 text-sm">
              What are the main risks?
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <Sparkles className="h-3 w-3" /> DocMind
            </div>
            <p className="text-sm leading-relaxed text-foreground">
              The main risks are delayed onboarding, unclear ownership, and missing analytics
              before launch.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { p: 3, t: "Launch risks" },
                { p: 7, t: "Dependencies" },
              ].map((c) => (
                <span
                  key={c.p}
                  className="inline-flex items-center gap-1 rounded-md border border-accent-border/60 bg-accent-soft px-2 py-1 text-[11px] font-medium text-[oklch(0.5_0.14_55)]"
                >
                  <Quote className="h-3 w-3" /> Page {c.p} · {c.t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Features() {
  const items = [
    {
      icon: Upload,
      title: "Upload and organize",
      body: "Store docs in one clean workspace with tags, status, and quick search.",
    },
    {
      icon: MessageSquare,
      title: "Ask with context",
      body: "Chat with one document at a time so answers stay focused.",
    },
    {
      icon: ShieldCheck,
      title: "Verify every answer",
      body: "Every response includes source snippets and page references.",
    },
  ];
  return (
    <section id="features" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">Features</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            A calm workspace for reading with AI.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-surface p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft">
                <f.icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  const steps = [
    { n: "01", t: "Upload document", d: "Drop in a PDF, DOCX, or TXT. We extract and index it." },
    { n: "02", t: "Ask a question", d: "Ask in plain English. Answers stay scoped to the document." },
    { n: "03", t: "Verify citations", d: "Every claim links to the exact page and snippet." },
  ];
  return (
    <section id="how" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">How it works</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Three steps from PDF to answer.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-xl border border-border bg-surface p-6">
              <div className="font-mono text-sm text-text-muted">{s.n}</div>
              <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-text-secondary">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const items = [
    { t: "Students", d: "Summarize notes, papers, and assignments." },
    { t: "Job seekers", d: "Understand job descriptions, contracts, and interview prep docs." },
    { t: "Founders", d: "Review specs, research, and business documents quickly." },
    { t: "Developers", d: "Ask questions over docs, API specs, and technical PDFs." },
  ];
  return (
    <section id="use-cases" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">Use cases</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Made for people who read to think.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.t} className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-base font-semibold">{i.t}</h3>
              <p className="mt-2 text-sm text-text-secondary">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qs = [
    {
      q: "Can I use this without uploading private docs?",
      a: "Yes. Try the workspace with sample documents already loaded — no upload required.",
    },
    {
      q: "Does DocMind replace reading?",
      a: "No. It helps you read faster, find sources, and verify claims. You still stay in the loop.",
    },
    {
      q: "How are citations shown?",
      a: "Every answer includes chips linking to the page and paragraph the claim came from.",
    },
    {
      q: "Can I delete my documents?",
      a: "Yes. Documents can be removed any time from the Documents page or the detail view.",
    },
  ];
  return (
    <section id="faq" className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="font-mono text-xs uppercase tracking-widest text-primary">FAQ</div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Common questions.
        </h2>
        <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-surface">
          {qs.map((f) => (
            <details key={f.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                {f.q}
                <span className="text-text-muted transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-text-secondary">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-xs text-text-muted">· Built by Ayush Singh</span>
        </div>
        <div className="flex items-center gap-5 text-xs text-text-secondary">
          <a href="#" className="hover:text-foreground">GitHub</a>
          <Link to="/dashboard" className="hover:text-foreground">Live demo</Link>
          <span className="text-text-muted">MIT License</span>
        </div>
      </div>
    </footer>
  );
}
