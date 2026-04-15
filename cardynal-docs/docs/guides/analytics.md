---
sidebar_position: 6
---

# Analytics & Dashboard

The dashboard gives you a real-time overview of your support operations. It's the first page you see after signing in.

## Dashboard Layout

### Greeting & Alerts

The top of the dashboard shows:
- A personalized greeting ("Good morning, [Name]")
- Current date
- An **attention badge** if there are unread messages, unassigned conversations, or open tickets

### Onboarding Checklist

For new workspaces, a checklist tracks your initial setup:
- Create an Agent
- Connect an Inbox
- Add a Source

Once all items are completed, the checklist disappears.

## KPI Cards

Five key metrics displayed as animated cards:

| Metric | Description |
|--------|-------------|
| **Total Sessions** | Number of chat sessions, with a 14-day sparkline chart |
| **Avg AI Response** | Average AI response time, with human response time in the footer |
| **Open Tickets** | Count of open tickets (amber highlight if > 0), clickable to view them |
| **Ticket Resolution Time** | Average resolution time in hours (red highlight if > 24h) |
| **AI Resolution Rate** | Percentage of sessions resolved by AI, shown as a radial gauge |

## Charts

### Top Playbooks & Escalations

**Left section:**
- Top 4 playbooks ranked by usage count with horizontal bars
- Top 3 escalation rules ranked by trigger count
- Total escalation count

This helps you understand which conversation flows are most common and where escalations happen.

### Activity Chart

**Right section:**
- 30-day area chart with three lines:
  - **Total Sessions** (indigo)
  - **Resolved** (green)
  - **Escalated** (orange)
- Hover for daily values
- Legend showing color codes

## Recent Activity

### Recent Conversations

- Filter by inbox (dropdown)
- Quick stat buttons (click to filter):
  - **Open** conversations
  - **Unassigned** conversations
  - **Unread** conversations
- Paginated conversation list
- "View All" link to the inbox

### Recent Tickets

- Filter by ticket type (dropdown)
- Quick stat buttons:
  - **Open** tickets
  - **Assigned to Me**
  - **Due Today**
- Paginated ticket list
- "View All" link to records

### Attention Items

A compact sidebar listing items that need immediate attention:
- Unread messages count
- Unassigned conversations count
- Open tickets count

Each item is clickable and navigates to the relevant view.

## Agent Performance

From the **Agents** page, each agent card shows performance metrics:

| Metric | Description |
|--------|-------------|
| **Sessions** | Total sessions handled by this agent |
| **Resolution Rate** | Percentage of sessions resolved by AI |
| **Avg First Response** | Average time to first response |
| **Trend** | Performance change percentage (color-coded) |

## Usage Tracking

Go to **Settings** → **Usage** tab to see your organization's resource consumption:

- API calls this month
- Messages processed
- Storage used
- Usage trends over time

These metrics are tracked against your plan's quotas. Approaching limits will show warnings.

## Tips for Using Analytics

- **Check the dashboard daily** to catch issues early (unassigned conversations, SLA breaches)
- **Monitor escalation patterns** — high escalation rates may indicate knowledge gaps
- **Track AI resolution rate** — this is your primary automation metric
- **Review playbook usage** — unused playbooks may need better triggers or should be removed
- **Watch response times** — both AI and human response times affect customer satisfaction
