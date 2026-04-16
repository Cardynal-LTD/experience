---
sidebar_position: 2
---

# Building & Configuring AI Agents

AI agents are the core of Cardynal's automation. An agent is an autonomous system that receives customer messages, decides how to respond, and can take actions like searching your knowledge base, calling external APIs, creating tickets, sending emails, or handing off to a human.

This guide covers everything from creating your first agent to building advanced multi-playbook setups with tools and escalation rules.

## How an Agent Works

When a customer sends a message, Cardynal automatically:

1. **Routes** the message to the most relevant playbook or escalation rule based on intent and conversation context. Routing is multilingual — a message in any language can match a playbook written in another.
2. **Executes** the selected playbook, calling any connected tools (knowledge base search, API calls, ticket creation, etc.) as needed.
3. **Grounds** the response in your trusted sources (playbook content, knowledge base, tool responses, contact record) before delivering it.

If no playbooks exist, the agent responds in "direct mode" using its global instructions and knowledge base.

---

## Creating an Agent

1. Go to **Agents** in the sidebar
2. Click **+ New Agent**
3. Enter a name and click **Create**
4. You're taken to the **Canvas** — the visual editor where you build the agent

You can switch between views using the tabs:
- **Canvas** — Visual node editor (default)
- **Sessions** — Historical conversations and test sessions

## Agent Configuration

Click the central **Agent node** on the canvas to open the config panel on the right.

### System Prompt

The global instructions that apply to every conversation this agent handles. This is the agent's "identity" — write it in the second person:

> You are the support agent for Acme SaaS. You help customers with billing, account management, and product questions. Always be helpful, concise, and honest. If you don't know something, say so.

The system prompt sets the agent's baseline behavior across every playbook.

### Tone

Controls the conversational style. Choose one:

| Tone | Behavior |
|------|----------|
| **Default** | Balanced and professional — clear, helpful, courteous |
| **Professional** | Polished, structured |
| **Friendly** | Warm, approachable, casual language, light humor allowed |
| **Formal** | Polished, respectful, no slang, structured sentences |
| **Casual** | Relaxed, conversational, like chatting with a friend |

### Response Length

| Length | Behavior |
|--------|----------|
| **Default** | 2-4 sentences. Enough to be helpful without being verbose |
| **Short** | 1-2 sentences. Concise and direct |
| **Medium** | 2-4 sentences |
| **Long** | Detailed, thorough responses with full explanations |

---

## The Canvas: Visual Agent Builder

The canvas is a visual graph editor where you connect the agent to its capabilities. The central Agent node connects outward to:

- **Playbooks** (green edges) — Conversation scenarios
- **Escalation Rules** (orange edges) — Human handoff triggers
- **Memory** (blue edges) — Knowledge base access
- **Tools** (purple edges) — API integrations

### Node Types

#### Library Nodes (reusable components)

| Node | Color | Purpose |
|------|-------|---------|
| **Playbook** | Green | Structured conversation flow |
| **Escalation** | Orange | Human handoff trigger |
| **Tool** | Purple | HTTP API integration |
| **Memory** | Blue | Knowledge base access scope |

#### Action Nodes (what the agent can do)

| Node | Purpose |
|------|---------|
| **Human Agent** | Transfer conversation to a human |
| **Create Ticket** | Auto-create a support ticket |
| **Create Event** | Schedule a calendar event |
| **Send Email** | Send an email message |
| **Send WhatsApp** | Send a WhatsApp message |
| **Integration** | Call a third-party integration |

#### Utility Nodes

| Node | Purpose |
|------|---------|
| **Condition** | Branch based on rules or AI evaluation |
| **Sticky Note** | Canvas annotations for your team |

### Connection Rules

Not every node can connect to every other. The valid flows are:

```
Agent → Playbook, Escalation, Memory, Tool

Playbook → Tool, Memory, Create Ticket, Create Event,
           Human Agent, Send Email, Send WhatsApp, Integration

Escalation → Human Agent, Create Ticket, Create Event,
             Send Email, Send WhatsApp, Memory, Integration

Condition → Human Agent, Condition, Create Ticket,
            Create Event, Send Email, Send WhatsApp
```

