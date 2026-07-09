# API And Server Action Plan

The current app exposes a complete UI shell. These are the server actions/endpoints required to satisfy the full Digital Heroes production checklist.

| Action           | Method/path                        | Input                           | Output                        | Auth                   |
| ---------------- | ---------------------------------- | ------------------------------- | ----------------------------- | ---------------------- |
| Sign up          | `POST /api/auth/signup`            | `name`, `email`, `password`     | user + verification state     | public, rate-limited   |
| Sign in          | `POST /api/auth/signin`            | `email`, `password`             | session cookie                | public, rate-limited   |
| Sign out         | `POST /api/auth/signout`           | none                            | cleared session               | signed in              |
| List documents   | `GET /api/documents`               | query, filters, sort, cursor    | page of documents             | workspace member       |
| Create document  | `POST /api/documents`              | file metadata, tags, visibility | created document              | member+                |
| Update document  | `PATCH /api/documents/:id`         | title, tags, visibility         | updated document              | member+                |
| Delete document  | `DELETE /api/documents/:id`        | soft-delete flag                | deleted document              | admin/owner or creator |
| Ask document     | `POST /api/documents/:id/messages` | question                        | assistant message + citations | viewer+                |
| Export documents | `GET /api/documents/export.csv`    | filters                         | streamed CSV                  | member+                |
| Audit events     | `GET /api/audit`                   | entity filters, cursor          | audit event page              | admin/owner            |

All inputs should be validated with Zod on the server. All list endpoints should mirror filter state into URL query parameters and use cursor pagination with stable sorting.
