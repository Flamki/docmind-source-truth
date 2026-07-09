"use client";

import Link from "next/link";
import { AppShell } from "@/components/app/app-shell";
import type { AppDocument, Citation, ChatMessage } from "@/types";
import { StatusPill } from "@/components/app/status-pill";
import { DocIcon } from "@/components/app/doc-icon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Sparkles,
  Copy,
  ExternalLink,
  Trash2,
  Tag,
  Pencil,
  Quote,
  BookOpen,
} from "lucide-react";

export function DocumentDetailClient({ doc }: { doc: AppDocument }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);

  return (
    <AppShell breadcrumb={[{ label: "Documents", to: "/documents" }, { label: doc.title }]}>
      <div className="mx-auto max-w-[1440px] px-4 py-6 lg:px-6">
        <div className="lg:hidden">
          <Tabs defaultValue="chat">
            <TabsList className="w-full">
              <TabsTrigger value="chat" className="flex-1">
                Chat
              </TabsTrigger>
              <TabsTrigger value="sources" className="flex-1">
                Sources
              </TabsTrigger>
              <TabsTrigger value="details" className="flex-1">
                Details
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="mt-4">
              <ChatPanel
                doc={doc}
                messages={messages}
                setMessages={setMessages}
                onCitation={setSelectedCitation}
              />
            </TabsContent>
            <TabsContent value="sources" className="mt-4">
              <CitationPanel citation={selectedCitation} />
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <DetailsPanel doc={doc} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="hidden gap-4 lg:grid lg:grid-cols-[280px_1fr_360px]">
          <DetailsPanel doc={doc} />
          <ChatPanel
            doc={doc}
            messages={messages}
            setMessages={setMessages}
            onCitation={setSelectedCitation}
          />
          <CitationPanel citation={selectedCitation} />
        </div>
      </div>
    </AppShell>
  );
}

