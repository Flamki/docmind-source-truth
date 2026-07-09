import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <div className="relative flex h-7 w-7 items-center justify-center rounded-md bg-foreground">
        <div className="h-2.5 w-3.5 rounded-[2px] bg-primary" />
      </div>
      {showText && (
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          DocMind
        </span>
      )}
    </Link>
  );
}
