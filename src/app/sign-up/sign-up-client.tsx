"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "../sign-in/sign-in-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpClient() {
  const router = useRouter();
  return (
    <AuthLayout>
      <h2 className="text-2xl font-semibold tracking-tight">Create your workspace</h2>
      <p className="mt-1.5 text-sm text-text-secondary">Start with an empty document workspace.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/documents");
        }}
        className="mt-6 space-y-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@work.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="8+ characters" />
        </div>
        <Button type="submit" className="w-full">
          Create workspace
        </Button>
        <div className="relative py-1 text-center">
          <span className="relative z-10 bg-surface px-2 text-xs text-text-muted">or</span>
          <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
        </div>
        <Button type="button" variant="outline" className="w-full">
          Continue with Google
        </Button>
        <p className="pt-2 text-center text-xs text-text-secondary">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-foreground hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
