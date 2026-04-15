---
sidebar_position: 1
---

# List Contacts

Retrieve a paginated list of contacts for your organization.

## Endpoint

```
GET /api/chat/contacts
```

**Auth:** Bearer token (admin or agent role)

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `search` | string | - | Search by name, email, phone, or message content |
| `channel` | string | - | Filter by channel identifier |
| `date_from` | string | - | Filter by creation date (ISO 8601) |
| `date_to` | string | - | Filter by creation date (ISO 8601) |
| `limit` | integer | 50 | Results per page |
| `offset` | integer | 0 | Pagination offset |

## Response

```json
{
  "contacts": [
    {
      "id": "uuid",
      "org_id": "uuid",
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "jane@example.com",
      "phone": "+1234567890",
      "avatar_url": null,
      "external_id": null,
      "metadata": {},
      "channel_identifiers": {},
      "last_seen_at": "2026-04-01T10:00:00Z",
      "created_at": "2026-03-15T08:00:00Z"
    }
  ],
  "total": 150
}
```

## Examples

### Search by name

```bash
curl -H "Authorization: Bearer TOKEN" \
  "https://your-url/api/chat/contacts?search=jane"
```

### Filter by date range

```bash
curl -H "Authorization: Bearer TOKEN" \
  "https://your-url/api/chat/contacts?date_from=2026-04-01&date_to=2026-04-13"
```

## Related Endpoints

- [Create Contact](./create.md)
- [Update Contact](./update.md)
