import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/error")({
  head: () => ({ meta: [{ title: "Something went wrong — DocMind" }, { name: "robots", content: "noindex" }] }),
  component: ErrorPage,
});

function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-mono text-xs uppercase tracking-widest text-text-muted">Error</div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="mt-2 text-sm text-text-secondary">
          An unexpected error occurred while loading this page. You can try again or head back.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button onClick={() => window.location.reload()}>Try again</Button>
          <Link to="/dashboard"><Button variant="outline">Open workspace</Button></Link>
        </div>
      </div>
    </div>
  );
}
