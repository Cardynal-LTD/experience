---
sidebar_position: 1
---

# API Overview

The Cardynal API lets you integrate Cardynal with your systems. Use it to manage conversations, contacts, tickets, and trigger workflows programmatically.

## Base URL

All API endpoints are relative to your Cardynal instance:

```
https://your-cardynal-url/api
```

## Authentication

All API requests require authentication via a **Bearer token** (JWT from Supabase Auth).

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://your-cardynal-url/api/chat/conversations
```

For widget/public endpoints, use an **API key** via the `X-Api-Key` header:

```bash
curl -H "X-Api-Key: YOUR_API_KEY" \
  https://your-cardynal-url/api/widget/config
```

See [Authentication](./authentication.md) for details on obtaining tokens and API keys.

## Response Format

### Success

```json
{
  "conversations": [...],
  "total": 42
}
```

### Error

```json
{
  "error": "Not found",
  "reason": "Conversation does not exist"
}
```

## Error Codes

| Status | Meaning |
|--------|---------|
| `400` | Bad request — Missing or invalid parameters |
| `401` | Unauthorized — Invalid or missing authentication |
| `402` | Payment required — Plan quota exceeded |
| `403` | Forbidden — Insufficient role/permissions |
| `404` | Not found — Resource doesn't exist |
| `409` | Conflict — Duplicate resource (e.g., email already exists) |
| `429` | Too many requests — Rate limit exceeded |
| `500` | Internal error — Server-side issue |

## Rate Limiting

Rate limits vary by endpoint:

| Endpoint Category | Limit |
|-------------------|-------|
| Login / Signup | 20 per 15 minutes |
| Widget init / messages | 30 per 60 seconds per API key |
| Widget file upload | 5 per 60 seconds |
| Webhook triggers | 200 per 60 seconds |
| General API | Standard rate limits apply |

When rate limited, you receive a `429` response. Wait and retry with exponential backoff.

## Pagination

List endpoints support pagination with `limit` and `offset`:

```bash
GET /api/chat/conversations?limit=20&offset=40
```

Response includes a `total` field for calculating pages:

```json
{
  "conversations": [...],
  "total": 150
}
```

Default limit is 50 for most endpoints.

## Filtering

List endpoints support various query parameters for filtering:

```bash
GET /api/chat/conversations?status=open&channel=whatsapp&assigned_agent_id=UUID
```

See individual endpoint docs for available filters.

## API Domains

The API is organized into these domains:

| Domain | Base Path | Description |
|--------|-----------|-------------|
| [Auth](#) | `/api/auth/*`, `/api/login`, `/api/signup` | Authentication and user management |
| [Conversations](./conversations/list.md) | `/api/chat/conversations` | Conversation CRUD, status, assignment |
| [Messages](./conversations/messages.md) | `/api/chat/conversations/:id/messages` | Send and retrieve messages |
| [Contacts](./contacts/list.md) | `/api/chat/contacts` | Contact management |
| [Tickets](#) | `/api/tickets` | Ticket CRUD, comments, types |
| [Agents](#) | `/api/agent-bots` | AI agent configuration |
| [Sources](#) | `/api/sources` | Knowledge base management |
| [Workflows](#) | `/api/workflows` | Workflow CRUD and execution |
| [Webhooks](./webhooks/overview.md) | `/api/webhooks` | Webhook subscriptions |
| [Widget](#) | `/api/widget` | Public chat widget API |
| [Workspace](#) | `/api/workspace` | Team, billing, settings |

## Quick Example

### List Open Conversations

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://your-cardynal-url/api/chat/conversations?status=open&limit=10"
```

### Send a Message

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content": "Hello! How can I help?"}' \
  "https://your-cardynal-url/api/chat/conversations/CONV_ID/messages"
```

### Create a Ticket

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Login issue", "type_id": "TYPE_UUID", "priority": "high"}' \
  "https://your-cardynal-url/api/tickets"
```
