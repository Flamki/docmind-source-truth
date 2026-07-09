import { cn } from "@/lib/utils";
import type { DocStatus } from "@/lib/mock-data";

export function StatusPill({ status, className }: { status: DocStatus; className?: string }) {
  const styles: Record<DocStatus, string> = {
    ready: "bg-[color:var(--color-success)]/10 text-[color:var(--color-success)] border-[color:var(--color-success)]/20",
    processing: "bg-accent-soft text-primary border-accent-border/60",
    failed: "bg-destructive/10 text-destructive border-destructive/20",
  };
  const labels: Record<DocStatus, string> = {
    ready: "Ready",
    processing: "Processing",
    failed: "Failed",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        styles[status],
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "ready" && "bg-[color:var(--color-success)]",
          status === "processing" && "bg-primary animate-pulse",
          status === "failed" && "bg-destructive",
        )}
      />
      {labels[status]}
    </span>
  );
}
