---
sidebar_position: 2
---

# Create Conversation

Create a new conversation with a contact.

## Endpoint

```
POST /api/chat/conversations
```

**Auth:** Bearer token (admin or agent role)

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contact_id` | UUID | Yes | The contact to create a conversation with |
| `channel` | string | No | Channel type: `web`, `whatsapp`, `api`, `email`. Default: `web` |
| `subject` | string | No | Conversation subject |
| `assigned_agent_id` | UUID | No | Agent to assign |
| `priority` | string | No | `low`, `medium`, `high`, `urgent`. Default: `medium` |
| `inbox_id` | UUID | No | Target inbox |

## Response

```json
{
  "conversation": {
    "id": "uuid",
    "org_id": "uuid",
    "contact_id": "uuid",
    "channel": "web",
    "status": "open",
    "priority": "medium",
    "assigned_agent_id": null,
    "subject": "New inquiry",
    "unread_count": 0,
    "ai_disabled": false,
    "created_at": "2026-04-01T10:00:00Z"
  }
}
```

## Examples

### Basic conversation

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"contact_id": "uuid"}' \
  "https://your-url/api/chat/conversations"
```

### With assignment and priority

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "contact_id": "uuid",
    "subject": "Urgent billing issue",
    "assigned_agent_id": "agent-uuid",
    "priority": "high"
  }' \
  "https://your-url/api/chat/conversations"
```

## Error Responses

| Status | Reason |
|--------|--------|
| `400` | Missing `contact_id` or invalid fields |
| `404` | Contact not found |

## Related Endpoints

- [List Conversations](./list.md)
- [Messages](./messages.md)
