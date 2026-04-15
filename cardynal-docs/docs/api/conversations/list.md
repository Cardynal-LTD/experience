---
sidebar_position: 1
---

# List Conversations

Retrieve a paginated list of conversations for your organization.

## Endpoint

```
GET /api/chat/conversations
```

**Auth:** Bearer token (admin or agent role)

**Note:** Agents only see conversations assigned to them. Admins see all conversations.

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | - | Filter by status: `open`, `pending`, `resolved`, `snoozed` |
| `channel` | string | - | Filter by channel: `web`, `whatsapp`, `api`, `email` |
| `assigned_agent_id` | UUID | - | Filter by assigned agent |
| `inbox_id` | UUID | - | Filter by inbox |
| `contact_id` | UUID | - | Filter by contact |
| `search` | string | - | Full-text search |
| `limit` | integer | 50 | Results per page (max 100) |
| `offset` | integer | 0 | Pagination offset |

## Response

```json
{
  "conversations": [
    {
      "id": "uuid",
      "org_id": "uuid",
      "contact_id": "uuid",
      "inbox_id": "uuid",
      "channel": "web",
      "status": "open",
      "priority": "medium",
      "assigned_agent_id": "uuid",
      "subject": "Help with billing",
      "unread_count": 2,
      "ai_disabled": false,
      "first_message_at": "2026-04-01T10:00:00Z",
      "last_message_at": "2026-04-01T10:05:00Z",
      "created_at": "2026-04-01T10:00:00Z",
      "contacts": { "first_name": "Jane", "last_name": "Doe" },
      "org_agents": { "display_name": "John" },
      "chat_inboxes": { "name": "Website Chat" },
      "last_message": { "content": "I need help", "sender_type": "contact" },
      "last_session": { "id": "uuid", "status": "open" }
    }
  ],
  "total": 42
}
```

## Examples

### List open conversations

```bash
curl -H "Authorization: Bearer TOKEN" \
  "https://your-url/api/chat/conversations?status=open"
```

### Filter by channel

```bash
curl -H "Authorization: Bearer TOKEN" \
  "https://your-url/api/chat/conversations?channel=whatsapp&limit=20"
```

### Search

```bash
curl -H "Authorization: Bearer TOKEN" \
  "https://your-url/api/chat/conversations?search=billing"
```

## Related Endpoints

- [Create Conversation](./create.md)
- [Messages](./messages.md)
