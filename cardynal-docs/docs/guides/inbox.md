---
sidebar_position: 1
---

# Using the Inbox

The inbox is where you manage all customer conversations across every channel. It's a three-column layout designed for efficient conversation handling.

## Layout

The inbox has three panels:

1. **Left panel** — Conversation list with filters
2. **Center panel** — Message thread (or table view when no conversation is selected)
3. **Right panel** — Contact sidebar with customer details

## Conversation Statuses

Every conversation has one of four statuses:

| Status | Meaning |
|--------|---------|
| **Open** | Active conversation, needs attention |
| **Pending** | Waiting for customer response |
| **Resolved** | Issue handled, conversation closed |
| **Snoozed** | Temporarily hidden, will reopen at a scheduled time |

### Changing Status

- Click the **status dropdown** in the conversation header
- Use **Resolve** to mark as resolved (this also closes all active sessions)
- Use **Snooze** and pick a date/time to temporarily hide the conversation

## Filtering & Search

Use the filter bar at the top of the conversation list:

- **Status** — Open, Pending, Resolved, Snoozed
- **Contact** — Search by contact name
- **Inbox** — Filter by channel/inbox
- **Search** — Full-text search across messages

Filters are chip-based — you can combine multiple filters at once.

## Conversation Priority

Conversations have four priority levels:

| Priority | Use For |
|----------|---------|
| **Low** | General inquiries, nice-to-have |
| **Medium** | Standard support (default) |
| **High** | Time-sensitive issues |
| **Urgent** | Critical problems, SLA at risk |

Set priority from the conversation header dropdown.

## Working with Messages

### Reading Messages

Click a conversation to open the message thread. Messages show:
- **Sender** — Contact (customer), Agent (human), or Bot (AI)
- **Content** — Text, images, files, audio, video
- **Timestamp** — When the message was sent
- **Delivery status** — Sent, Delivered, Read, or Failed

### Sending Messages

Type in the message input area at the bottom:
- Rich text editing supported
- Attach files using the attachment button (up to 5 files per message)
- Use emoji picker
- Hit Enter or click Send

### Private Notes

Send internal notes that only your team can see:
- Click the **Notes** button in the message input
- Write your note and send
- Notes appear with a distinct style in the thread and are never visible to the customer

### Reactions

Add emoji reactions to messages for quick acknowledgment.

### Cross-Channel Messaging

Send a message via a different channel than the one the conversation started on:
- Click the cross-channel option
- Select the target channel (WhatsApp, email, etc.)
- Provide the phone number or email
- Send

## Assignment

### Assigning Conversations

Assign a conversation to a team member:
1. Click the **Assign** dropdown in the conversation header
2. Select an agent from the list
3. The agent is notified and the conversation appears in their queue

Agents with the **agent** role only see conversations assigned to them. Admins see all conversations.

### AI Toggle

Toggle AI assistance on/off per conversation:
- Click the **AI toggle** button in the conversation header
- When disabled, the AI agent won't auto-respond to this conversation
- Useful when a human needs to handle a specific case

## Contact Sidebar

The right panel shows customer information:
- **Name** and avatar
- **Email** and phone number
- **Custom fields** / metadata
- **Recent conversations** — Other conversations with this contact
- **Associated tickets** — Tickets linked to this customer

## Canned Responses

Use predefined message templates for common responses:
1. Canned responses are managed in **Chat → Canned Responses**
2. Create responses with a shortcut (e.g., `/hello`) and content
3. When typing a message, trigger the shortcut to insert the template

## Unread Count

The sidebar shows the total unread message count. Mark a conversation as read by opening it or using the **Mark as read** action.

## Table View

When no conversation is selected, the center panel shows a table view with:
- Contact avatar and name
- Subject
- Status badge
- Channel icon
- Timestamp
- AI/escalation indicators

Click any row to open the conversation thread.

## Best Practices

- **Do** use statuses consistently — move conversations to Pending when waiting for the customer
- **Do** add private notes for context when handing off to a teammate
- **Do** use canned responses for repetitive answers
- **Do** resolve conversations promptly to keep the queue clean
- **Don't** leave conversations in Open status indefinitely
- **Don't** forget to check unassigned conversations regularly
