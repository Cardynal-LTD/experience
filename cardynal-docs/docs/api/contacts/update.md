---
sidebar_position: 3
---

# Update Contact

Update an existing contact's information.

## Endpoint

```
PUT /api/chat/contacts/:id
```

**Auth:** Bearer token (admin or agent role)

## Request Body

All fields are optional. Only provided fields are updated.

| Field | Type | Description |
|-------|------|-------------|
| `first_name` | string | Contact's first name |
| `last_name` | string | Contact's last name |
| `email` | string | Email address |
| `phone` | string | Phone number |
| `external_id` | string | External system ID |
| `metadata` | object | Custom key-value pairs (merged with existing) |

## Response

```json
{
  "contact": {
    "id": "uuid",
    "org_id": "uuid",
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane@newdomain.com",
    "phone": "+1234567890",
    "external_id": "ext-123",
    "metadata": {"company": "Acme", "plan": "enterprise"},
    "updated_at": "2026-04-01T12:00:00Z"
  }
}
```

## Examples

### Update name

```bash
curl -X PUT \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"last_name": "Smith"}' \
  "https://your-url/api/chat/contacts/CONTACT_UUID"
```

### Update metadata

```bash
curl -X PUT \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"metadata": {"plan": "enterprise"}}' \
  "https://your-url/api/chat/contacts/CONTACT_UUID"
```

Metadata is **merged** with existing values. To remove a key, set it to `null`.

## Error Responses

| Status | Reason |
|--------|--------|
| `404` | Contact not found |
| `400` | Invalid email or phone format |
| `409` | Email or phone already exists |

## Delete Contact

```
DELETE /api/chat/contacts/:id
```

**Auth:** Bearer token (admin role only)

Returns `{"success": true}`.

## Related Endpoints

- [List Contacts](./list.md)
- [Create Contact](./create.md)
