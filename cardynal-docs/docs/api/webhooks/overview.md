---
sidebar_position: 1
---

# Webhooks

Webhooks let you receive real-time notifications when events happen in Cardynal. Subscribe to events and Cardynal sends HTTP POST requests to your endpoint.

## How It Works

1. You create a webhook subscription in Cardynal (event type + target URL)
2. When the event occurs, Cardynal sends a POST request to your URL
3. Your server processes the event and returns a 200 response
4. If delivery fails, Cardynal retries (configurable)

## Creating a Webhook

### Via the API

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "message.received",
    "target_url": "https://your-server.com/webhook",
    "secret": "your-signing-secret",
    "max_retries": 3,
    "timeout_ms": 5000
  }' \
  "https://your-url/api/webhooks"
```

### Webhook Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `event_type` | string | Yes | Event to subscribe to |
| `target_url` | string | Yes | Your webhook endpoint URL |
| `headers` | object | No | Custom headers to include |
| `secret` | string | No | Secret for signature verification |
| `max_retries` | integer | No | Retry attempts on failure (default: 3) |
| `timeout_ms` | integer | No | Request timeout in ms (default: 5000) |

## Available Events

| Event | Description |
|-------|-------------|
| `message.received` | New message from a customer |
| `message.routed` | Message routed to an agent or bot |
| `message.sent` | Message sent to customer |
| `agent.message.sent` | Human agent sent a message |
| `session.created` | New chat session started |
| `session.closed` | Chat session closed |
| `tool.called` | AI agent called a tool |
| `contact.created` | New contact created |
| `contact.updated` | Contact information updated |
| `conversation.created` | New conversation started |
| `conversation.assigned` | Conversation assigned to an agent |
| `conversation.resolved` | Conversation marked as resolved |
| `ticket.created` | New ticket created |
| `ticket.updated` | Ticket modified |
| `escalation.triggered` | AI escalated to a human |
| `agent.assigned` | Agent assigned to a resource |
| `email.sent` | Email sent via Gmail |
| `whatsapp.sent` | Message sent via WhatsApp |
| `before.bot.response` | Fires before the AI generates a response |

See [Events](./events.md) for detailed payload examples.

## Webhook Delivery

### Request Format

Cardynal sends a POST request with:

**Headers:**
- `Content-Type: application/json`
- `X-Cardynal-Event: message.received`
- `X-Cardynal-Signature: sha256=...` (if secret is configured)
- Custom headers (if configured)

**Body:**
```json
{
  "event": "message.received",
  "timestamp": "2026-04-01T10:00:00Z",
  "data": {
    ...event-specific payload
  }
}
```

### Signature Verification

If you set a `secret` on your webhook, Cardynal signs the payload using HMAC-SHA256. Verify it server-side:

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(`sha256=${expected}`)
  );
}
```

### Retry Logic

If your endpoint returns a non-2xx status or times out:
- Cardynal retries up to `max_retries` times
- Retries use exponential backoff
- After all retries fail, the delivery is marked as failed

### Best Practices

- **Respond quickly** — Return 200 within 5 seconds; process the event asynchronously
- **Use signatures** — Always verify the HMAC signature to prevent spoofing
- **Handle duplicates** — Events may be delivered more than once; use idempotent processing
- **Monitor failures** — Check webhook delivery status regularly

## Managing Webhooks

### List Webhooks

```bash
GET /api/webhooks
```

### Update a Webhook

```bash
PUT /api/webhooks/:id
```

Update `event_type`, `target_url`, `headers`, `secret`, `max_retries`, `timeout_ms`, or `is_active`.

### Delete a Webhook

```bash
DELETE /api/webhooks/:id
```

### Test a Webhook

Send a test event to verify your endpoint:

```bash
POST /api/webhooks/:id/test
```

### Enable/Disable

Set `is_active` to `false` to pause deliveries without deleting the subscription.

## Testing Locally

Use a tunneling tool to expose your local server:

```bash
# Using ngrok
ngrok http 3000

# Then use the ngrok URL as your webhook target
# https://abc123.ngrok.io/webhook
```
