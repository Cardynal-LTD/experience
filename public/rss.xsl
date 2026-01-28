<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="rss/channel/title"/> - RSS Feed</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0a0a0a;
            color: #e5e5e5;
            padding: 2rem;
            line-height: 1.6;
          }
          .container { max-width: 800px; margin: 0 auto; }
          header {
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid #252525;
          }
          h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            color: #fff;
          }
          .description {
            color: #888;
            margin-bottom: 1rem;
          }
          .rss-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: #f97316;
            color: #fff;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.875rem;
          }
          .rss-badge svg {
            width: 16px;
            height: 16px;
          }
          .subscribe-note {
            margin-top: 1rem;
            padding: 1rem;
            background: #151515;
            border-radius: 8px;
            font-size: 0.875rem;
            color: #888;
          }
          .subscribe-note code {
            background: #252525;
            padding: 0.125rem 0.375rem;
            border-radius: 3px;
            color: #e5e5e5;
          }
          .articles { display: flex; flex-direction: column; gap: 1.5rem; }
          .article {
            padding: 1.5rem;
            background: #151515;
            border-radius: 8px;
            border: 1px solid #252525;
            transition: border-color 0.2s;
          }
          .article:hover { border-color: #3b82f6; }
          .article-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          .article-title a {
            color: #fff;
            text-decoration: none;
          }
          .article-title a:hover { color: #3b82f6; }
          .article-meta {
            font-size: 0.875rem;
            color: #888;
            margin-bottom: 0.75rem;
          }
          .article-description {
            color: #a3a3a3;
            font-size: 0.9375rem;
          }
          .empty {
            text-align: center;
            padding: 3rem;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="rss-badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z"/>
              </svg>
              RSS Feed
            </div>
            <h1><xsl:value-of select="rss/channel/title"/></h1>
            <p class="description"><xsl:value-of select="rss/channel/description"/></p>
            <div class="subscribe-note">
              Pour vous abonner, copiez l'URL dans votre lecteur RSS: <code><xsl:value-of select="rss/channel/link"/>/rss.xml</code>
            </div>
          </header>

          <div class="articles">
            <xsl:choose>
              <xsl:when test="rss/channel/item">
                <xsl:for-each select="rss/channel/item">
                  <article class="article">
                    <h2 class="article-title">
                      <a href="{link}"><xsl:value-of select="title"/></a>
                    </h2>
                    <div class="article-meta">
                      <xsl:value-of select="pubDate"/>
                    </div>
                    <p class="article-description">
                      <xsl:value-of select="description"/>
                    </p>
                  </article>
                </xsl:for-each>
              </xsl:when>
              <xsl:otherwise>
                <div class="empty">Aucun article pour le moment.</div>
              </xsl:otherwise>
            </xsl:choose>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
