---
sidebar_position: 1
---

# White-Label Overview

Cardynal's white-label features let you customize the customer-facing experience with your own branding.

## What Can Be Customized

### Chat Widget

The embeddable chat widget supports these customizations:
- **Position** — Where the widget appears on the page (default: bottom-right)
- **Primary color** — Brand color for the widget header, buttons, and accents
- **Greeting message** — Welcome message shown when a visitor opens the chat
- **Locale** — Widget language

### Organization Identity

- **Organization name** — Displayed in the dashboard and communications
- **API key** — Unique per organization for widget authentication

## How It Works

Widget configuration is stored per organization as a JSON object. When the widget loads on your customer's site, it fetches the config and applies the branding.

```json
{
  "position": "bottom-right",
  "primary_color": "#262A65",
  "greeting": "Hello! How can I help?",
  "locale": "en"
}
```

## Getting Started

1. Go to **Settings** → **General**
2. Set your organization name
3. The widget config is applied to all web chat inboxes in your organization
4. Embed the widget on your site using your API key

## Use Cases

**SaaS Companies**
Offer customer support under your own brand. Your customers interact with a chat widget that matches your product's look and feel.

**Agencies**
Manage multiple client accounts, each with their own branding and API key.

**Enterprise**
Maintain brand consistency across all customer touchpoints.

## Next Steps

- [Branding](./branding.md) — Configure widget colors, greeting, and positioning
- [Custom Domain](./custom-domain.md) — Use your own domain for the support portal
