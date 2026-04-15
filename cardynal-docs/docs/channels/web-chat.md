---
sidebar_position: 1
---

# Web Chat

The web chat widget is the fastest way to add Cardynal to your website. It's a customizable chat widget that connects directly to your Cardynal inbox and AI agent.

## Setup

1. Go to **Integrations** → **+ Add Integration** → **Web Chat**
2. Name your inbox (e.g., "Website Chat")
3. Assign an AI agent (optional but recommended)
4. Your inbox is created and ready

## Embedding the Widget

Add the widget script to your website before the closing `</body>` tag:

```html
<script
  src="https://your-cardynal-url/widget.js"
  data-api-key="YOUR_API_KEY"
></script>
```

The API key is found in **Settings** → **General** → **API Key**.

You can also pass an `inbox_id` to target a specific inbox:

```html
<script
  src="https://your-cardynal-url/widget.js"
  data-api-key="YOUR_API_KEY"
  data-inbox-id="YOUR_INBOX_ID"
></script>
```

## Widget Configuration

The widget appearance is controlled by the organization's **widget config** in Settings. Available options:

| Option | Default | Description |
|--------|---------|-------------|
| `position` | `bottom-right` | Widget position on the page |
| `primary_color` | `#262A65` | Primary brand color |
| `greeting` | "Hello! How can I help?" | Welcome message shown on first visit |
| `locale` | `en` | Widget language |

## How It Works

### Session Initialization

When a visitor opens the widget:

1. The widget sends an **init** request with the visitor's fingerprint
2. Cardynal finds or creates a **contact** for this visitor
3. A **conversation** is created or resumed
4. If a greeting message is configured, it's shown immediately

### Visitor Identification

You can pre-identify visitors by passing their information:

```html
<script
  src="https://your-cardynal-url/widget.js"
  data-api-key="YOUR_API_KEY"
  data-first-name="Jane"
  data-last-name="Doe"
  data-email="jane@example.com"
  data-phone="+1234567890"
></script>
```

This links the conversation to an identified contact, making it easier for agents to help.

### Message Flow

1. Visitor types a message in the widget
2. Message is sent to Cardynal and stored in the conversation
3. If an AI agent is assigned to the inbox:
   - The agent searches the knowledge base for relevant context
   - Generates a response using the configured LLM
   - Sends the response back to the widget
4. If a human agent is assigned or AI is disabled:
   - The message appears in the agent's inbox
   - The agent responds manually

### File Uploads

Visitors can upload files through the widget:
- Maximum file size: 5 MB
- Supported types: Images (PNG, JPG, GIF), PDF, CSV, TXT
- Files are stored in Cardynal and accessible from the conversation

### Message Reactions

Visitors can add emoji reactions to messages and rate individual messages (1-5 stars) for feedback.

## Inbox Configuration

Each web chat inbox has additional settings:

### Greeting Message

A message shown automatically when a new conversation starts. Set it in the inbox configuration.

### AI Settings

- **AI Enabled** — Toggle AI auto-responses for this inbox
- **AI Schedule** — Set hours when AI is active (useful for having AI handle off-hours only)
- **AI Timezone** — Timezone for the AI schedule

### Agent Assignment

Assign an AI agent to the inbox. The agent handles all new conversations on this channel.

## Full-Screen Mode

Cardynal also provides a full-screen widget version at `/widget-fullscreen`. This is useful for embedding in iframes or dedicated support pages.

## Troubleshooting

### Widget Not Appearing

- Verify the `data-api-key` is correct (check Settings → General)
- Check for JavaScript errors in the browser console
- Ensure the script URL points to your Cardynal instance

### Messages Not Received

- Verify the inbox is **active** (toggle in Integrations)
- Check that the inbox has an AI agent assigned (if you expect auto-responses)
- Verify the API key matches the organization

### CORS Issues

The widget is designed for cross-origin use. If you encounter CORS errors, ensure your Cardynal instance is configured to allow requests from your domain.
