import type { Metadata } from "next";
import { SettingsClient } from "./settings-client";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage DocMind profile, workspace, appearance, and danger-zone settings.",
};

export default function SettingsPage() {
  return <SettingsClient />;
}
