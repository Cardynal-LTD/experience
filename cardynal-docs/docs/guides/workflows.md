---
sidebar_position: 5
---

# Building Workflows

Workflows let you automate support tasks with a visual drag-and-drop editor. Build event-driven automations, scheduled jobs, or webhook-triggered processes without writing code.

## Overview

A workflow is a directed acyclic graph (DAG) of nodes connected by edges. Each node performs an action, and data flows from one node to the next through the connections.

The workflow page shows:
- **Stats cards** — Total workflows, active count, executions in last 24h, failures
- **Workflow list** — Name, trigger type, last execution, status toggle, execution count

## Creating a Workflow

1. Go to **Workflows** in the sidebar
2. Click **+ New Workflow**
3. Enter a name and optionally a description
4. You're taken to the visual editor

You can also **import** a workflow from a JSON export.

## Trigger Types

Every workflow starts with a trigger — the event that kicks off execution.

| Trigger | Description | Example |
|---------|-------------|---------|
| **Event** | Fires when something happens in Cardynal | New message received, conversation assigned |
| **Manual** | Triggered by clicking "Run" | On-demand data export |
| **Cron** | Runs on a schedule (cron expression) | Daily summary at 9am |
| **Webhook** | Fires when an external HTTP request hits the workflow's URL | Third-party integration callback |
| **Agent Tool** | Called by an AI agent during a conversation | Agent needs to look up data |

### Event Triggers

Event triggers listen for specific Cardynal events:
- `message.received` — New message from a customer
- `conversation.created` — New conversation started
- `conversation.assigned` — Conversation assigned to an agent
- `conversation.resolved` — Conversation marked as resolved
- `ticket.created` — New ticket created
- `ticket.updated` — Ticket modified
- `escalation.triggered` — AI escalated to human
- `contact.created` — New contact added
- `session.created` / `session.closed` — Chat session lifecycle

You can scope event triggers to specific **AI agents** or **inboxes** using filters.

### Webhook Triggers

Each workflow with a webhook trigger gets a unique URL token. Send a GET, POST, PUT, DELETE, or PATCH request to trigger execution. The request body is available as context in the workflow.

### Cron Triggers

Use standard cron expressions for scheduled execution:
- `0 9 * * *` — Every day at 9:00 AM
- `*/15 * * * *` — Every 15 minutes
- `0 0 * * 1` — Every Monday at midnight

## Node Types

The visual editor supports 20+ node types organized by category.

### Control Flow

| Node | Description |
|------|-------------|
| **Condition** | If/else branching based on data |
| **Loop (forEach)** | Iterate over an array |
| **Wait / Delay** | Pause execution for a specified duration |
| **Merge** | Combine parallel execution paths |

### Actions

| Node | Description |
|------|-------------|
| **Send Message** | Send a message in a conversation |
| **Send Email** | Send an email |
| **Create Ticket** | Create a new ticket |
| **Update Ticket** | Modify an existing ticket |
| **Assign Conversation** | Assign a conversation to an agent |
| **Update Conversation** | Change conversation status, priority, etc. |

### Integration

| Node | Description |
|------|-------------|
| **HTTP Request** | Make an HTTP call to any API |
| **Code (JavaScript)** | Execute custom JavaScript code |
| **Tool Call** | Call a Cardynal tool |

### Data

| Node | Description |
|------|-------------|
| **Data Transform** | Map, filter, or reshape data |
| **Set Variable** | Store a value in workflow context |
| **Read Variable** | Retrieve a stored value |

## Building a Workflow

### Adding Nodes

1. Click the **+** button or drag from the node palette
2. Select the node type
3. Configure the node's parameters in the side panel

### Connecting Nodes

1. Drag from a node's output port to another node's input port
2. Edges define the execution order
3. Condition nodes have two outputs (true/false)

### Node Configuration

Click a node to open its configuration panel. Each node type has specific fields:

**Example: HTTP Request node**
- URL
- Method (GET, POST, etc.)
- Headers (key-value pairs)
- Body (JSON template)
- Response mapping

**Example: Condition node**
- Field to evaluate
- Operator (equals, contains, greater than, etc.)
- Value to compare against

### Using Context Variables

Data flows between nodes via the **context** object. Each node's output is available to downstream nodes.

Reference previous node outputs using the context variable syntax in node configuration fields.

## Testing & Debugging

### Pinned Data

Pin test data to specific nodes for development:
1. Select a node
2. Add pinned input data
3. Execute the workflow — pinned data overrides real input

### Test Execution

Click **Run** on the workflow page or use the **Execute** button in the editor. Test executions are marked as `is_test` and use pinned data when available.

### Execution History

View past executions from the workflow detail page:
- **Status** — Running, Completed, Failed, Cancelled, Waiting
- **Trigger type** — What triggered this execution
- **Duration** — How long it took
- **Error** — Error message and which node failed

Click an execution to see per-node logs:
- Input data received
- Output data produced
- Duration
- Status (running, completed, failed, skipped, waiting)
- Retry attempt number

### Retrying & Cancelling

- **Retry** a failed execution to re-run it
- **Cancel** a running or waiting execution

## Versioning

### Publishing

After building your workflow, click **Publish** to create a version snapshot. Optionally add a changelog description.

### Version History

View all published versions with timestamps and who published them. **Restore** a previous version if needed.

## Managing Workflows

### Activating/Deactivating

Toggle the **Active** switch on the workflow list. Only active workflows respond to event and cron triggers. Manual and webhook triggers work regardless of active status.

### Duplicating

Create a copy of a workflow with **Duplicate**. The copy is created as inactive.

### Exporting/Importing

- **Export** a workflow as JSON for backup or sharing
- **Import** a JSON workflow to create a new one

## Workflow Examples

### Auto-Tag by Channel

**Trigger:** Event — `conversation.created`

1. **Condition** — Check `conversation.channel`
2. **Update Conversation** — Add tag based on channel (e.g., "whatsapp", "email")

### SLA Reminder

**Trigger:** Cron — `*/30 * * * *` (every 30 minutes)

1. **HTTP Request** — Query tickets with approaching SLA deadlines
2. **Loop** — For each ticket
3. **Condition** — Check if SLA deadline is within 1 hour
4. **Send Message** — Notify the assigned agent

### Webhook Integration

**Trigger:** Webhook

1. **Data Transform** — Parse incoming webhook payload
2. **Condition** — Route based on event type
3. **Create Ticket** or **Send Message** — Take action

## Best Practices

- **Do** start with simple workflows and add complexity incrementally
- **Do** use pinned data to test before activating
- **Do** publish versions before making major changes
- **Do** name your nodes descriptively
- **Do** use conditions to handle edge cases
- **Don't** create infinite loops (the engine has safeguards but it wastes executions)
- **Don't** forget to activate the workflow after testing
- **Don't** hardcode values that might change — use variables instead
