---
sidebar_position: 2
---

# Branding

Customize the chat widget appearance to match your brand.

## Widget Configuration

The widget's look and behavior are controlled by the organization's `widget_config` in Settings.

### Position

Where the widget appears on the page.

| Value | Description |
|-------|-------------|
| `bottom-right` | Bottom-right corner (default) |

### Primary Color

The main brand color used for:
- Widget header background
- Send button
- Message bubbles (outgoing)
- Interactive elements

Set a hex color value (e.g., `#262A65`, `#FF6B00`).

### Greeting Message

A welcome message shown automatically when a visitor opens the chat widget for the first time.

**Example:** "Hello! How can I help you today?"

Leave empty to skip the greeting.

### Locale

The widget language. Affects system messages and UI labels in the widget.

| Value | Language |
|-------|----------|
| `en` | English |
| `fr` | French |
| `he` | Hebrew |

## Applying Changes

1. Go to **Settings** → **General**
2. Update the organization settings
3. Changes apply immediately to all web chat widgets using your API key
4. No need to update the embed code — the widget fetches the latest config on load

## Embed Code

The widget embed code stays the same regardless of branding changes:

```html
<script
  src="https://your-cardynal-url/widget.js"
  data-api-key="YOUR_API_KEY"
></script>
```

The widget automatically loads your organization's branding configuration via the API key.

## Testing Changes

1. Make your branding changes in Settings
2. Open your website in a new incognito window
3. The widget should reflect the updated colors, greeting, and locale
4. Test on mobile devices to verify responsive layout

## Best Practices

- **Do** choose a primary color that contrasts well with white text (for readability)
- **Do** write a friendly, concise greeting message
- **Do** test the widget on both desktop and mobile after changes
- **Don't** use very light colors as the primary color — text may become unreadable
- **Don't** make the greeting message too long — keep it under 2 sentences
