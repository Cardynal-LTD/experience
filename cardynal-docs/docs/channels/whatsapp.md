---
sidebar_position: 2
---

# WhatsApp

Cardynal supports two methods for connecting WhatsApp: via **Unipile** (personal or business numbers) and via the **Meta Cloud API** (official WhatsApp Business API).

## Method 1: WhatsApp via Unipile

Connect any WhatsApp number by scanning a QR code. This is the fastest method.

### Setup

1. Go to **Integrations** → **+ Add Integration** → **WhatsApp**
2. A QR code is displayed
3. Open WhatsApp on your phone → **Settings** → **Linked Devices** → **Link a Device**
4. Scan the QR code
5. The inbox status changes to **Connected**

### Managing the Connection

- **Status** — Shows Connected or Disconnected
- **Reconnect** — If the connection drops, click to get a new QR code
- **Sync** — Force-sync messages from WhatsApp
- **Delete** — Remove the WhatsApp inbox

### How It Works

- Incoming WhatsApp messages are routed to Cardynal via Unipile webhooks
- Messages appear in your inbox like any other channel
- Your AI agent responds automatically if assigned
- Replies are sent back through WhatsApp via the Unipile API

## Method 2: WhatsApp Business (Meta Cloud API)

For official business accounts using the Meta WhatsApp Business API. This provides better reliability and access to message templates.

### Prerequisites

- Meta Business Manager account
- Verified WhatsApp Business account
- A phone number registered with WhatsApp Business
- Access token from Meta

### Setup

1. Go to **Integrations** → **+ Add Integration** → **WhatsApp Business**
2. Complete the Meta Embedded Signup flow
3. Provide:
   - **Phone Number ID** — From Meta Business Manager
   - **Business Account ID** — From Meta Business Manager
   - **Access Token** — Long-lived token from Meta
4. Cardynal verifies the connection

### Meta Webhook Configuration

Cardynal receives incoming messages via Meta's webhook system:
- Webhook verification is handled automatically
- Messages are verified using HMAC signatures for security
- Read receipts are sent back to WhatsApp when agents view messages

### Managing the Connection

- **Status** — Check connection status at any time
- **Disconnect** — Remove the WhatsApp Business integration
- **Read Receipts** — Sent automatically when conversations are marked as read in Cardynal

## Conversations

### How Conversations Work

- Each WhatsApp contact gets a single conversation in Cardynal
- New messages from the same number continue the existing conversation
- The contact's phone number is used as the channel identifier

### Message Types

WhatsApp supports:
- **Text** messages
- **Images** — Displayed inline in the conversation
- **Files** — Attachments viewable/downloadable
- **Audio** — Voice messages
- **Video** — Video messages

### 24-Hour Window (Meta API)

The Meta WhatsApp Business API has a 24-hour messaging window:
- You can respond freely within 24 hours of the customer's last message
- After 24 hours, you must use an approved **message template**
- Template messages need pre-approval from Meta

This limitation applies only to the Meta Cloud API method, not Unipile.

## AI Agent Integration

Assign an AI agent to your WhatsApp inbox:
1. Go to **Integrations** → select your WhatsApp inbox
2. Click **Assign Bot** and select an agent
3. The agent auto-responds to incoming messages using your knowledge base

## Troubleshooting

### Connection Drops (Unipile)

WhatsApp Web connections can drop occasionally:
- Go to **Integrations** and check the status
- Click **Reconnect** to scan a new QR code
- Keep WhatsApp active on your phone for stable connections

### Messages Not Sending (Meta API)

- Verify the access token is valid and not expired
- Check that the phone number is properly registered
- For messages after 24 hours, ensure you're using an approved template
- Review the connection status in Integrations

### Duplicate Messages

If you see duplicate messages:
- Check that you don't have both Unipile and Meta API connected for the same number
- Verify webhook configuration isn't duplicated
