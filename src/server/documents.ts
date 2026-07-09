import { z } from "zod";

export const documentFiltersSchema = z.object({
  query: z.string().trim().max(120).optional(),
  status: z.enum(["ready", "processing", "failed", "all"]).default("all"),
  type: z.enum(["PDF", "DOCX", "TXT", "all"]).default("all"),
  tag: z.string().trim().max(40).optional(),
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});

export const createDocumentSchema = z.object({
  title: z.string().trim().min(1).max(160),
  type: z.enum(["PDF", "DOCX", "TXT"]),
  sizeBytes: z
    .number()
    .int()
    .positive()
    .max(10 * 1024 * 1024),
  tags: z.array(z.string().trim().min(1).max(40)).max(12).default([]),
  visibility: z.enum(["private", "workspace"]).default("private"),
});

export const askDocumentSchema = z.object({
  documentId: z.string().min(1),
  question: z.string().trim().min(1).max(2_000),
});

export type DocumentFiltersInput = z.infer<typeof documentFiltersSchema>;
export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type AskDocumentInput = z.infer<typeof askDocumentSchema>;
