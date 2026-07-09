export type DocStatus = "ready" | "processing" | "failed";

export interface MockDocument {
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

export const mockDocuments: MockDocument[] = [
  {
    id: "doc_1",
    slug: "product-requirements",
    title: "Product Requirements.pdf",
    type: "PDF",
    status: "ready",
    size: "2.4 MB",
    pages: 14,
    questions: 12,
    tags: ["Product", "Research"],
    updatedAt: "2 hours ago",
    summary:
      "Product goals, launch risks, user roles, and open decisions for the first release.",
  },
  {
    id: "doc_2",
    slug: "resume-feedback",
    title: "Resume Feedback.pdf",
    type: "PDF",
    status: "ready",
    size: "860 KB",
    pages: 3,
    questions: 8,
    tags: ["Career"],
    updatedAt: "Yesterday",
    summary:
      "Feedback on resume structure, missing keywords, and project positioning.",
  },
  {
    id: "doc_3",
    slug: "legal-agreement",
    title: "Legal Agreement.pdf",
    type: "PDF",
    status: "processing",
    size: "1.1 MB",
    pages: 22,
    questions: 0,
    tags: ["Legal"],
    updatedAt: "10 min ago",
    summary:
      "Standard mutual NDA covering IP, confidentiality windows, and jurisdiction clauses.",
  },
  {
    id: "doc_4",
    slug: "research-notes",
    title: "Research Notes.pdf",
    type: "PDF",
    status: "ready",
    size: "4.8 MB",
    pages: 41,
    questions: 19,
    tags: ["Research", "Important"],
    updatedAt: "3 days ago",
    summary:
      "Field notes on retrieval augmented generation, benchmarks, and citation UX patterns.",
  },
  {
    id: "doc_5",
    slug: "api-spec",
    title: "API Spec v2.docx",
    type: "DOCX",
    status: "ready",
    size: "540 KB",
    pages: 9,
    questions: 4,
    tags: ["Product"],
    updatedAt: "1 week ago",
    summary: "Draft endpoints for document ingestion, search, and citation retrieval.",
  },
  {
    id: "doc_6",
    slug: "meeting-notes",
    title: "Meeting Notes.txt",
    type: "TXT",
    status: "ready",
    size: "12 KB",
    pages: 1,
    questions: 2,
    tags: ["Career"],
    updatedAt: "2 weeks ago",
    summary: "Notes from planning sync — action items and owners.",
  },
];

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

export const mockMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    content: "What are the main risks in this document?",
  },
  {
    id: "m2",
    role: "assistant",
    content:
      "The main risks are delayed onboarding, unclear ownership, and missing analytics before launch. The document also flags dependency on external review before release, which could push the timeline.",
    citations: [
      {
        id: 1,
        page: 3,
        title: "Launch risks",
        snippet:
          "Delayed onboarding may block activation for new users if sample data is not available at first login.",
        relevance: "High",
      },
      {
        id: 2,
        page: 7,
        title: "Dependencies",
        snippet:
          "External review is required before release, which may affect the launch timeline by up to two weeks.",
        relevance: "High",
      },
      {
        id: 3,
        page: 9,
        title: "Analytics gap",
        snippet:
          "No baseline analytics are configured. Activation and retention cannot be measured on day one.",
        relevance: "Medium",
      },
    ],
  },
];

export const suggestedQuestions = [
  "Summarize this document in 5 bullets",
  "What are the risks mentioned?",
  "What decisions are required?",
  "What dates or deadlines are inside?",
  "What should I review first?",
];

export const activityFeed = [
  { id: "a1", type: "upload", text: "Uploaded Resume Feedback.pdf", time: "2h ago" },
  { id: "a2", type: "ask", text: "Asked \u201CWhat skills are missing?\u201D", time: "3h ago" },
  { id: "a3", type: "delete", text: "Deleted Old Notes.pdf", time: "Yesterday" },
  { id: "a4", type: "citation", text: "Generated 12 citations", time: "2d ago" },
];

export const stats = {
  documents: 24,
  questions: 183,
  citations: 421,
  storage: "42 MB",
};
