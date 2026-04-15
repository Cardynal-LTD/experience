---
sidebar_position: 3
---

# Ticketing

The ticketing system lets you track issues, feature requests, bugs, and any structured work item. Tickets complement conversations — link them together to maintain full context.

## Overview

The tickets page (**Records** in the sidebar) supports three views:
- **List** — Compact rows with sorting and filtering
- **Kanban** — Drag-and-drop cards organized by status columns
- **Hierarchy** — Tree view showing parent/child relationships

## Ticket Properties

Every ticket has these core properties:

| Property | Description |
|----------|-------------|
| **Ticket Number** | Auto-generated per organization (e.g., TKT-001, BUG-042) |
| **Subject** | Short title describing the issue |
| **Description** | Detailed description (rich text) |
| **Type** | Custom ticket type (e.g., Bug, Feature Request, Task) |
| **Status** | Current state — configurable per type |
| **Priority** | Low, Medium, High, or Urgent |
| **Assigned Agent** | Team member responsible |
| **Contact** | Customer related to this ticket |
| **Tags** | Labels for categorization |
| **Custom Fields** | Type-specific fields you define |

## Ticket Statuses

Default statuses:

| Status | Category | Meaning |
|--------|----------|---------|
| **Open** | open | New, not started |
| **In Progress** | active | Being worked on |
| **On Hold** | active | Blocked or waiting |
| **Resolved** | done | Issue fixed |
| **Cancelled** | cancelled | Won't fix / duplicate |

Statuses are **customizable per ticket type** — you can create your own statuses and assign them to categories (open, active, done, cancelled). The category determines how the status behaves in filters and reports.

## Custom Ticket Types

Create ticket types that match your workflow.

### Creating a Type

1. Go to **Records** → **Settings** (gear icon) → **Configure Types**
2. Click to add a new type
3. Set:
   - **Name** — e.g., "Bug Report", "Feature Request"
   - **Prefix** — e.g., "BUG", "FEAT" (used in ticket numbers)
   - **Color** — For visual identification
   - **Icon** — Optional icon or emoji
   - **SLA Response Hours** — Time limit for first response
   - **SLA Resolution Hours** — Time limit for resolution
   - **Default View** — List, Kanban, or Calendar

### Custom Statuses

Each type can have its own status flow:

1. Edit a ticket type
2. Go to **Statuses**
3. Add, rename, reorder, or color-code statuses
4. Assign each to a category (open, active, done, cancelled)

### Custom Fields

Add type-specific fields to capture structured data.

**Supported field types:**
- Text, Textarea, Number
- Date, DateTime
- Select (dropdown), Multiselect
- User (team member picker), Contact (customer picker)
- URL, Email
- Currency, Checkbox

1. Edit a ticket type → **Fields**
2. Add fields with a name, key, type, and whether it's required
3. For select/multiselect, define the options

Custom field values are stored in the ticket's `custom_fields` JSON and appear in the ticket detail panel.

## Creating Tickets

### From the UI

1. Go to **Records** → **+ New**
2. Select the ticket type
3. Fill in:
   - Subject (required)
   - Description
   - Priority
   - Assigned agent
   - Tags
4. Click Create

### From a Conversation

Link tickets to conversations for full context:
1. Open a conversation in the inbox
2. Click **Related Tickets**
3. Create a new ticket or link an existing one

### From Workflows

Use the **Create Ticket** node in a workflow to auto-create tickets based on events (e.g., create a bug ticket when a conversation is escalated).

## Managing Tickets

### Filtering

Use the filter bar to narrow the list:
- **Status** — Filter by one or more statuses
- **Priority** — Low, Medium, High, Urgent
- **Assigned Agent** — Filter by assignee
- **Tags** — Filter by tag
- **Type** — Use the tab bar to filter by ticket type
- **Search** — Full-text search across subjects and descriptions

### Saved Views

Save filter combinations as named views:
1. Set your filters
2. Click **Save View**
3. Name the view (e.g., "My Open Bugs", "Due Today")
4. Saved views appear as tabs for quick access
5. Reorder views by dragging

### Kanban View

When viewing a specific ticket type, switch to Kanban to see tickets organized by status columns:
- Drag tickets between columns to change status
- Each card shows ticket ID, subject, priority, and assignee

## Ticket Detail

Click a ticket to open the detail panel on the right side:

### Header
- Ticket ID and type
- Subject (editable)
- Status dropdown
- Priority dropdown

### Body
- Description (rich text, editable)
- Custom fields
- Assigned agent
- Contact information
- Tags

### Activity Timeline

The bottom section shows a chronological audit trail:
- **Comments** — Team discussion about the ticket
- **Status changes** — Who changed it and when
- **Assignment changes** — Reassignments
- **Priority changes** — Escalations/de-escalations
- **System events** — Automated actions

### Adding Comments

Type in the comment input at the bottom of the detail panel. Comments support attachments.

## SLA Tracking

If your ticket type has SLA hours configured:

- **Response Deadline** — When the first response must happen
- **Resolution Deadline** — When the ticket must be resolved
- **First Response At** — When someone first responded

SLA deadlines are calculated from the ticket creation time. The dashboard highlights tickets approaching or past their SLA deadlines.

## Ticket Links

Link related tickets together:

1. Open a ticket detail
2. Go to **Links**
3. Click to add a link
4. Select the related ticket and relationship type:
   - **Related** — General association
   - **Duplicates** — This ticket duplicates another
   - **Blocks / Blocked by** — Dependency tracking

## Tags

Manage tags organization-wide:
1. Go to **Records** → **Settings** → **Configure Tags**
2. Create tags with names and colors
3. Apply tags to tickets for categorization and filtering

## Best Practices

- **Do** create ticket types that match your actual workflow (bugs, features, tasks)
- **Do** customize statuses per type — a "Bug" has different states than a "Feature Request"
- **Do** set SLA hours to track response and resolution times
- **Do** use custom fields to capture structured data (version, environment, severity)
- **Do** link tickets to conversations for full context
- **Don't** create too many ticket types — keep it manageable
- **Don't** skip the description — it's the primary context for whoever works on the ticket
- **Don't** forget to update status as work progresses
