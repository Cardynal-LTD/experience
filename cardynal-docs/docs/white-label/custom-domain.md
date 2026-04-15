---
sidebar_position: 3
---

# Custom Domain

Use your own domain for the Cardynal support portal and widget instead of the default Cardynal URL.

## Overview

With a custom domain, your customers interact with your brand at every touchpoint:
- Chat widget loads from `support.yourcompany.com` instead of the Cardynal URL
- API requests go through your domain

## Prerequisites

- Access to your domain's DNS settings
- A subdomain you want to use (e.g., `support.yourcompany.com`)

## Setup

### Step 1: Choose Your Domain

Pick a subdomain for your support portal:
- `support.yourcompany.com` (recommended)
- `chat.yourcompany.com`
- `help.yourcompany.com`

### Step 2: Configure DNS

Add a CNAME record pointing your subdomain to your Cardynal instance:

| Record Type | Name | Value |
|-------------|------|-------|
| CNAME | support | your-cardynal-url |

**DNS provider examples:**

**Cloudflare:**
1. Go to DNS → Add Record
2. Type: CNAME
3. Name: `support`
4. Target: `your-cardynal-url`
5. Proxy status: DNS only (gray cloud)

**GoDaddy:**
1. Go to DNS Management
2. Add → CNAME
3. Host: `support`
4. Points to: `your-cardynal-url`
5. TTL: 1 Hour

**Google Domains:**
1. Go to DNS → Custom Records
2. Host name: `support`
3. Type: CNAME
4. Data: `your-cardynal-url`

### Step 3: SSL Certificate

Once DNS propagates (usually 5-30 minutes), SSL is configured automatically. Your custom domain will serve over HTTPS.

### Step 4: Update Widget Embed

Update your widget embed code to use the custom domain:

```html
<script
  src="https://support.yourcompany.com/widget.js"
  data-api-key="YOUR_API_KEY"
></script>
```

### Step 5: Verify

1. Open `https://support.yourcompany.com` in your browser
2. Verify the SSL certificate is valid (padlock icon)
3. Test the chat widget on your website

## Troubleshooting

### DNS Not Resolving

- CNAME records can take up to 48 hours to propagate (usually much faster)
- Verify the record is correct with `dig support.yourcompany.com CNAME`
- Ensure there's no conflicting A record for the same subdomain

### SSL Certificate Issues

- SSL provisioning requires DNS to be properly configured first
- If using Cloudflare, set the proxy to "DNS only" (gray cloud) during setup
- Wait 5-10 minutes after DNS propagation for SSL to provision

### Widget Not Loading

- Verify the `src` URL in the embed code points to your custom domain
- Check browser console for CORS or mixed content errors
- Ensure HTTPS is working on your custom domain

## Best Practices

- **Do** use a subdomain (not your root domain)
- **Do** test SSL before updating production embed codes
- **Do** keep the old Cardynal URL as a fallback during migration
- **Don't** use a subdomain that's already serving other content
- **Don't** delete the CNAME record after setup — it's needed permanently
