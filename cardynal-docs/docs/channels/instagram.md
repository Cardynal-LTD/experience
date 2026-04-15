---
sidebar_position: 4
---

# Instagram

Connect Instagram DMs to Cardynal via Unipile. Receive and respond to customer messages from Instagram directly in your unified inbox.

## Prerequisites

- An Instagram Business or Creator account
- Unipile integration configured in your Cardynal instance

## Setup

1. Go to **Integrations** → **+ Add Integration** → **Instagram**
2. Follow the Unipile authentication flow
3. Sign in to your Instagram account when prompted
4. Once authorized, the inbox is created and shows **Connected**

## How It Works

### Receiving Messages

- Instagram DMs are forwarded to Cardynal via Unipile webhooks
- Each Instagram user becomes a contact in Cardynal
- New DMs create conversations, subsequent messages continue them

### Responding

- Type your response in the Cardynal inbox
- The reply is sent back through Instagram DMs via Unipile
- The customer sees a normal Instagram DM

### Supported Content

- **Text** messages
- **Images** — Displayed inline
- **Media** — Photos and videos from Instagram

## AI Integration

Assign an AI agent to your Instagram inbox for auto-responses:
1. Go to **Integrations** → select the Instagram inbox
2. Assign a bot
3. The AI responds to incoming DMs using your knowledge base

## Managing the Connection

- **Status** — Connected or Disconnected
- **Reconnect** — Re-authenticate if the connection drops
- **Delete** — Remove the Instagram inbox

## Limitations

- Instagram imposes rate limits on messages
- Media support depends on Instagram's API capabilities
- Connection stability depends on Unipile's service

## Troubleshooting

### DMs Not Appearing

- Check that the inbox is active and connected
- Verify the Instagram account is a Business or Creator account
- Re-authenticate through the Unipile flow if disconnected

### Can't Reply

- Verify the connection status is **Connected**
- Check for rate limiting from Instagram
- Ensure the recipient hasn't blocked or restricted your account