Action nodes (Human Agent, Create Ticket, etc.) are **terminal** — they have no outputs.

### Building a Flow

1. Hover over the Agent node — quick-add buttons appear
2. Click **+** or drag from an output handle to add a node
3. Configure the node in the right panel
4. Connect nodes by dragging between handles

Edges are color-coded: green for playbooks, orange for escalation, purple for tools, blue for memory.

Inactive nodes appear faded (opacity + grayscale) and are skipped during execution.

---

## Playbooks

A playbook is a set of instructions that tell the agent how to handle a specific scenario. When the router picks a playbook, its instructions completely override the agent's default behavior for that conversation turn.

### Playbook Fields

| Field | Purpose |
|-------|---------|
| **Title** | Name of the scenario (e.g., "Product Pricing") — the router uses this to match |
| **Audience** | Who this playbook targets (e.g., "Customers asking about pricing") — helps the router |
| **Trigger** | When to activate (e.g., "Customer asks about pricing, cost, plans") — helps the router |
| **Instructions** | The detailed behavior script the agent follows |
| **Emoji** | Visual icon on the canvas |
| **Active toggle** | Enable/disable without deleting |

### Writing Good Instructions

The instructions field is where the magic happens. Write them as a detailed script:

```
Greeting: Welcome the customer and ask which product they're interested in.

Step 1: Ask what their team size is and whether they need monthly or annual billing.

Step 2: Search the knowledge base for the relevant pricing page.
Present the pricing clearly using information from the KB.
NEVER invent prices — if the KB doesn't have the answer, say you'll check with the team.

Step 3: If the customer is interested, offer to schedule a demo.
Use the create_event tool to book it.

Step 4: Ask if they have any other questions.
```

**Key principles:**
- Be specific — "Ask for their email" is better than "Collect info"
- Reference tools — "Use the lookup-account tool to check their subscription"
- Include fallbacks — "If the customer doesn't have an account, offer to create one"
- Set boundaries — "NEVER discuss competitor pricing"

### How the Router Picks a Playbook

The router reads the latest message, the conversation history, and all of your active playbooks and escalation rules to pick the best match.

Key behaviors to keep in mind:
- **Multilingual** — A message in one language will match a playbook written in another if the meaning aligns
- **Context-aware** — Short follow-ups like "yes" or "and the price?" stay on the active playbook
- **Topic switching** — If the customer changes topic mid-conversation, the router switches playbooks
- **Priority** — Playbooks are preferred over escalation rules unless the message clearly matches an escalation trigger

### Connecting Tools to Playbooks

A playbook can use any tool connected to it on the canvas:

1. Create a Tool node
2. Draw an edge from the Playbook node to the Tool node
3. The agent can now call that tool when executing this playbook

You can also connect Memory, Create Ticket, Send Email, etc. to a playbook — the agent will have all connected capabilities available as tools during execution.

---

## Tools

Tools give the agent the ability to call external HTTP APIs during a conversation.

### Tool Fields

| Field | Purpose |
|-------|---------|
| **Name** | Identifier the agent sees (e.g., "lookup-account") |
| **Description** | What the tool does — the agent uses this to decide when to call it |
| **Method** | HTTP verb: GET, POST, PUT, PATCH, DELETE |
| **URL** | API endpoint |
| **Query Parameters** | URL parameters (key-value pairs) |
| **Headers** | HTTP headers — typically authentication |
| **Body Schema** | Request body structure with field types and descriptions |

### Creating a Tool

1. On the canvas, add a **Tool** node
2. In the right panel, fill in the fields
3. Use the **Test** button to verify it works (shows response time + result)

**cURL Import**: Click the "cURL" link next to the URL field to paste a cURL command. Cardynal auto-parses the method, URL, headers, query params, and body.

### Body Schema Format

For POST/PUT tools, define the request body as a schema. Each field has a type and description:

```json
{
  "customer_email": {
    "type": "string",
    "description": "The customer's email address"
  },
  "action": {
    "type": "string",
    "description": "Action to perform: 'cancel', 'upgrade', or 'downgrade'"
  }
}
```

