"use client";

import Link from "next/link";
import { AppShell } from "@/components/app/app-shell";
import type { AppDocument } from "@/types";
import { StatusPill } from "@/components/app/status-pill";
import { DocIcon } from "@/components/app/doc-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, LayoutGrid, List, MoreHorizontal, Search, Tag, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";

const documents: AppDocument[] = [];

export function DocumentsClient() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [tag, setTag] = useState("all");
  const [sort, setSort] = useState("updated");
  const [view, setView] = useState<"table" | "grid">("table");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let list = [...documents];
    if (q) {
      list = list.filter(
        (d) =>
          d.title.toLowerCase().includes(q.toLowerCase()) ||
          d.tags.some((t) => t.toLowerCase().includes(q.toLowerCase())),
      );
    }
    if (status !== "all") list = list.filter((d) => d.status === status);
    if (type !== "all") list = list.filter((d) => d.type === type);
    if (tag !== "all") list = list.filter((d) => d.tags.includes(tag));
    if (sort === "name") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "questions") list.sort((a, b) => b.questions - a.questions);
    return list;
  }, [q, status, type, tag, sort]);

  const clearFilters = () => {
    setQ("");
    setStatus("all");
    setType("all");
    setTag("all");
    setSort("updated");
  };
  const hasFilters = q || status !== "all" || type !== "all" || tag !== "all";

  return (
    <AppShell breadcrumb={[{ label: "/documents", to: "/documents" }, { label: "Documents" }]}>
      <div className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Documents</h1>
            <p className="mt-1.5 text-sm text-text-secondary">
              Manage every source in your workspace.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface p-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title or tag..."
              className="h-9 pl-8"
            />
          </div>
          <FilterSelect
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              ["all", "All"],
              ["ready", "Ready"],
              ["processing", "Processing"],
              ["failed", "Failed"],
            ]}
          />
          <FilterSelect
            label="Type"
            value={type}
            onChange={setType}
            options={[
              ["all", "All"],
              ["PDF", "PDF"],
              ["DOCX", "DOCX"],
              ["TXT", "TXT"],
            ]}
          />
          <FilterSelect
            label="Tag"
            value={tag}
            onChange={setTag}
            options={[
              ["all", "All"],
              ["Research", "Research"],
              ["Career", "Career"],
              ["Legal", "Legal"],
              ["Product", "Product"],
              ["Important", "Important"],
            ]}
          />
          <FilterSelect
            label="Sort"
            value={sort}
            onChange={setSort}
            options={[
              ["updated", "Recently updated"],
              ["name", "Name"],
              ["questions", "Questions"],
            ]}
          />
          <div className="ml-auto flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
            <button
              onClick={() => setView("table")}
              className={`flex h-7 w-7 items-center justify-center rounded ${view === "table" ? "bg-surface text-foreground" : "text-text-muted"}`}
            >
              <List className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setView("grid")}
              className={`flex h-7 w-7 items-center justify-center rounded ${view === "grid" ? "bg-surface text-foreground" : "text-text-muted"}`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {selected.length > 0 && (
          <div className="mt-3 flex items-center gap-3 rounded-md border border-accent-border/60 bg-accent-soft px-4 py-2 text-sm">
            <span className="font-medium">{selected.length} selected</span>
            <div className="ml-auto flex items-center gap-1">
              <Button size="sm" variant="ghost" className="h-8 gap-1.5">
                <Tag className="h-3.5 w-3.5" />
                Add tag
              </Button>
              <Button size="sm" variant="ghost" className="h-8">
                Export
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 gap-1.5 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 gap-1.5"
                onClick={() => setSelected([])}
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="mt-4">
          {filtered.length === 0 ? (
            hasFilters ? (
              <div className="rounded-xl border border-dashed border-border bg-surface p-16 text-center">
                <div className="text-sm text-text-secondary">
                  No documents found for{" "}
                  <span className="font-medium text-foreground">
                    &quot;{q || "these filters"}&quot;
                  </span>
                </div>
                <p className="mt-2 text-xs text-text-muted">
                  Try another keyword or clear filters.
                </p>
                <Button onClick={clearFilters} variant="outline" className="mt-5">
                  Clear filters
                </Button>
              </div>
            ) : (
              <EmptyDocs />
            )
          ) : view === "table" ? (
            <TableView docs={filtered} selected={selected} setSelected={setSelected} />
          ) : (
            <GridView docs={filtered} />
          )}
        </div>
      </div>
    </AppShell>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-9 w-auto gap-1 border-border bg-background text-xs">
        <span className="text-text-muted">{label}:</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map(([v, l]) => (
          <SelectItem key={v} value={v}>
            {l}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function TableView({
  docs,
  selected,
  setSelected,
}: {
  docs: AppDocument[];
  selected: string[];
  setSelected: (s: string[]) => void;
}) {
  const toggleAll = () => setSelected(selected.length === docs.length ? [] : docs.map((d) => d.id));
  const toggle = (id: string) =>
    setSelected(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-surface-soft text-xs text-text-secondary">
          <tr>
            <th className="w-10 px-4 py-2.5">
              <Checkbox
                checked={selected.length === docs.length && docs.length > 0}
                onCheckedChange={toggleAll}
              />
            </th>
            <th className="px-2 py-2.5 text-left font-medium">Document</th>
            <th className="px-4 py-2.5 text-left font-medium">Status</th>
            <th className="hidden px-4 py-2.5 text-left font-medium md:table-cell">Tags</th>
            <th className="hidden px-4 py-2.5 text-left font-medium lg:table-cell">Size</th>
            <th className="hidden px-4 py-2.5 text-left font-medium lg:table-cell">Questions</th>
            <th className="hidden px-4 py-2.5 text-left font-medium md:table-cell">Updated</th>
            <th className="w-10 px-4 py-2.5"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {docs.map((d) => (
            <tr key={d.id} className="hover:bg-surface-soft">
              <td className="px-4 py-3">
                <Checkbox checked={selected.includes(d.id)} onCheckedChange={() => toggle(d.id)} />
              </td>
              <td className="px-2 py-3">
                <Link href={`/documents/${d.slug}`} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-soft text-text-secondary">
                    <DocIcon type={d.type} />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{d.title}</div>
                    <div className="text-xs text-text-muted">{d.pages} pages</div>
                  </div>
                </Link>
              </td>
              <td className="px-4 py-3">
                <StatusPill status={d.status} />
              </td>
              <td className="hidden px-4 py-3 md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {d.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </td>
              <td className="hidden px-4 py-3 font-mono text-xs text-text-secondary lg:table-cell">
                {d.size}
              </td>
              <td className="hidden px-4 py-3 text-text-secondary lg:table-cell">{d.questions}</td>
              <td className="hidden px-4 py-3 text-text-secondary md:table-cell">{d.updatedAt}</td>
              <td className="px-4 py-3">
                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded p-1 text-text-muted hover:bg-surface-soft hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Open</DropdownMenuItem>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GridView({ docs }: { docs: AppDocument[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {docs.map((d) => (
        <Link
          key={d.id}
          href={`/documents/${d.slug}`}
          className="group flex flex-col rounded-xl border border-border bg-surface p-5 transition hover:border-text-muted"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-soft text-text-secondary">
              <DocIcon type={d.type} className="h-5 w-5" />
            </div>
            <StatusPill status={d.status} />
          </div>
          <div className="mt-4 font-medium">{d.title}</div>
          <p className="mt-1 line-clamp-2 text-xs text-text-secondary">{d.summary}</p>
          <div className="mt-4 flex flex-wrap gap-1">
            {d.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-text-secondary"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-text-muted">
            <span>{d.questions} questions</span>
            <span>{d.updatedAt}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function EmptyDocs() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface p-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft">
        <FileText className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mt-5 text-lg font-semibold">Your workspace is empty</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-text-secondary">
        Documents will appear here once storage and indexing are connected.
      </p>
    </div>
  );
}
