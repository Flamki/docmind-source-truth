import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-mono text-xs uppercase tracking-widest text-text-muted">Error 404</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-sm text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Link href="/">
            <Button>Go home</Button>
          </Link>
          <Link href="/documents">
            <Button variant="outline">Open workspace</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
