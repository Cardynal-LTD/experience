---
sidebar_position: 3
---

# Messages

Retrieve and send messages within a conversation.

## List Messages

```
GET /api/chat/conversations/:conversationId/messages
```

**Auth:** Bearer token (admin or agent role)

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 50 | Messages per page |
| `offset` | integer | 0 | Pagination offset |

### Response

```json
{
  "messages": [
    {
      "id": "uuid",
      "conversation_id": "uuid",
      "sender_type": "contact",
      "content_type": "text",
      "content": "I need help with my account",
      "attachments": [],
      "is_private": false,
      "delivery_status": "delivered",
      "reactions": [],
      "created_at": "2026-04-01T10:00:00Z"
    },
    {
      "id": "uuid",
      "conversation_id": "uuid",
      "sender_type": "bot",
      "content_type": "text",
      "content": "I'd be happy to help! What's your account email?",
      "attachments": [],
      "is_private": false,
      "delivery_status": "sent",
      "reactions": [],
      "created_at": "2026-04-01T10:00:05Z"
    }
  ],
  "total": 15
}
```

### Sender Types

| Type | Description |
|------|-------------|
| `contact` | Message from the customer |
| `agent` | Message from a human agent |
| `bot` | Message from the AI agent |

### Content Types

| Type | Description |
|------|-------------|
| `text` | Plain text message |
| `image` | Image attachment |
| `file` | File attachment |
| `audio` | Audio message |
| `video` | Video message |
| `template` | WhatsApp template message |
| `system` | System-generated message |

## Send Message

```
POST /api/chat/conversations/:conversationId/messages
```

**Auth:** Bearer token (admin or agent role)

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string | Yes | Message text |
| `content_type` | string | No | Default: `text` |
| `attachments` | file[] | No | Up to 5 files via multipart upload |

### Response

```json
{
  "message": {
    "id": "uuid",
    "conversation_id": "uuid",
    "sender_type": "agent",
    "content_type": "text",
    "content": "I've updated your account.",
    "attachments": [],
    "created_at": "2026-04-01T10:05:00Z"
  }
}
```

## Send Private Note

Internal notes visible only to your team.

```
POST /api/chat/conversations/:conversationId/notes
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string | Yes | Note text |

### Response

```json
{
  "message": {
    "id": "uuid",
    "is_private": true,
    "sender_type": "agent",
    "content": "Customer seems frustrated, handle with care",
    "created_at": "2026-04-01T10:06:00Z"
  }
}
```

## Cross-Channel Message

Send a message via a different channel than the conversation's origin.

```
POST /api/chat/conversations/:conversationId/messages/cross-channel
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `target_channel` | string | Yes | `whatsapp`, `email`, etc. |
| `target_phone_or_email` | string | Yes | Recipient identifier |
| `content` | string | Yes | Message text |

## Message Reactions

### Add Reaction

```
POST /api/chat/messages/:id/reactions
```

```json
{ "emoji": "👍" }
```

### Remove Reaction

```
DELETE /api/chat/messages/:id/reactions
```

```json
{ "emoji": "👍" }
```

## Related Endpoints

- [List Conversations](./list.md)
- [Create Conversation](./create.md)