The agent reads these descriptions to understand what values to fill in based on the conversation context.

### How Tools Execute

During a conversation, the agent can call tools as needed:

1. The agent decides to call a tool and provides arguments
2. Cardynal validates the arguments
3. The HTTP request is made with the provided headers, params, and body
4. The response feeds back into the conversation
5. The agent generates the next response (or calls another tool)

---

## Memory (Knowledge Base Access)

Memory nodes define which parts of your knowledge base the agent can search.

### Configuration

| Mode | Behavior |
|------|----------|
| **All sources** | Agent searches your entire knowledge base |
| **Custom scope** | Agent only searches selected folders and sources |

In custom mode, you see a folder tree with checkboxes. Select the folders/sources relevant to this agent. A coverage indicator shows what percentage of your KB is accessible.

### How KB Search Works

When a memory node is connected to a playbook, the agent searches the knowledge base before answering factual questions, picks the most relevant passages, and cites them inline using `[Source N]`.

The search is multilingual: if the customer asks in one language but your knowledge is in another, the agent will still find the right content.

---

## Escalation Rules

Escalation rules define when and how the agent hands off to a human. They're the "last resort" — the router only triggers them when a message clearly matches.

### Escalation Fields

| Field | Purpose |
|-------|---------|
| **Title** | Name of the rule (e.g., "Billing Dispute") |
| **Trigger** | When to escalate — natural language description |
| **Instructions** | How the agent should handle the transition |
| **Audience** | Who this applies to |
| **Assign to Agent** | Specific team member to hand off to (optional) |

### How Escalation Works

1. The router detects the message matches an escalation trigger
2. The conversation metadata is updated with `active_escalation_id`
3. **Multi-turn escalation**: The agent doesn't immediately hand off. It follows the escalation instructions to gather information first
4. The agent asks questions one at a time to understand the issue
5. When ready, the agent calls the `assign_human_agent` tool with a summary
6. The conversation is assigned to the designated human agent
7. If the agent is offline and a ticket tool is connected, a ticket is created first

**Important**: Once an escalation is active, all subsequent messages in that conversation bypass the router and go straight to the escalation handler until a human takes over.

### Connecting Actions to Escalation

Connect action nodes to escalation rules for automated side-effects:

- **Human Agent** → Assign to a specific team member
- **Create Ticket** → Auto-create a ticket before handoff
- **Send Email** → Notify someone via email
- **Memory** → Give the escalation handler KB access

---

## Action Nodes

### Create Ticket

Auto-create tickets from conversations. Fields support **dual mode** — manual (fixed values) or AI (generated from conversation context):

| Field | Manual Mode | AI Mode |
|-------|-------------|---------|
| **Subject** | Fixed text template | AI generates from conversation |
| **Description** | Fixed text | AI summarizes the issue |
| **Priority** | Dropdown (low/medium/high/urgent) | AI decides based on context |
| **Tags** | Comma-separated list | AI generates relevant tags |

Additional settings:
- **Ticket Type** — Select from your custom ticket types
- **Tool Prompt** — Custom instructions for when the agent should create a ticket
- **Inherit Agent** — Assign the ticket to the current human agent

### Human Agent

Transfer to a human. Configuration:
- **Assign To** — Select a specific team member, or leave empty for the first available agent

### Send Email

Send an email during the conversation. Requires at least one email inbox (Gmail):
- **Send From** — Select an inbox or "Auto" to detect
- **To / Subject / Body** — Each supports manual templates or AI generation
- **Tool Prompt** — Custom instructions for when to send

### Send WhatsApp

Send a WhatsApp message. Requires a WhatsApp inbox:
- **Send From** — Select an inbox or "Auto"
- **Phone / Message** — Manual template or AI generation
- **Tool Prompt** — Custom instructions

### Condition

Branch the conversation based on rules:

**Rule-based conditions:**
- Source: Contact, Conversation, or Agent
- Contact fields: name, email, phone, metadata.plan, metadata.company, metadata.language
- Conversation fields: status, priority, channel, ai_disabled
- Agent fields: is_available
- Operators: equals, not equals, contains, exists

