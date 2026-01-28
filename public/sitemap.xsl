<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap - Cardynal</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0a0a0a;
            color: #e5e5e5;
            padding: 2rem;
            line-height: 1.6;
          }
          .container { max-width: 1200px; margin: 0 auto; }
          h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            color: #fff;
          }
          .subtitle {
            color: #888;
            margin-bottom: 2rem;
          }
          .stats {
            display: flex;
            gap: 2rem;
            margin-bottom: 2rem;
            padding: 1rem;
            background: #151515;
            border-radius: 8px;
          }
          .stat { text-align: center; }
          .stat-value { font-size: 1.5rem; font-weight: 600; color: #3b82f6; }
          .stat-label { font-size: 0.875rem; color: #888; }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #151515;
            border-radius: 8px;
            overflow: hidden;
          }
          th, td {
            padding: 0.75rem 1rem;
            text-align: left;
            border-bottom: 1px solid #252525;
          }
          th {
            background: #1a1a1a;
            font-weight: 600;
            color: #888;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          tr:hover { background: #1a1a1a; }
          a {
            color: #3b82f6;
            text-decoration: none;
          }
          a:hover { text-decoration: underline; }
          .priority {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
          }
          .priority-high { background: #22c55e20; color: #22c55e; }
          .priority-medium { background: #3b82f620; color: #3b82f6; }
          .priority-low { background: #6b728020; color: #888; }
          .lang-tags { display: flex; gap: 0.25rem; flex-wrap: wrap; }
          .lang-tag {
            padding: 0.125rem 0.375rem;
            background: #252525;
            border-radius: 3px;
            font-size: 0.7rem;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Sitemap</h1>
          <p class="subtitle">Cardynal - All indexed pages</p>

          <div class="stats">
            <div class="stat">
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
              <div class="stat-label">Total URLs</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Frequency</th>
                <th>Priority</th>
                <th>Languages</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                  <td><xsl:value-of select="sitemap:changefreq"/></td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="sitemap:priority >= 0.8">
                        <span class="priority priority-high"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:when test="sitemap:priority >= 0.5">
                        <span class="priority priority-medium"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="priority priority-low"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td>
                    <div class="lang-tags">
                      <xsl:for-each select="xhtml:link[@rel='alternate']">
                        <span class="lang-tag"><xsl:value-of select="@hreflang"/></span>
                      </xsl:for-each>
                    </div>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
