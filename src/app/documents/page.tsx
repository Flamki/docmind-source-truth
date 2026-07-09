import type { Metadata } from "next";
import { DocumentsClient } from "./documents-client";

export const metadata: Metadata = {
  title: "Documents",
  description: "Search, filter, sort, and manage source documents in DocMind.",
};

export default function DocumentsPage() {
  return <DocumentsClient />;
}
