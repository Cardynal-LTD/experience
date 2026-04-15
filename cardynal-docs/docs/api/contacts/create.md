---
sidebar_position: 2
---

# Create Contact

Create a new contact in your organization.

## Endpoint

```
POST /api/chat/contacts
```

**Auth:** Bearer token (admin or agent role)

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `first_name` | string | No | Contact's first name |
| `last_name` | string | No | Contact's last name |
| `email` | string | No | Email address (unique per org) |
| `phone` | string | No | Phone number (unique per org) |
| `external_id` | string | No | ID from your external system |
| `metadata` | object | No | Custom key-value pairs |

## Response

```json
{
  "contact": {
    "id": "uuid",
    "org_id": "uuid",
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "external_id": null,
    "metadata": {},
    "channel_identifiers": {},
    "created_at": "2026-04-01T10:00:00Z"
  }
}
```

## Examples

### Basic contact

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"first_name": "Jane", "last_name": "Doe", "email": "jane@example.com"}' \
  "https://your-url/api/chat/contacts"
```

### With metadata

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jane",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "metadata": {"company": "Acme", "plan": "pro"}
  }' \
  "https://your-url/api/chat/contacts"
```

## Error Responses

| Status | Reason |
|--------|--------|
| `400` | Invalid email or phone format |
| `409` | Email or phone already exists in this organization |

## Related Endpoints

- [List Contacts](./list.md)
- [Update Contact](./update.md)
