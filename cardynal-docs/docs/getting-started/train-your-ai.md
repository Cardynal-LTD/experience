---
sidebar_position: 3
---

# Training Your AI

Your AI agent answers questions based on the knowledge you provide. The more relevant and well-organized your knowledge base is, the better the responses.

## How It Works

Cardynal uses **Retrieval-Augmented Generation (RAG)**:

1. You add content (documents, websites, or manual text)
2. Cardynal splits the content into chunks and creates **vector embeddings** (1536-dimension)
3. When a customer asks a question, Cardynal searches for the most relevant chunks using semantic similarity
4. The matched content is injected into the AI prompt as context
5. The AI generates a response grounded in your actual data

## Adding Knowledge Sources

Go to **Sources** in the sidebar and click **+ Add Source**.

### Documents

Upload files that contain your support knowledge.

**Supported formats:** PDF, DOCX, TXT, MD, CSV

1. Click **+ Add Source** → select **Documents**
2. Upload one or more files
3. Processing begins automatically — watch the status indicator:
   - **Pending** (gray) — Queued
   - **Processing** (amber, pulsing) — Being chunked and embedded
   - **Complete** (green) — Ready to use
   - **Error** (red) — Something went wrong; check the error message

### Websites & Sitemaps

Cardynal can crawl your website or help center and index the content.

1. Click **+ Add Source** → select **Website/Sitemap**
2. Enter the URL (e.g., `https://docs.yourcompany.com/sitemap.xml`)
3. Cardynal discovers pages and shows a preview — you can select/deselect individual pages
4. Click to start crawling

**Page management:**
- Each crawled page has its own status (pending, scraping, done, error, skipped)
- You can set **importance** (1-5) to prioritize certain pages
- Edit page content directly if needed
- Schedule automatic refreshes (daily, weekly)

### Manual Content

Write or paste content directly.

1. Click **+ Add Source** → select **Text/Raw Content**
2. Enter a name and paste your content
3. Save — processing begins immediately

Best for: FAQ answers, product specs, policies, or any content not in a file.

## Organizing with Folders

Keep your knowledge base organized using folders.

1. In the **Sources** sidebar, click **New Folder**
2. Name the folder (e.g., "Product Docs", "FAQs", "Policies")
3. Choose an icon and color
4. Drag sources into folders, or set the folder when creating a source

### Assigning Folders to Agents

By default, agents have access to **all knowledge**. To scope an agent's knowledge:

1. Go to **Agents** → select your agent → **Knowledge Base** tab
2. Toggle **Access all sources** off
3. Select specific folders the agent should use

This is useful when you have multiple agents for different products or departments.

## Testing Your Knowledge Base

After adding sources, verify the AI can find relevant answers.

1. Go to the source detail page
2. Use the **Test KB** feature — enter a question and see which chunks match
3. Review the results: relevance score, matched snippet, and source page

You can also test end-to-end by using the **Test Chat** in the agent configuration.

## Optimization Tips

**Content quality matters most:**
- Write clear, concise answers — avoid jargon the AI might misinterpret
- Structure content with headings and short paragraphs
- Include the question in the answer (e.g., "To reset your password, go to...")

**Keep it fresh:**
- Set refresh schedules on website sources to re-crawl periodically
- Review and update manual content when your product changes
- Remove outdated sources that might confuse the AI

**Monitor performance:**
- Check which playbooks are used most on the Dashboard
- Review escalated conversations — if the AI escalates too often, it may lack knowledge on that topic

## Best Practices

- **Do** start with your most common customer questions
- **Do** organize sources into logical folders by topic
- **Do** test after adding new content
- **Do** set importance levels on website pages to prioritize key content
- **Don't** upload duplicate content across multiple sources
- **Don't** add irrelevant content — it can lower response quality
- **Don't** skip the testing step before going live

## Next Steps

- [Configuring AI Agents](../guides/ai-agent.md) — Set up playbooks, tools, and escalation rules
- [Using the Inbox](../guides/inbox.md) — See how AI responses appear in conversations
