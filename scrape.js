const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// ── Config ──────────────────────────────────────────────────────────────────
const CDX_API = 'https://web.archive.org/cdx/search/cdx';
const WAYBACK_RAW = 'https://web.archive.org/web';
const SITE_DOMAIN = 'skatehousemedia.com';

const REQUEST_DELAY_MS = 1200;
const MAX_RETRIES = 3;
const PROGRESS_FILE = path.join(__dirname, 'scrape_progress.json');
const OUTPUT_FILE = path.join(__dirname, 'data', 'postData.js');

// ── Helpers ─────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);

      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.status === 429) {
        const wait = Math.min(attempt * 10000, 60000);
        console.log(`  ⏳ Rate limited (429), waiting ${wait / 1000}s...`);
        await sleep(wait);
        continue;
      }
      if (res.status === 503) {
        const wait = Math.min(attempt * 5000, 30000);
        console.log(`  ⏳ Service unavailable (503), waiting ${wait / 1000}s...`);
        await sleep(wait);
        continue;
      }
      if (res.status === 404) {
        return null;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return await res.text();
    } catch (err) {
      if (attempt === retries) {
        console.error(`  ❌ Failed after ${retries} attempts: ${url} — ${err.message}`);
        return null;
      }
      const wait = attempt * 3000;
      console.log(`  ⚠️  Attempt ${attempt} failed (${err.message}), retrying in ${wait / 1000}s...`);
      await sleep(wait);
    }
  }
  return null;
}

// ── Phase 1: Get all post URLs from CDX API ─────────────────────────────────

