import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/app/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ShieldCheck, Upload, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "DocMind - Source-backed AI document workspace",
  description:
    "Upload documents, ask focused questions, and verify every answer with page-level citations in DocMind.",
  alternates: {
    canonical: "/",
  },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <Workflow />
        <UseCases />
        <FAQ />
      </main>
      <LandingStructuredData />
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
          <a href="#features" className="hover:text-foreground">
            Features
          </a>
          <a href="#how" className="hover:text-foreground">
            How it works
          </a>
          <a href="#use-cases" className="hover:text-foreground">
            Use cases
          </a>
          <a href="#faq" className="hover:text-foreground">
            FAQ
          </a>
          <a
            href="https://github.com/Flamki/docmind-source-truth"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/sign-in" className="text-sm text-text-secondary hover:text-foreground">
            Sign in
          </Link>
          <Link href="/sign-up">
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
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-[44px] font-semibold leading-[1.05] tracking-tight md:text-[64px]">
          Understand any document with <span className="citation-highlight">source-backed</span> AI.
        </h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-text-secondary md:text-base">
          Upload PDFs, reports, notes, or briefs. Ask questions and get clear answers with citations
          you can verify - down to the page and paragraph.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/dashboard">
            <Button size="lg" className="h-11 gap-1.5 px-5">
              Try the workspace <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="https://github.com/Flamki/docmind-source-truth">
            <Button size="lg" variant="outline" className="h-11 gap-1.5 px-5">
              <Github className="h-4 w-4" /> View GitHub
            </Button>
          </a>
        </div>
      </div>
    </section>
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
    {
      n: "02",
      t: "Ask a question",
      d: "Ask in plain English. Answers stay scoped to the document.",
    },
    { n: "03", t: "Verify citations", d: "Every claim links to the exact page and snippet." },
  ];
  return (
    <section id="how" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            How it works
          </div>
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
      a: "Yes. The workspace starts empty, so you control which documents are added.",
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

function LandingStructuredData() {
  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DocMind",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I use this without uploading private docs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The workspace starts empty, so you control which documents are added.",
        },
      },
      {
        "@type": "Question",
        name: "Does DocMind replace reading?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. It helps you read faster, find sources, and verify claims. You still stay in the loop.",
        },
      },
      {
        "@type": "Question",
        name: "How are citations shown?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every answer includes chips linking to the page and paragraph the claim came from.",
        },
      },
      {
        "@type": "Question",
        name: "Can I delete my documents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Documents can be removed any time from the Documents page or the detail view.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-xs text-text-muted">- Open source document AI workspace</span>
        </div>
        <div className="flex items-center gap-5 text-xs text-text-secondary">
          <a
            href="https://github.com/Flamki/docmind-source-truth"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <Link href="/dashboard" className="hover:text-foreground">
            Open workspace
          </Link>
          <span className="text-text-muted">MIT License</span>
        </div>
      </div>
    </footer>
  );
}