**AI-based conditions:** Write a natural language condition and the AI evaluates it against the conversation context.

Match mode: **All** (AND) or **Any** (OR).

### Integration

Call a third-party integration installed from the catalog:
- **Tool Prompt** — When the agent should use this integration
- **Available Tools** — Toggle individual tools from the integration's manifest on/off

---

## Publishing & Versioning

Changes to the canvas are saved as a **draft** automatically. The publish button in the header shows the current state:

| Indicator | Meaning |
|-----------|---------|
| Green dot + "Up to date" | Published version matches draft |
| Amber dot + "Draft" | Unpublished changes exist |

Click **Publish** to create a version snapshot. The published version is what runs in production.

### Version History

Click the **History** button to see all published versions with timestamps. You can **restore** any previous version.

### Export / Import

- **Export** — Downloads the agent as JSON (bot config, canvas, playbooks, escalation rules)
- **Import** — Upload a JSON file to create a new agent with the same setup

---

## Testing

### Test Chat

Click the chat bubble icon (bottom-right of the canvas) to open the test widget:

1. Type a message and send
2. The agent processes it through the full pipeline (routing, playbook, tools, anti-hallucination)
3. Bot responses appear in real-time
4. A typing indicator shows while the agent is thinking
5. Click **Reset** to start a fresh conversation

Test conversations are flagged with `test_mode = true` and:
- Bypass inbox settings (ai_enabled, ai_schedule)
- Don't count against your session quota
- Don't appear in the production inbox

### Reviewing Sessions

Go to the **Sessions** tab to see past conversations and test sessions. Review how the router decided, which playbooks were used, and what tools were called.

Routing decisions are logged as private notes in each conversation for admin visibility.

---

## Use Cases & Examples

### Use Case 1: E-commerce Support Bot

**Scenario:** A clothing store wants to automate order inquiries, product recommendations, and returns.

**Agent Config:**
- Tone: Friendly
- Response length: Medium

**Playbooks:**

| Playbook | Trigger | Connected Nodes |
|----------|---------|-----------------|
| Order Status | "Where is my order", "tracking", "delivery" | Tool (order-lookup API), Memory (shipping FAQ) |
| Product Recommendations | "Looking for", "suggest", "what do you recommend" | Memory (product catalog) |
| Returns & Refunds | "Return", "refund", "exchange", "doesn't fit" | Tool (create-return API), Create Ticket, Memory (return policy) |
| General FAQ | Fallback for general questions | Memory (FAQ folder) |

**Escalation:**

| Rule | Trigger | Action |
|------|---------|--------|
| Angry Customer | "Speak to manager", frustrated language, repeated complaints | Human Agent (assign to senior support) + Create Ticket |
| Payment Issue | "Charged twice", "payment failed", "billing error" | Human Agent + Create Ticket (priority: urgent) |

**Order Lookup Tool:**
- Method: GET
- URL: `https://api.store.com/orders`
- Query: `{"email": "customer email from conversation"}`
- Headers: `{"Authorization": "Bearer API_KEY"}`

---

### Use Case 2: SaaS Onboarding Agent

**Scenario:** Guide new users through product setup and answer feature questions.

**Agent Config:**
- Tone: Professional
- Response length: Long (detailed explanations)

**Playbooks:**

| Playbook | Trigger | Instructions Summary |
|----------|---------|---------------------|
| Getting Started | "How do I start", "just signed up", "new here" | Walk through 5-step setup. Ask which step they're on. Search KB for relevant docs. |
| Feature Questions | "How does X work", "can I do Y" | Search KB first. Explain with examples. Offer to show a visual card. |
| Billing & Plans | "Pricing", "upgrade", "invoice" | Search KB for pricing. Use plan-lookup tool. NEVER invent prices. |
| Integration Help | "Connect", "API", "webhook", "integrate" | Search KB for integration docs. If too complex, create a ticket for the dev team. |

**Connected Memory:**
- Custom scope: "Product Docs" and "Integration Guides" folders only (not internal docs)

**Escalation:**

