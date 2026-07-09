import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { UploadCloud, FileText, X, Check, AlertTriangle, ArrowRight } from "lucide-react";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

export const Route = createFileRoute("/upload")({
  head: () => ({ meta: [{ title: "Upload — DocMind" }] }),
  component: UploadPage,
});

type Stage = "idle" | "selected" | "processing" | "done" | "error";

const steps = [
  "Uploading file",
  "Extracting text",
  "Creating searchable chunks",
  "Ready for questions",
];

function UploadPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = (f: File) => {
    if (f.size > 10 * 1024 * 1024) {
      setStage("error");
      return;
    }
    setFile(f);
    setStage("selected");
  };

  const startProcessing = () => {
    setStage("processing");
    setCurrentStep(0);
    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      if (step >= steps.length) {
        clearInterval(timer);
        setStage("done");
      } else {
        setCurrentStep(step);
      }
    }, 900);
  };

  return (
    <AppShell breadcrumb={[{ label: "Upload" }]}>
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Upload document</h1>
          <p className="mt-1.5 text-sm text-text-secondary">
            Add a new source to your workspace. We'll extract and index it for questions.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-surface p-6">
          {stage === "idle" && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files[0];
                if (f) pick(f);
              }}
              onClick={() => inputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition ${dragOver ? "border-primary bg-accent-soft" : "border-border hover:border-text-muted hover:bg-surface-soft"}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft">
                <UploadCloud className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-4 text-sm font-medium">Drag and drop your PDF here</div>
              <div className="mt-1 text-xs text-text-muted">or click to browse</div>
              <div className="mt-6 text-[11px] text-text-muted">PDF, DOCX, TXT up to 10 MB</div>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && pick(e.target.files[0])}
              />
            </div>
          )}

          {(stage === "selected" || stage === "processing" || stage === "done") && file && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{file.name}</div>
                  <div className="text-xs text-text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
                {stage === "selected" && (
                  <button onClick={() => { setFile(null); setStage("idle"); }} className="rounded p-1.5 text-text-muted hover:bg-surface-soft hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {stage === "selected" && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="title">Document title</Label>
                    <Input id="title" defaultValue={file.name.replace(/\.[^.]+$/, "")} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="tags">Tags</Label>
                    <Input id="tags" placeholder="Add tags separated by commas" />
                  </div>
                  <div className="space-y-2">
                    <Label>Visibility</Label>
                    <RadioGroup defaultValue="private" className="grid grid-cols-2 gap-2">
                      <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-3 text-sm hover:bg-surface-soft">
                        <RadioGroupItem value="private" /> Private
                      </label>
                      <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-3 text-sm hover:bg-surface-soft">
                        <RadioGroupItem value="workspace" /> Workspace
                      </label>
                    </RadioGroup>
                  </div>
                  <Button className="w-full" onClick={startProcessing}>Upload and process</Button>
                </>
              )}

              {stage === "processing" && (
                <div className="space-y-3 py-2">
                  {steps.map((s, i) => {
                    const done = i < currentStep;
                    const active = i === currentStep;
                    return (
                      <div key={s} className="flex items-center gap-3 text-sm">
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full border ${done ? "border-[color:var(--color-success)] bg-[color:var(--color-success)] text-white" : active ? "border-primary bg-accent-soft text-primary" : "border-border text-text-muted"}`}>
                          {done ? <Check className="h-3.5 w-3.5" /> : <span className="text-[10px]">{i + 1}</span>}
                        </div>
                        <span className={done ? "text-text-secondary line-through" : active ? "text-foreground" : "text-text-muted"}>
                          {s}
                        </span>
                        {active && <div className="ml-auto h-1 w-16 overflow-hidden rounded-full bg-surface-soft"><div className="h-full w-1/2 animate-pulse bg-primary" /></div>}
                      </div>
                    );
                  })}
                </div>
              )}

              {stage === "done" && (
                <div className="rounded-lg border border-[color:var(--color-success)]/20 bg-[color:var(--color-success)]/5 p-5 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-success)]/15">
                    <Check className="h-5 w-5 text-[color:var(--color-success)]" />
                  </div>
                  <h3 className="mt-3 text-base font-semibold">Document ready</h3>
                  <p className="mt-1 text-sm text-text-secondary">You can now ask questions and view citations.</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <Button onClick={() => navigate({ to: "/documents/$slug", params: { slug: "product-requirements" } })} className="gap-1.5">
                      Open document <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={() => { setStage("idle"); setFile(null); }}>Upload another</Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {stage === "error" && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-destructive/15">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="mt-3 text-base font-semibold">Upload failed</h3>
              <p className="mt-1 text-sm text-text-secondary">The file is too large or unsupported.</p>
              <Button className="mt-4" variant="outline" onClick={() => setStage("idle")}>Try again</Button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-text-muted">
          Prefer to skip?{" "}
          <Link to="/dashboard" className="text-foreground hover:underline">Go to dashboard</Link>
        </div>
      </div>
    </AppShell>
  );
}
