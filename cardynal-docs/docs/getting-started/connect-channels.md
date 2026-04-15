---
sidebar_position: 2
---

# Connecting Channels

Cardynal supports multiple channels. All messages flow into a unified inbox regardless of the source.

## Available Channels

| Channel | Connection Method | Setup Time |
|---------|------------------|------------|
| Web Chat | Embed script | 2 minutes |
| WhatsApp | Unipile or Meta Business API | 5-10 minutes |
| Gmail | OAuth2 | 3 minutes |
| Instagram | Via Unipile | 5 minutes |
| Messenger | Via Unipile | 5 minutes |

All channels are managed from **Integrations** in the sidebar.

## Web Chat

The fastest way to get started. Cardynal provides an embeddable chat widget for your website.

1. Go to **Integrations** → **+ Add Integration** → **Web Chat**
2. Name your inbox (e.g., "Website Support")
3. Optionally assign an AI agent
4. Copy the embed code and paste it before `</body>` on your website

**Customization options** (via widget config in Settings):
- Position (bottom-right by default)
- Primary color
- Greeting message
- Locale

See [Web Chat](../channels/web-chat.md) for advanced configuration.

## WhatsApp

Cardynal offers two WhatsApp integration methods.

### WhatsApp via Unipile

Connect your personal or business WhatsApp number via QR code.

1. Go to **Integrations** → **+ Add Integration** → **WhatsApp**
2. A QR code appears — scan it with WhatsApp on your phone
3. Once connected, the inbox status shows "Connected"

### WhatsApp Business (Meta Cloud API)

For official business accounts with the Meta Business API.

**Prerequisites:**
- Meta Business Manager account
- Verified WhatsApp Business account
- Phone number registered with WhatsApp Business

**Setup:**
1. Go to **Integrations** → **+ Add Integration** → **WhatsApp Business**
2. Complete the Meta Embedded Signup flow
3. Provide your Phone Number ID, Business Account ID, and Access Token
4. Cardynal verifies the connection and starts receiving messages

See [WhatsApp](../channels/whatsapp.md) for template messages, 24-hour window rules, and more.

## Gmail

Connect a Gmail account to handle email conversations in Cardynal.

1. Go to **Integrations** → **+ Add Integration** → **Gmail**
2. Click to start the OAuth flow — you'll be redirected to Google
3. Authorize Cardynal to access your Gmail inbox
4. Once authorized, you're redirected back and the inbox is created

Cardynal polls your Gmail inbox for new messages and syncs them into conversations.

See [Email](../channels/email.md) for details.

## Instagram & Messenger

Instagram DMs and Facebook Messenger are connected via Unipile.

1. Go to **Integrations** → **+ Add Integration**
2. Select **Instagram** or **Messenger** (under Channels)
3. Follow the Unipile authentication flow
4. Once connected, messages appear in your inbox

See [Instagram](../channels/instagram.md) and [Messenger](../channels/messenger.md) for platform-specific features.

## Managing Inboxes

Each connected channel creates an **inbox**. To manage inboxes:

1. Go to **Integrations**
2. Each inbox shows:
   - **Status** — Connected or Disconnected (with reconnect option)
   - **AI Agent** — Which agent handles this channel
   - **Toggle** — Enable or disable the inbox
3. Click the config button to edit settings like greeting message, AI schedule, and assigned agent

## Assigning AI Agents to Channels

Each inbox can have one AI agent assigned to it.

1. Go to **Integrations** → select your inbox
2. Click **Assign Bot** or edit the inbox settings
3. Select the agent from the dropdown
4. Save

The agent uses its configured system prompt, playbooks, tools, and knowledge base to respond.

## Next Steps

- [Training Your AI](./train-your-ai.md) — Add knowledge so your agent can answer accurately
- [Using the Inbox](../guides/inbox.md) — Learn how to manage conversations across channels