| Rule | Trigger | Action |
|------|---------|--------|
| Bug Report | "Bug", "broken", "error", "not working" | Gather: steps to reproduce, browser, screenshots → Create Ticket (type: Bug, priority from AI) → Human Agent |
| Sales Inquiry | "Enterprise", "custom plan", "volume discount" | Human Agent (assign to sales team) + Send Email (notify sales@company.com) |

---

### Use Case 3: Appointment Booking Agent

**Scenario:** A clinic wants patients to book, reschedule, or cancel appointments.

**Agent Config:**
- Tone: Formal
- Response length: Short (concise for scheduling)

**Playbooks:**

| Playbook | Trigger | Connected Nodes |
|----------|---------|-----------------|
| Book Appointment | "Book", "schedule", "appointment", "available" | Create Event (check_availability enabled), Memory (services list) |
| Reschedule | "Reschedule", "change my appointment", "different time" | Create Event (query + update tools) |
| Cancel | "Cancel my appointment" | Create Event (cancel tool) |
| Services Info | "What services", "how much", "do you offer" | Memory (services & pricing folder) |

**Create Event node config:**
- Tool prompt: "Book an appointment when the patient confirms a time slot. Always check availability first."
- Subject: AI mode (generated from conversation, e.g., "Dental cleaning - Dr. Smith")
- Check availability: enabled

**Escalation:**

| Rule | Trigger | Action |
|------|---------|--------|
| Urgent Medical | "Emergency", "urgent", "pain", "bleeding" | Human Agent (assign to on-call) — Instructions: "Do NOT try to book. Tell them to call the emergency line immediately." |

---

### Use Case 4: Multilingual Knowledge Agent

**Scenario:** A company serves customers in English, French, and Hebrew with a single agent.

**Agent Config:**
- System prompt: "You are the support agent for GlobalCorp. Respond in the same language as the customer. Our knowledge base is primarily in English and French."
- Tone: Professional

**Playbooks:**
All playbook titles, audiences, and triggers can be written in English. The router matches semantically regardless of the customer's language.

| Playbook | Audience | Notes |
|----------|----------|-------|
| Product Info | "Customers asking about our products" | KB in English; agent translates to user's language |
| Account Help | "Customers with account issues" | Instructions reference tool calls in English |
| Pricing | "Pricing inquiries in any language" | KB has pricing in EUR/USD/ILS |

**Memory config:**
- Agent searches KB with keywords in the likely language of the content (English/French), not just the user's language
- If first search returns nothing, the agent automatically retries in another language

---

## Anti-Hallucination

Cardynal automatically prevents the agent from inventing facts. URLs, phone numbers, emails, and prices that don't come from your trusted sources (playbook, knowledge base, tool responses, contact record) are stripped from the response, and answers grounded in low-confidence sources are flagged.

You don't need to configure this — it's on by default. Your job is to keep your sources accurate and your playbook instructions clear.

---

## Best Practices

### Agent Design
- **Start simple** — One playbook + KB access. Add complexity after testing.
- **One agent per product/department** — Don't overload a single agent with too many playbooks
- **Use clear system prompts** — The system prompt sets the baseline. Playbooks override for specifics.

### Playbooks
- **3-7 playbooks per agent** is the sweet spot. Too many confuses the router.
- **Be specific in triggers** — "Customer asks about pricing, cost, plans, subscription, how much" is better than "pricing"
- **Write instructions as scripts** — Step 1, Step 2, Step 3. The agent follows structured instructions better.
- **Always include fallbacks** — "If you can't find the answer in the KB, say so and offer to connect with a human"

### Tools
- **Test before deploying** — Use the Test button to verify responses
- **Write clear descriptions** — The agent uses the description to decide when to call the tool
- **Use cURL import** — Paste a working cURL command to save setup time

### Escalation
- **Keep triggers specific** — "Customer explicitly asks for a human" is better than "customer is confused"
- **Connect Create Ticket** — Always create a ticket before human handoff so context is preserved
- **Set assign_to_agent** — Unassigned escalations can get lost

### Publishing
- **Test before publishing** — Use the test chat to verify the full pipeline
- **Publish after each significant change** — Versions let you rollback
- **Export before major changes** — Keep a JSON backup
