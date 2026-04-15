---
sidebar_position: 4
---

# Knowledge Base

The knowledge base is the foundation of your AI agent's intelligence. It stores your company's knowledge as vector embeddings that the AI searches in real time to answer customer questions.

## Overview

The knowledge base lives in **Sources** in the sidebar. It has two panels:
- **Left sidebar** — Folder tree for organization
- **Main area** — Source list (card or list view) with filters

## Source Types

| Type | Description | Best For |
|------|-------------|----------|
| **File** | Upload PDF, DOCX, TXT, MD, CSV | Product docs, manuals, policies |
| **Website** | Crawl a URL and index its pages | Help centers, documentation sites |
| **Sitemap** | Discover pages from a sitemap.xml | Large sites with many pages |
| **Manual** | Write or paste content directly | FAQs, quick answers, custom content |

## Adding Sources

### Uploading Files

1. Click **+ Add Source** → **Documents**
2. Select files from your computer
3. Processing starts automatically

Supported formats: PDF, DOCX, TXT, MD, CSV. Each file is chunked into smaller pieces, and each chunk gets a vector embedding for semantic search.

### Crawling Websites

1. Click **+ Add Source** → **Website/Sitemap**
2. Enter the URL
3. Click **Discover** — Cardynal finds all pages and shows a preview
4. Review the discovered pages:
   - Select/deselect individual pages
   - Set importance (1-5) for prioritization
   - Add keywords or notes
5. Confirm to start crawling

For sitemaps, Cardynal reads the `sitemap.xml` and lists all URLs with their `lastmod` dates.

**Crawl settings:**
- **Depth** — How many levels deep to follow links
- **Max pages** — Limit the number of pages crawled
- **Ignore selectors** — CSS selectors to skip (e.g., navigation, footers)
- **Scoped path** — Restrict crawling to a URL prefix

### Manual Content

1. Click **+ Add Source** → **Text/Raw Content**
2. Enter a name
3. Write or paste your content in the editor
4. Save

## Source Processing

After adding a source, it goes through a pipeline:

1. **Pending** — Queued for processing
2. **Processing** — Content is being extracted, chunked, and embedded
3. **Complete** — Ready for AI queries
4. **Error** — Processing failed (check the error message)

For website sources, each page has its own status:
- **Pending** → **Scraping** → **Done** / **Error** / **Skipped**

### Chunk Count

Each source shows its **chunk count** — the number of text chunks stored in the vector database. More chunks generally means more comprehensive coverage.

## Organizing with Folders

### Creating Folders

1. In the left sidebar, click **New Folder**
2. Set a name (e.g., "Product Docs", "FAQs")
3. Choose an icon (folder, book, file, briefcase, etc.)
4. Choose a color (8 options available)

### Moving Sources

Drag and drop sources into folders, or set the folder when creating a source.

### Folder Structure

Folders are flat (one level). Use naming conventions for hierarchy (e.g., "Product - Features", "Product - Billing").

## Source Detail View

Click a source to open the detail panel with tabs:

### Overview Tab
- Source name and type
- Status and chunk count
- Created date
- Refresh schedule (if configured)

### Content Tab
- View individual chunks as cards
- Edit chunk content inline
- See the raw extracted text

### Configuration Tab
- Edit source settings
- Set refresh schedule
- Configure crawl parameters (for websites)

### History Tab
- Processing history
- Refresh logs

## Refresh Scheduling

Keep website content up to date with automatic refreshes.

1. Open the source detail
2. Go to **Configuration**
3. Set refresh schedule:
   - **Daily** — Re-crawl every day at a specific hour
   - **Weekly** — Re-crawl once a week on a specific day
4. Cardynal re-fetches the content and updates the embeddings

The **last refreshed** date shows when content was last updated.

### Manual Refresh

Force a refresh by clicking the **Refresh** button in the source's action menu.

## Testing the Knowledge Base

### Semantic Search

Test how well your knowledge base answers questions:

1. Open a source's detail page
2. Use **Test KB** — enter a question
3. Results show:
   - Matched chunks with relevance scores
   - Source page titles
   - Content snippets

### Full-Text Search

Use the global **Search** feature in the Sources header to find content across all sources by keyword.

## Assigning to Agents

By default, agents have access to **all** knowledge sources. To scope access:

1. Go to **Agents** → select your agent → **Knowledge Base** tab
2. Toggle **Access all sources** off
3. Select specific folders

When the agent handles a conversation, it only searches the assigned folders for relevant content.

## Retry Failed Pages

If some pages failed during processing:

1. Open the source detail
2. Identify pages with **Error** status
3. Select them and click **Retry** to re-process

## Best Practices

- **Do** organize sources into logical folders by topic
- **Do** set importance levels on website pages to prioritize key content
- **Do** test with real customer questions after adding new content
- **Do** schedule refreshes for websites that change frequently
- **Do** review chunk content to ensure quality
- **Don't** upload the same content in multiple sources
- **Don't** add irrelevant content — it can lower response quality
- **Don't** create too many small sources — fewer, well-organized sources are better
