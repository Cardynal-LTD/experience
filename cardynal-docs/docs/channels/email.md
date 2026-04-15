---
sidebar_position: 3
---

# Email (Gmail)

Connect a Gmail account to handle email conversations in Cardynal. Incoming emails become conversations in your inbox, and replies are sent back through Gmail.

## Setup

1. Go to **Integrations** → **+ Add Integration** → **Gmail**
2. Click to start the OAuth authorization flow
3. You'll be redirected to Google — sign in and authorize Cardynal
4. After authorization, you're redirected back and the inbox is created

The connected email address appears in the Integrations list.

## How It Works

### Receiving Emails

Cardynal polls your Gmail inbox for new messages at regular intervals:
- New emails create a new conversation (or continue an existing one if threading matches)
- The sender is matched to an existing contact or a new contact is created
- Email subject becomes the conversation subject

### Sending Replies

When an agent or AI responds in Cardynal, the reply is sent through Gmail:
- The reply maintains the email thread
- Your Gmail address appears as the sender
- Recipients see it as a normal email reply

### Threading

Email conversations are threaded automatically:
- Replies to the same thread continue the conversation
- New emails from the same sender on a different subject create separate conversations

## AI Integration

Assign an AI agent to your Gmail inbox:
1. Go to **Integrations** → select your Gmail inbox
2. Assign a bot
3. The AI agent auto-responds to incoming emails using your knowledge base

The AI's response is formatted as a plain text email reply.

## Managing the Connection

### Status

- **Connected** — Inbox is syncing normally
- **Disconnected** — OAuth token expired or revoked

### Reconnecting

If the connection is lost:
1. Go to **Integrations**
2. The Gmail inbox shows **Disconnected**
3. Re-authorize through the OAuth flow

### Removing

Delete the Gmail inbox from Integrations to stop syncing. Existing conversations are preserved.

## Limitations

- Only Gmail is supported (Google Workspace accounts included)
- Polling-based sync — slight delay before new emails appear
- Rich HTML formatting in emails is converted to plain text for AI processing
- File attachments from emails are stored as message attachments in Cardynal

## Troubleshooting

### Emails Not Appearing

- Verify the inbox status shows **Connected**
- Check that the Gmail account hasn't revoked access
- Gmail's OAuth tokens expire — reconnect if needed
- Check the inbox sync status and last sync time

### Replies Not Sending

- Verify the Gmail connection is active
- Check that the recipient email address is valid
- Review any error messages in the conversation
