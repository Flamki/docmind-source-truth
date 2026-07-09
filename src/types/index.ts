export type AppRole = "owner" | "admin" | "member" | "viewer";

export type DocStatus = "ready" | "processing" | "failed";

export interface AppDocument {
  id: string;
  slug: string;
  title: string;
  type: "PDF" | "DOCX" | "TXT";
  status: DocStatus;
  size: string;
  pages: number;
  questions: number;
  tags: string[];
  updatedAt: string;
  summary: string;
}

export interface Citation {
  id: number;
  page: number;
  title: string;
  snippet: string;
  relevance: "High" | "Medium" | "Low";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
}

export type AppRoute =
  "/" | "/dashboard" | "/documents" | "/upload" | "/settings" | "/sign-in" | "/sign-up";

export type MutationState = "idle" | "pending" | "success" | "error";
