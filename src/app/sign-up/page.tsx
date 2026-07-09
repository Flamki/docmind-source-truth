import type { Metadata } from "next";
import { SignUpClient } from "./sign-up-client";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create an empty DocMind workspace.",
};

export default function SignUpPage() {
  return <SignUpClient />;
}
