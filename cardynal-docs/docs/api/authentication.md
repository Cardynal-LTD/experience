---
sidebar_position: 2
---

# Authentication

Cardynal uses two authentication methods depending on the context.

## Bearer Token (JWT)

For dashboard and API access. Tokens are issued by Supabase Auth (GoTrue) and cached for 30 seconds.

### Getting a Token

#### Login

```bash
POST /api/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your-password"
}
```

Response:

```json
{
  "token": "eyJ...",
  "refresh_token": "abc123",
  "expires_at": 1234567890,
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin",
    "first_name": "John",
    "last_name": "Doe",
    "org_id": "uuid"
  }
}
```

#### Google OAuth

```bash
POST /api/auth/google-callback
Content-Type: application/json

{
  "access_token": "google-access-token",
  "refresh_token": "google-refresh-token"
}
```

### Using the Token

Include the token in the `Authorization` header:

```bash
curl -H "Authorization: Bearer eyJ..." \
  https://your-cardynal-url/api/chat/conversations
```

### Refreshing Tokens

Tokens expire. Use the refresh token to get a new one:

```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refresh_token": "abc123"
}
```

Response:

```json
{
  "token": "eyJ...(new)",
  "refresh_token": "def456",
  "expires_at": 1234567890
}
```

### Verifying a Token

Check if a token is still valid:

```bash
GET /api/verify
Authorization: Bearer eyJ...
```

Response:

```json
{
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin",
    "org_id": "uuid"
  }
}
```

## API Key (Widget)

For the public chat widget. API keys are organization-scoped and hashed (SHA256) before storage.

### Getting Your API Key

1. Go to **Settings** → **General**
2. Copy the API key (only the prefix is visible; use the copy button)

Or via the API:

```bash
GET /api/workspace
Authorization: Bearer YOUR_TOKEN
```

The `api_key` field is in the response.

### Using the API Key

Include it in the `X-Api-Key` header:

```bash
curl -H "X-Api-Key: YOUR_API_KEY" \
  https://your-cardynal-url/api/widget/config
```

### Regenerating the API Key

If your key is compromised:

```bash
POST /api/workspace/regenerate-api-key
Authorization: Bearer YOUR_TOKEN
```

This invalidates the previous key immediately. Update the widget embed code on your website.

## Roles & Permissions

The JWT token includes the user's role. Endpoints enforce role-based access:

| Role | Access Level |
|------|-------------|
| `super_admin` | Platform-wide: organizations, users, plans, integrations catalog |
| `admin` | Organization-wide: agents, workflows, sources, settings, all conversations |
| `agent` | Limited: assigned conversations, tickets, contacts |

### Organization Scoping

All non-super-admin requests are scoped to the user's organization (`org_id` from the user record). You can only access resources belonging to your organization.

## Rate Limiting

Authentication endpoints have stricter rate limits:

| Endpoint | Limit |
|----------|-------|
| `POST /api/login` | 20 per 15 minutes |
| `POST /api/signup` | 20 per 15 minutes |

## Security Best Practices

- Store tokens securely — never expose them in client-side code or URLs
- Use refresh tokens to maintain sessions — don't store long-lived JWTs
- Regenerate API keys periodically
- Use HTTPS for all API requests
- Monitor for unauthorized access via the dashboard
