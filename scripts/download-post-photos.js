#!/usr/bin/env node

/**
 * Download post photos from postData.js
 *
 * Extracts image URLs from the bodyText HTML of each post,
 * downloads them into data/post-photos/<post-title>/
 *
 * Expects many downloads to fail (dead links, old CDNs, etc.)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Import post data
const { posts } = require(path.join(__dirname, '..', 'data', 'postData.js'));

// Output directory
const outputDir = path.join(__dirname, '..', 'data', 'post-photos');

// ---- Helpers ----

function sanitizeFolderName(title) {
  return title
    .replace(/[<>:"/\\|?*]/g, '')  // Remove illegal filesystem chars
    .replace(/\s+/g, ' ')          // Normalize whitespace
    .replace(/\.+$/g, '')          // Remove trailing dots
    .trim()
    .slice(0, 200);                // Cap length
}

function extractImageUrls(bodyText) {
  if (!bodyText) return [];

  const urls = [];
  // Match <img> src attributes
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgRegex.exec(bodyText)) !== null) {
    let url = match[1];
    // Skip data URIs
    if (url.startsWith('data:')) continue;
    // Fix protocol-relative URLs
    if (url.startsWith('//')) url = 'https:' + url;
    // Fix relative URLs
    if (url.startsWith('/')) url = 'http://www.skatehousemedia.com' + url;
    urls.push(url);
  }
  return urls;
}

function getFilenameFromUrl(url) {
  try {
    const parsed = new URL(url);
    const pathname = parsed.pathname;
    let basename = path.basename(pathname);
    // If no extension, add .jpg as default
    if (!path.extname(basename)) {
      basename += '.jpg';
    }
    // Sanitize
    basename = basename.replace(/[<>:"/\\|?*]/g, '_');
    return basename;
  } catch {
    return 'image_' + Date.now() + '.jpg';
  }
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      // Follow redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        let redirectUrl = response.headers.location;
        if (redirectUrl.startsWith('//')) redirectUrl = 'https:' + redirectUrl;
        if (redirectUrl.startsWith('/')) {
          const parsed = new URL(url);
          redirectUrl = parsed.protocol + '//' + parsed.host + redirectUrl;
        }
        downloadFile(redirectUrl, destPath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        response.resume();
        return;
      }

      const fileStream = fs.createWriteStream(destPath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    });

    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// ---- Main ----

async function main() {
  // Ensure output dir exists
  fs.mkdirSync(outputDir, { recursive: true });

  let totalImages = 0;
  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;
  const postsWithImages = [];

  // First pass: identify posts with images
  for (const post of posts) {
    const imageUrls = extractImageUrls(post.bodyText);
    if (imageUrls.length > 0) {
      postsWithImages.push({ title: post.pageTitle, urls: imageUrls });
      totalImages += imageUrls.length;
    }
  }

  console.log(`Found ${postsWithImages.length} posts with images (${totalImages} total image URLs)\n`);

  // Second pass: download
  for (let i = 0; i < postsWithImages.length; i++) {
    const { title, urls } = postsWithImages[i];
    const folderName = sanitizeFolderName(title);
    const postDir = path.join(outputDir, folderName);

    console.log(`[${i + 1}/${postsWithImages.length}] "${title}" (${urls.length} images)`);

    fs.mkdirSync(postDir, { recursive: true });

    for (const url of urls) {
      let filename = getFilenameFromUrl(url);
      const destPath = path.join(postDir, filename);

      // Skip if already downloaded
      if (fs.existsSync(destPath)) {
        skippedCount++;
        continue;
      }

      try {
        await downloadFile(url, destPath);
        successCount++;
        console.log(`  ✓ ${filename}`);
      } catch (err) {
        failCount++;
        console.log(`  ✗ ${filename} — ${err.message}`);
        // Clean up partial file
        if (fs.existsSync(destPath)) {
          fs.unlinkSync(destPath);
        }
      }
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Posts with images: ${postsWithImages.length}`);
  console.log(`Total image URLs:  ${totalImages}`);
  console.log(`Downloaded:        ${successCount}`);
  console.log(`Failed:            ${failCount}`);
  console.log(`Skipped (exists):  ${skippedCount}`);
}

main().catch(console.error);
