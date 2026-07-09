"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/app/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ReactNode } from "react";

export function SignInClient() {
  const router = useRouter();
  return (
    <AuthLayout>
      <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
      <p className="mt-1.5 text-sm text-text-secondary">Sign in to continue to your workspace.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/documents");
        }}
        className="mt-6 space-y-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@work.com" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs text-text-secondary hover:text-foreground">
              Forgot password?
            </a>
          </div>
          <Input id="password" type="password" placeholder="Enter your password" />
        </div>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
        <div className="relative py-1 text-center">
          <span className="relative z-10 bg-surface px-2 text-xs text-text-muted">or</span>
          <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
        </div>
        <Button type="button" variant="outline" className="w-full">
          Continue with Google
        </Button>
        <p className="pt-2 text-center text-xs text-text-secondary">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-medium text-foreground hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <div className="hidden flex-col justify-between border-r border-border bg-surface/40 p-10 lg:flex">
        <Logo />
        <div>
          <h1 className="max-w-md text-4xl font-semibold leading-[1.1] tracking-tight">
            Your documents, <span className="citation-highlight">searchable</span> and explainable.
          </h1>
          <p className="mt-4 max-w-md text-sm text-text-secondary">
            DocMind is a calm, citation-first AI workspace. Every answer links to the exact page it
            came from.
          </p>
        </div>
        <div className="text-xs text-text-muted">© {new Date().getFullYear()} DocMind</div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-8">
          <div className="mb-4 lg:hidden">
            <Logo />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