function DetailsPanel({ doc }: { doc: AppDocument }) {
  return (
    <aside className="space-y-4">
      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-soft text-primary">
            <DocIcon type={doc.type} className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium">{doc.title}</div>
            <div className="mt-0.5 text-xs text-text-muted">
              {doc.type} - {doc.pages} pages
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <StatusPill status={doc.status} />
          <div className="text-xs text-text-muted">Jul 9, 2026</div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1">
          <button className="flex flex-col items-center gap-1 rounded-md border border-border py-2 text-[11px] text-text-secondary hover:bg-surface-soft">
            <Pencil className="h-3.5 w-3.5" /> Rename
          </button>
          <button className="flex flex-col items-center gap-1 rounded-md border border-border py-2 text-[11px] text-text-secondary hover:bg-surface-soft">
            <Tag className="h-3.5 w-3.5" /> Tag
          </button>
          <button className="flex flex-col items-center gap-1 rounded-md border border-border py-2 text-[11px] text-destructive hover:bg-surface-soft">
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="text-xs font-medium uppercase tracking-wide text-text-muted">Tags</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {doc.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-background px-2 py-0.5 text-xs text-text-secondary"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="text-xs font-medium uppercase tracking-wide text-text-muted">Summary</div>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{doc.summary}</p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="text-xs font-medium uppercase tracking-wide text-text-muted">Suggested</div>
        <ul className="mt-2 space-y-1">
          {[
            "Summarize this document",
            "What are the risks?",
            "What are the deadlines?",
            "Who is responsible?",
          ].map((q) => (
            <li key={q}>
              <button className="w-full rounded-md px-2 py-1.5 text-left text-sm text-text-secondary hover:bg-surface-soft hover:text-foreground">
                {q}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function ChatPanel({
  doc,
  messages,
  setMessages,
  onCitation,
}: {
  doc: AppDocument;
  messages: ChatMessage[];
  setMessages: (m: ChatMessage[]) => void;
  onCitation: (c: Citation) => void;
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const submit = () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const answer: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Document retrieval is not connected yet. Once uploads, extraction, and indexing are wired to the database, answers and citations will be generated from the selected source.",
      };
      setMessages([...messages, userMsg, answer]);
      setLoading(false);
    }, 1400);
  };

  return (
    <section className="flex min-h-[calc(100vh-8rem)] flex-col rounded-xl border border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
        <Sparkles className="h-4 w-4 text-primary" />
        <div className="text-sm font-medium">
          Ask <span className="text-text-secondary">{doc.title}</span>
        </div>
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto p-5">
        {messages.length === 0 && <ChatEmpty onPick={setInput} />}
        {messages.map((m) => (
          <MessageBubble key={m.id} m={m} onCitation={onCitation} />
        ))}
        {loading && <LoadingAnswer />}
        <div ref={endRef} />
      </div>
      <div className="border-t border-border p-3">
        <div className="rounded-lg border border-border bg-background p-2 focus-within:border-text-muted">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Ask a question about this document..."
            className="min-h-[52px] resize-none border-0 bg-transparent p-1 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center justify-between pt-1">
            <button className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-text-muted hover:bg-surface-soft">
              <Paperclip className="h-3.5 w-3.5" /> Attach context
            </button>
            <Button
              size="sm"
              onClick={submit}
              disabled={!input.trim() || loading}
              className="h-8 gap-1.5"
            >
              <Send className="h-3.5 w-3.5" /> Send
            </Button>
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] text-text-muted">
          Answers are generated from your selected document. Always verify citations.
        </p>
      </div>
    </section>
  );
}

function MessageBubble({ m, onCitation }: { m: ChatMessage; onCitation: (c: Citation) => void }) {
  if (m.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] rounded-lg rounded-br-sm bg-surface-soft px-4 py-2.5 text-sm">
          {m.content}
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-[85%] space-y-3">
      <div className="flex items-center gap-1.5 text-xs text-text-muted">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
        </div>
        DocMind
      </div>
      <p className="text-[15px] leading-relaxed text-foreground">{m.content}</p>
      {m.citations && (
        <div className="flex flex-wrap gap-1.5">
          {m.citations.map((c) => (
            <button
              key={c.id}
              onClick={() => onCitation(c)}
              className="inline-flex items-center gap-1.5 rounded-md border border-accent-border/60 bg-accent-soft px-2 py-1 text-[12px] font-medium text-[oklch(0.5_0.14_55)] hover:brightness-95"
            >
              <Quote className="h-3 w-3" />[{c.id}] Page {c.page} - {c.title}
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {[
          "What should be fixed first?",
          "Turn this into an action plan",
          "Who owns each risk?",
        ].map((s) => (
          <button
            key={s}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs text-text-secondary hover:border-text-muted hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatEmpty({ onPick }: { onPick: (v: string) => void }) {
  const qs = [
    "Summarize in 5 bullets",
    "Find deadlines",
    "List open questions",
    "Explain like I'm new",
  ];
  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft">
        <BookOpen className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">Ask your first question</h3>
      <p className="mt-1.5 text-sm text-text-secondary">
        Start with a summary, risks, deadlines, or action items.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-1.5">
        {qs.map((q) => (
          <button
            key={q}
            onClick={() => onPick(q)}
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary hover:border-text-muted hover:text-foreground"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

function LoadingAnswer() {
  const steps = ["Reading document...", "Finding relevant sources...", "Drafting answer..."];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 text-xs text-text-muted">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-foreground">
          <Sparkles className="h-3 w-3 animate-pulse text-primary" />
        </div>
        DocMind
      </div>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 text-xs text-text-secondary">
            <div
              className="h-1.5 w-1.5 rounded-full bg-primary"
              style={{ animation: `pulse 1.5s ${i * 0.3}s infinite` }}
            />
            {s}
          </div>
        ))}
      </div>
      <div className="space-y-2 pt-1">
        <div className="h-3 w-full animate-pulse rounded bg-surface-soft" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-surface-soft" />
        <div className="h-3 w-4/6 animate-pulse rounded bg-surface-soft" />
      </div>
    </div>
  );
}

function CitationPanel({ citation }: { citation: Citation | null }) {
  return (
    <aside className="space-y-4">
      <div className="rounded-xl border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Quote className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Sources</h3>
          </div>
          <span className="text-xs text-text-muted">Selected</span>
        </div>
        {citation ? (
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="font-mono text-xs text-text-muted">Citation {citation.id}</div>
              <div className="rounded-full border border-[color:var(--color-success)]/20 bg-[color:var(--color-success)]/10 px-2 py-0.5 text-[10px] font-medium text-[color:var(--color-success)]">
                {citation.relevance} relevance
              </div>
            </div>
            <div className="mt-2 text-sm font-medium">Page {citation.page}</div>
            <blockquote className="mt-3 border-l-2 border-accent-border pl-3 text-sm leading-relaxed text-text-secondary">
              <span className="citation-highlight">&quot;{citation.snippet}&quot;</span>
            </blockquote>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="h-8 gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" /> Open in document
              </Button>
              <Button size="sm" variant="ghost" className="h-8 gap-1.5">
                <Copy className="h-3.5 w-3.5" /> Copy
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-sm text-text-muted">
            Click a citation chip to preview the source.
          </div>
        )}
      </div>
      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="text-xs font-medium uppercase tracking-wide text-text-muted">Tip</div>
        <p className="mt-2 text-xs leading-relaxed text-text-secondary">
          Every claim in an answer links to a page and paragraph. Open the source to verify context
          and quoted text.
        </p>
      </div>
      <Link href="/documents" className="block text-xs text-text-secondary hover:text-foreground">
        Back to all documents
      </Link>
    </aside>
  );
}
