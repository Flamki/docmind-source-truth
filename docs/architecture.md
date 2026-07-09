# DocMind Architecture

DocMind is a Next.js App Router app with SSR routing, React UI, Tailwind tokens, shadcn/Radix primitives, and strict TypeScript.

## Product Shape

```text
User -> Workspace -> Document -> DocumentChunk
User -> Workspace -> Conversation -> Message -> Citation -> DocumentChunk
User -> AuditEvent
```

## Data Model

| Entity            | Important fields                                                                                  | Relationships                           |
| ----------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `users`           | `id`, `email`, `name`, `role`, `email_verified_at`, `created_at`, `updated_at`                    | owns memberships and audit events       |
| `workspaces`      | `id`, `name`, `slug`, `created_at`, `updated_at`, `deleted_at`                                    | has many documents and members          |
| `memberships`     | `id`, `user_id`, `workspace_id`, `role`                                                           | joins users to workspaces               |
| `documents`       | `id`, `workspace_id`, `title`, `slug`, `type`, `status`, `size_bytes`, `page_count`, `deleted_at` | has chunks, conversations, audit events |
| `document_chunks` | `id`, `document_id`, `page`, `content`, `embedding`, `created_at`                                 | source material for retrieval           |
| `conversations`   | `id`, `document_id`, `created_by`, `title`, `created_at`                                          | has messages                            |
| `messages`        | `id`, `conversation_id`, `role`, `content`, `created_at`                                          | may have citations                      |
| `citations`       | `id`, `message_id`, `chunk_id`, `page`, `snippet`, `relevance`                                    | links answers to source chunks          |
| `audit_events`    | `id`, `actor_id`, `workspace_id`, `entity_type`, `entity_id`, `action`, `created_at`              | immutable event ledger                  |

## Auth And Authorization

Production should use Supabase Auth, Clerk, or Auth.js rather than custom crypto. Sessions must live in httpOnly, Secure, SameSite=Lax cookies; writes should require verified email; RBAC must be enforced on the server for `owner`, `admin`, `member`, and `viewer` roles. Every document mutation should verify workspace membership and row ownership before touching data.

## Validation

Use shared Zod schemas at every boundary:

- Form validation before submit.
- Server action/API validation before mutation.
- Environment validation during boot.
- File validation by MIME type and file size.

## Retrieval Flow

```text
Add file -> validate -> store file metadata -> extract text -> chunk by page/section
-> create embeddings -> save chunks -> ask question -> retrieve relevant chunks
-> generate answer -> persist message + citations -> render source chips
```

## Deployment

Deploy on Vercel or Netlify. Configure every variable from `.env.example` in project settings, run database migrations against production, and test a fresh incognito session against the live URL before submission.
