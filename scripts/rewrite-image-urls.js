#!/usr/bin/env node

/**
 * Rewrite image URLs in postData.js to point to R2 storage.
 * Only rewrites URLs for images that were actually downloaded (exist locally).
 *
 * Usage: node scripts/rewrite-image-urls.js
 */

const fs = require('fs');
const path = require('path');

const R2_BASE = 'https://assets.skatehousemedia.com';
const R2_PREFIX = 'post-photos';
const photosDir = path.join(__dirname, '..', 'data', 'post-photos');
const postDataFile = path.join(__dirname, '..', 'data', 'postData.js');

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

function getFilenameFromUrl(url) {
  try {
    const parsed = new URL(url);
    let basename = path.basename(parsed.pathname);
    if (!path.extname(basename)) basename += '.jpg';
    basename = basename.replace(/[<>:"/\\|?*]/g, '_');
    return basename;
  } catch {
    return null;
  }
}

function normalizeUrl(url) {
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('/')) return 'http://www.skatehousemedia.com' + url;
  return url;
}

// Read the raw file
const raw = fs.readFileSync(postDataFile, 'utf-8');

// Parse the posts
const { posts } = require(postDataFile);

let totalRewrites = 0;
let totalSkipped = 0;
let postsModified = 0;

// We'll do string replacements on the raw file content
let updatedRaw = raw;

for (const post of posts) {
  if (!post.bodyText) continue;

  const slug = slugify(post.pageTitle);
  const postDir = path.join(photosDir, slug);

  // Find all img src URLs in this post's bodyText
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  let postRewrites = 0;

  while ((match = imgRegex.exec(post.bodyText)) !== null) {
    const originalSrc = match[1];
    const normalizedUrl = normalizeUrl(originalSrc);
    const filename = getFilenameFromUrl(normalizedUrl);

    if (!filename) {
      totalSkipped++;
      continue;
    }

    const localFile = path.join(postDir, filename);

    // Only rewrite if we actually downloaded this image
    if (fs.existsSync(localFile)) {
      const r2Url = `${R2_BASE}/${R2_PREFIX}/${slug}/${filename}`;

      // Replace the original src in the raw file content
      // Use exact string match to avoid false positives
      updatedRaw = updatedRaw.split(originalSrc).join(r2Url);
      totalRewrites++;
      postRewrites++;
    } else {
      totalSkipped++;
    }
  }

  if (postRewrites > 0) postsModified++;
}

// Write the updated file
fs.writeFileSync(postDataFile, updatedRaw, 'utf-8');

console.log('--- Summary ---');
console.log(`Posts modified: ${postsModified}`);
console.log(`URLs rewritten: ${totalRewrites}`);
console.log(`URLs skipped (no local file): ${totalSkipped}`);