async function getAllPostUrls() {
  console.log('📡 Querying Wayback Machine CDX API for all skatehousemedia.com URLs...\n');

  const cdxUrl = `${CDX_API}?url=${SITE_DOMAIN}/*&output=json&fl=timestamp,original,statuscode&filter=statuscode:200&filter=mimetype:text/html&collapse=urlkey&limit=100000`;

  const response = await fetchWithRetry(cdxUrl);
  if (!response) {
    throw new Error('Failed to query CDX API');
  }

  const rows = JSON.parse(response);
  const data = rows.slice(1); // skip header row

  console.log(`  📊 CDX API returned ${data.length} unique URLs total\n`);

  // Filter to only post URLs (pattern: /MM/DD/YYYY/slug)
  const postUrlMap = new Map();

  for (const [timestamp, original] of data) {
    const url = original.replace(/^https?:\/\/(www\.)?/, 'http://').replace(/:80\//, '/');

    // Post URLs: skatehousemedia.com/MM/DD/YYYY/slug-text
    const postMatch = url.match(/skatehousemedia\.com\/(\d{2})\/(\d{2})\/(\d{4})\/(.+)/i);
    if (!postMatch) continue;

    const slug = postMatch[4].replace(/\/$/, '');
    if (slug.includes('/') || slug === '') continue;

    const normalizedUrl = url.replace(/\/$/, '');

    // Keep the most recent timestamp
    if (!postUrlMap.has(normalizedUrl) || timestamp > postUrlMap.get(normalizedUrl)) {
      postUrlMap.set(normalizedUrl, timestamp);
    }
  }

  console.log(`  📋 Found ${postUrlMap.size} unique post URLs\n`);
  return postUrlMap;
}

// ── Phase 2: Scrape individual posts ────────────────────────────────────────

function scrapePost(html, url) {
  const $ = cheerio.load(html);

  // Title
  const pageTitle = $('h1.blog-single-title').first().text().trim() ||
    $('h1.entry-title').first().text().trim() ||
    $('h1').first().text().trim() ||
    $('title').text().replace(/\s*[–|]\s*SkateHouseMedia.*$/i, '').trim() ||
    '';

  // Date
  const postDate = $('span.item-date a').first().text().trim() ||
    $('time.entry-date').first().text().trim() ||
    $('time').first().attr('datetime') ||
    '';

  // Author
  let author = '';
  const authorMeta = $('span.item-author a, .author-name a, a[rel="author"]').first().text().trim();
  if (authorMeta && authorMeta.toLowerCase() !== 'skatehousemedia') {
    author = authorMeta;
  }

  // Body content element
  const bodyEl = $('div.single-post-content').first().length
    ? $('div.single-post-content').first()
    : $('div.entry-content, article .post-content, .mk-single-content').first();

  // Try to find "Post by" or "This post by" in the body
  if (!author && bodyEl.length) {
    const bodyText = bodyEl.text();
    const authorMatch = bodyText.match(/(?:This\s+)?[Pp]ost\s+by\s+([A-Z][a-zA-Z\s.'\-]+?)(?:\s*[,.\n]|\s+(?:Browsing|In|On|We|I\s|The|It|As|After|Before|When|While|This|That|Here|There|What|How|Why|For|From|With|During|A\s|An\s|At\s|To\s|is|was|has|had))/);
    if (authorMatch) {
      author = authorMatch[1].trim();
    }
  }

  // Body text as stringified HTML
  let bodyText = bodyEl.length ? bodyEl.html() || '' : '';
  bodyText = bodyText
    .replace(/<!-- BEGIN WAYBACK TOOLBAR INSERT -->[\s\S]*?<!-- END WAYBACK TOOLBAR INSERT -->/g, '')
    .replace(/https?:\/\/web\.archive\.org\/web\/\d+\//g, '')
    .trim();

  // Tags
  const tags = [];
  $('div.single-post-tags a, .tagcloud a, .post-tags a').each((_, el) => {
    const tag = $(el).text().trim();
    if (tag) tags.push(tag);
  });

  // Categories - extract from post metadata, NOT sidebar/nav widgets
  const categories = [];
  const seenCategories = new Set();

  function addCategory(text) {
    if (text && !seenCategories.has(text.toLowerCase())) {
      seenCategories.add(text.toLowerCase());
      categories.push(text);
    }
  }

  // Strategy 1: Newer Jupiter theme posts (2016+) — .item-cat in post meta
  $('.blog-single-meta .item-cat a, .item-cat a').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (href.includes('/category/')) {
      addCategory($(el).text().trim());
    }
  });

  // Strategy 2: Older WordPress theme posts — use rel="category tag" attribute
  if (categories.length === 0) {
    $('a[rel="category tag"]').each((_, el) => {
      addCategory($(el).text().trim());
    });
  }

  // Strategy 3: Fallback — look in .entry-utility or .entry-meta for category links
  if (categories.length === 0) {
    $('.entry-utility a[href*="/category/"], .entry-meta a[href*="/category/"], .post-meta a[href*="/category/"]').each((_, el) => {
      addCategory($(el).text().trim());
    });
  }

  // Content URLs
  const contentUrls = [];
  const seenUrls = new Set();

  function addUrl(href) {
    if (!href) return;
    const origMatch = href.match(/\/web\/\d+\/(https?:\/\/.+)/);
    if (origMatch) href = origMatch[1];
    href = href.replace(/\/+$/, '');
    if (href.startsWith('http') && !seenUrls.has(href)) {
      seenUrls.add(href);
      contentUrls.push(href);
    }
  }

  bodyEl.find('a[href]').each((_, el) => addUrl($(el).attr('href')));
  bodyEl.find('iframe[src]').each((_, el) => addUrl($(el).attr('src')));
  bodyEl.find('iframe[data-src]').each((_, el) => addUrl($(el).attr('data-src')));
  $('video source[src], video[src]').each((_, el) => addUrl($(el).attr('src')));
  $('embed[src], object[data]').each((_, el) => addUrl($(el).attr('src') || $(el).attr('data')));

  return { pageTitle, postDate, author, bodyText, tags, categories, contentUrls };
}

async function scrapeAllPosts(postUrlMap, progress) {
  const posts = progress.posts || [];
  const scrapedUrls = new Set(progress.scrapedUrls || []);
  const failedUrls = progress.failedUrls || [];

  const entries = [...postUrlMap.entries()];
  const remaining = entries.filter(([url]) => !scrapedUrls.has(url));

  console.log(`\n🔍 Scraping ${remaining.length} posts (${scrapedUrls.size} already done)...\n`);

  for (let i = 0; i < remaining.length; i++) {
    const [originalUrl, timestamp] = remaining[i];
    const fetchUrl = `${WAYBACK_RAW}/${timestamp}id_/${originalUrl}`;

    console.log(`  [${i + 1}/${remaining.length}] ${originalUrl}`);

    let html = await fetchWithRetry(fetchUrl);

    // Fallback without id_ modifier
    if (!html) {
      const fallbackUrl = `${WAYBACK_RAW}/${timestamp}/${originalUrl}`;
      html = await fetchWithRetry(fallbackUrl);
    }

    if (!html) {
      console.log(`    ❌ Failed to fetch, skipping`);
      failedUrls.push(originalUrl);
      scrapedUrls.add(originalUrl);
    } else {
      try {
        const post = scrapePost(html, originalUrl);
        posts.push(post);
        scrapedUrls.add(originalUrl);
        console.log(`    ✅ "${post.pageTitle}" | ${post.postDate} | cats: [${post.categories.join(', ')}] | ${post.tags.length} tags | ${post.contentUrls.length} URLs`);
      } catch (err) {
        console.error(`    ❌ Parse error: ${err.message}`);
        failedUrls.push(originalUrl);
        scrapedUrls.add(originalUrl);
      }
    }

    // Save progress every 25 posts
    if ((i + 1) % 25 === 0 || i === remaining.length - 1) {
      progress.posts = posts;
      progress.scrapedUrls = [...scrapedUrls];
      progress.failedUrls = failedUrls;
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
      console.log(`\n  💾 Progress saved (${posts.length} posts scraped, ${failedUrls.length} failed)\n`);
    }

    await sleep(REQUEST_DELAY_MS);
  }

  return posts;
}

// ── Phase 3: Write Output ───────────────────────────────────────────────────

function writeOutput(posts) {
  const jsContent = `const posts = ${JSON.stringify(posts, null, 2)};\n\nmodule.exports = { posts };\n`;

  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf8');
  console.log(`\n✅ Written ${posts.length} posts to ${OUTPUT_FILE}`);
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🛹 SkateHouseMedia Wayback Machine Scraper');
  console.log('==========================================\n');

  let progress = {};
  if (fs.existsSync(PROGRESS_FILE)) {
    try {
      progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
      console.log('📂 Resuming from saved progress...\n');
    } catch {
      progress = {};
    }
  }

  // Phase 1: Get all post URLs via CDX API
  let postUrlMap;
  if (progress.phase1Complete && progress.postUrlEntries) {
    postUrlMap = new Map(progress.postUrlEntries);
    console.log(`📋 Phase 1 already complete: ${postUrlMap.size} unique post URLs\n`);
  } else {
    postUrlMap = await getAllPostUrls();
    progress.phase1Complete = true;
    progress.postUrlEntries = [...postUrlMap.entries()];
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
  }

  // Phase 2: Scrape individual posts
  console.log('📋 Phase 2: Scraping individual posts...');
  const posts = await scrapeAllPosts(postUrlMap, progress);

  progress.phase2Complete = true;
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));

  // Phase 3: Write output
  console.log('\n📋 Phase 3: Writing output file...');
  writeOutput(posts);

  // Summary
  console.log('\n📊 Summary:');
  console.log(`  Total unique URLs: ${postUrlMap.size}`);
  console.log(`  Successfully scraped: ${posts.length}`);
  console.log(`  Failed: ${(progress.failedUrls || []).length}`);
  if ((progress.failedUrls || []).length > 0) {
    console.log('  Failed URLs (first 20):');
    progress.failedUrls.slice(0, 20).forEach(u => console.log(`    - ${u}`));
  }
  console.log('\n🎉 Done!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
