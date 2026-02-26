#!/usr/bin/env node

/**
 * Upload post-photos to Cloudflare R2 via wrangler.
 * Uses `npx wrangler r2 object put` for each file.
 *
 * Usage: node scripts/upload-to-r2.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BUCKET = 'skatehousemedia';
const R2_PREFIX = 'post-photos';
const photosDir = path.join(__dirname, '..', 'data', 'post-photos');

// Mime type mapping
const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function getAllFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else if (entry.isFile() && !entry.name.startsWith('.')) {
      files.push(fullPath);
    }
  }
  return files;
}

function main() {
  const files = getAllFiles(photosDir);
  console.log(`Found ${files.length} files to upload\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < files.length; i++) {
    const filePath = files[i];
    const relativePath = path.relative(photosDir, filePath);
    const r2Key = `${R2_PREFIX}/${relativePath}`;
    const contentType = getMimeType(filePath);

    process.stdout.write(`[${i + 1}/${files.length}] ${r2Key} ... `);

    try {
      execSync(
        `npx -y wrangler r2 object put "${BUCKET}/${r2Key}" --file="${filePath}" --content-type="${contentType}" --remote`,
        { stdio: 'pipe', timeout: 30000 }
      );
      console.log('✓');
      success++;
    } catch (err) {
      console.log(`✗ ${err.message.split('\n')[0]}`);
      failed++;
    }
  }

  console.log(`\n--- Summary ---`);
  console.log(`Total:   ${files.length}`);
  console.log(`Success: ${success}`);
  console.log(`Failed:  ${failed}`);
}

main();
