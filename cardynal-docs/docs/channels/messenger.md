---
sidebar_position: 5
---

# Facebook Messenger

Connect Facebook Messenger to Cardynal via Unipile. Handle customer messages from your Facebook Page directly in your unified inbox.

## Prerequisites

- A Facebook Page (Business or personal)
- Unipile integration configured in your Cardynal instance

## Setup

1. Go to **Integrations** → **+ Add Integration** → **Messenger**
2. Follow the Unipile authentication flow
3. Sign in to Facebook and select the Page to connect
4. Once authorized, the inbox is created and shows **Connected**

## How It Works

### Receiving Messages

- Messenger messages sent to your Page are forwarded to Cardynal via Unipile
- Each Facebook user becomes a contact in Cardynal
- Conversations are threaded per contact

### Responding

- Type your response in the Cardynal inbox
- The reply is sent back through Messenger via Unipile
- The customer sees a normal Messenger reply from your Page

### Supported Content

- **Text** messages
- **Images** — Photos shared in the conversation
- **Files** — Attachments

## AI Integration

Assign an AI agent to your Messenger inbox:
1. Go to **Integrations** → select the Messenger inbox
2. Assign a bot
3. The AI auto-responds to incoming messages

## Managing the Connection

- **Status** — Connected or Disconnected
- **Reconnect** — Re-authenticate if the connection drops
- **Delete** — Remove the Messenger inbox

## Limitations

- Facebook imposes rate limits on Page messaging
- Some interactive Messenger features (quick replies, persistent menu) are not available through Cardynal
- Connection stability depends on Unipile's service

## Troubleshooting

### Messages Not Appearing

- Check that the inbox is active and connected
- Verify the Facebook Page is published and messaging is enabled
- Re-authenticate if the connection dropped

### Can't Reply

- Verify the connection status
- Facebook has a 24-hour messaging window for Pages — after 24 hours, some message types may be restricted
- Check for rate limiting from Facebook
