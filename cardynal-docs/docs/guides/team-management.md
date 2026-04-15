---
sidebar_position: 7
---

# Team Management

Manage your support team, assign roles, and configure availability from the **Team** page.

## Roles

Cardynal has three roles with different access levels:

| Role | Access |
|------|--------|
| **Owner** | Full access to everything including billing and organization settings. One per workspace. |
| **Admin** | Full access to agents, workflows, knowledge base, settings, and all conversations/tickets. Can invite and manage team members. |
| **Agent** | Access to inbox (only assigned conversations), tickets, and contacts. Cannot configure agents, workflows, or settings. |

## Inviting Team Members

1. Go to **Team** in the sidebar
2. Click **+ Add Member**
3. Fill in:
   - **Email** (required)
   - **First Name**
   - **Last Name**
   - **Role** — Admin or Agent
4. Click **Create**

After creation, Cardynal displays temporary credentials:
- Email address
- Temporary password

Copy these and share them with the team member. They'll use these to sign in for the first time.

## Managing Members

The team page shows a table with:
- Avatar and display name
- Email
- Role badge
- Online status (online, away, offline)
- Availability schedule
- Actions (set availability, remove)

### Changing Roles

Only admins and owners can change roles:
1. Find the team member in the list
2. Edit their role

### Removing Members

1. Click the **Remove** (trash) icon next to the team member
2. Confirm the removal

Removing a member unlinks them from the organization. Their conversations are unassigned.

## Availability & Presence

### Online Status

Team members have three presence states:
- **Online** (green) — Active and available
- **Away** (yellow) — Temporarily unavailable
- **Offline** (gray) — Not signed in

Presence updates automatically when users interact with Cardynal, and can be set manually.

### Availability Scheduling

Set working hours for each agent:

1. Click the **Calendar** icon next to an agent
2. The availability dialog opens with:
   - **Timezone** selector
   - **Weekly schedule grid** — Monday through Friday, with hour rows
3. Click cells to toggle available/unavailable
4. Save

Availability scheduling helps with:
- Automatic conversation routing to available agents
- AI schedule settings on inboxes (AI can take over outside business hours)

### Self-Service

Agents can set their own availability from the sidebar without needing admin permissions.

## Workspace Settings

Go to **Settings** in the sidebar:

### General Tab

- **Organization name** — Displayed in the UI
- **Slug** — URL-friendly identifier (read-only)
- **API Key** — For widget embedding (with copy button, only prefix visible)
- **Regenerate API Key** — Create a new key (invalidates the old one)

### Profile Tab

Each user can update their own:
- First name and last name
- Password (requires current password)

### Billing Tab

View your current subscription:
- Plan name and tier
- Billing period
- Upgrade options
- Paddle billing portal link

### Usage Tab

Monitor resource consumption against plan quotas:
- Sessions used / limit
- AI messages
- Storage
- Workflow executions

## Best Practices

- **Do** use the Agent role for frontline support staff — it limits access to only what they need
- **Do** set availability schedules so conversations are routed to available agents
- **Do** regenerate your API key if you suspect it was compromised
- **Don't** give Admin access to everyone — it includes sensitive settings and billing
- **Don't** forget to remove team members who leave the organization
- **Don't** share temporary passwords via insecure channels
