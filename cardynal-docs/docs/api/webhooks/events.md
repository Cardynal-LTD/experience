---
sidebar_position: 2
---

# Webhook Events

Detailed payload examples for each webhook event type.

## Conversation Events

### conversation.created

Fired when a new conversation is started.

```json
{
  "event": "conversation.created",
  "timestamp": "2026-04-01T10:00:00Z",
  "data": {
    "id": "uuid",
    "org_id": "uuid",
    "contact_id": "uuid",
    "inbox_id": "uuid",
    "channel": "web",
    "status": "open",
    "priority": "medium",
    "subject": null,
    "created_at": "2026-04-01T10:00:00Z"
  }
}
```

### conversation.assigned

Fired when a conversation is assigned to an agent.

```json
{
  "event": "conversation.assigned",
  "timestamp": "2026-04-01T10:05:00Z",
  "data": {
    "id": "uuid",
    "assigned_agent_id": "uuid",
    "previous_agent_id": null,
    "assigned_by": "uuid"
  }
}
```

### conversation.resolved

Fired when a conversation is marked as resolved.

```json
{
  "event": "conversation.resolved",
  "timestamp": "2026-04-01T10:30:00Z",
  "data": {
    "id": "uuid",
    "resolved_at": "2026-04-01T10:30:00Z",
    "resolved_by": "uuid"
  }
}
```

## Message Events

### message.received

Fired when a new message arrives from a customer.

```json
{
  "event": "message.received",
  "timestamp": "2026-04-01T10:00:00Z",
  "data": {
    "id": "uuid",
    "conversation_id": "uuid",
    "sender_type": "contact",
    "content_type": "text",
    "content": "I need help with my account",
    "attachments": [],
    "created_at": "2026-04-01T10:00:00Z"
  }
}
```

### message.sent

Fired when a message is sent to the customer (by agent or bot).

```json
{
  "event": "message.sent",
  "timestamp": "2026-04-01T10:00:05Z",
  "data": {
    "id": "uuid",
    "conversation_id": "uuid",
    "sender_type": "bot",
    "content": "I'd be happy to help! What's your account email?",
    "created_at": "2026-04-01T10:00:05Z"
  }
}
```

### message.routed

Fired when a message is routed to an agent or bot for handling.

```json
{
  "event": "message.routed",
  "timestamp": "2026-04-01T10:00:01Z",
  "data": {
    "message_id": "uuid",
    "conversation_id": "uuid",
    "routed_to": "bot",
    "agent_bot_id": 1
  }
}
```

## Session Events

### session.created

Fired when a new chat session starts within a conversation.

```json
{
  "event": "session.created",
  "timestamp": "2026-04-01T10:00:00Z",
  "data": {
    "id": "uuid",
    "conversation_id": "uuid",
    "inbox_id": "uuid",
    "status": "open",
    "created_at": "2026-04-01T10:00:00Z"
  }
}
```

### session.closed

Fired when a chat session is closed.

```json
{
  "event": "session.closed",
  "timestamp": "2026-04-01T10:30:00Z",
  "data": {
    "id": "uuid",
    "conversation_id": "uuid",
    "status": "closed",
    "billable": true,
    "ai_reason": "Resolved billing inquiry",
    "ai_confidence": 0.92,
    "closed_at": "2026-04-01T10:30:00Z"
  }
}
```

## Contact Events

### contact.created

```json
{
  "event": "contact.created",
  "timestamp": "2026-04-01T10:00:00Z",
  "data": {
    "id": "uuid",
    "org_id": "uuid",
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "metadata": {},
    "created_at": "2026-04-01T10:00:00Z"
  }
}
```

### contact.updated

```json
{
  "event": "contact.updated",
  "timestamp": "2026-04-01T12:00:00Z",
  "data": {
    "id": "uuid",
    "changes": {
      "email": {
        "old": "jane@old.com",
        "new": "jane@new.com"
      }
    },
    "updated_at": "2026-04-01T12:00:00Z"
  }
}
```

## Ticket Events

### ticket.created

```json
{
  "event": "ticket.created",
  "timestamp": "2026-04-01T10:00:00Z",
  "data": {
    "id": "uuid",
    "org_id": "uuid",
    "ticket_number": 42,
    "prefix": "BUG",
    "subject": "Login page broken",
    "status": "open",
    "priority": "high",
    "assigned_agent_id": "uuid",
    "ticket_type_id": "uuid",
    "created_at": "2026-04-01T10:00:00Z"
  }
}
```

### ticket.updated

```json
{
  "event": "ticket.updated",
  "timestamp": "2026-04-01T11:00:00Z",
  "data": {
    "id": "uuid",
    "changes": {
      "status": { "old": "open", "new": "in_progress" },
      "assigned_agent_id": { "old": null, "new": "uuid" }
    },
    "updated_at": "2026-04-01T11:00:00Z"
  }
}
```

## AI Events

### escalation.triggered

Fired when the AI agent decides to escalate to a human.

```json
{
  "event": "escalation.triggered",
  "timestamp": "2026-04-01T10:10:00Z",
  "data": {
    "conversation_id": "uuid",
    "escalation_rule_id": 5,
    "reason": "Customer requested human agent",
    "assigned_to": "uuid"
  }
}
```

### tool.called

Fired when the AI agent calls a tool during a conversation.

```json
{
  "event": "tool.called",
  "timestamp": "2026-04-01T10:05:00Z",
  "data": {
    "conversation_id": "uuid",
    "tool_id": 3,
    "tool_name": "lookup-account",
    "input": {"email": "jane@example.com"},
    "output": {"account_id": "acc-123", "plan": "pro"}
  }
}
```

### before.bot.response

Fires before the AI generates a response. Use this to inject context or modify the prompt.

```json
{
  "event": "before.bot.response",
  "timestamp": "2026-04-01T10:00:03Z",
  "data": {
    "conversation_id": "uuid",
    "message_id": "uuid",
    "contact_id": "uuid"
  }
}
```

## Handling Events

Example Node.js/Express handler:

```javascript
app.post('/webhook', (req, res) => {
  const { event, data } = req.body;

  switch (event) {
    case 'message.received':
      console.log('New message:', data.content);
      break;
    case 'conversation.resolved':
      console.log('Conversation resolved:', data.id);
      break;
    case 'ticket.created':
      console.log('New ticket:', data.subject);
      break;
    default:
      console.log('Unhandled event:', event);
  }

  res.status(200).json({ ok: true });
});
```
