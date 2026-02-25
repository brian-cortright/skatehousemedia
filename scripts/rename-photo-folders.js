#!/usr/bin/env node

/**
 * Rename post-photos folders from display titles to slugified names.
 * Uses the same slugify logic as src/utils/slugify.js
 */

const fs = require('fs');
const path = require('path');

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const photosDir = path.join(__dirname, '..', 'data', 'post-photos');

const folders = fs.readdirSync(photosDir, { withFileTypes: true })
  .filter(d => d.isDirectory());

let renamed = 0;
let skipped = 0;
let conflicts = 0;

for (const folder of folders) {
  const oldName = folder.name;
  const newName = slugify(oldName);

  if (oldName === newName) {
    skipped++;
    continue;
  }

  const oldPath = path.join(photosDir, oldName);
  const newPath = path.join(photosDir, newName);

  if (fs.existsSync(newPath)) {
    console.log(`⚠ CONFLICT: "${oldName}" → "${newName}" (target already exists)`);
    conflicts++;
    continue;
  }

  fs.renameSync(oldPath, newPath);
  console.log(`✓ "${oldName}" → "${newName}"`);
  renamed++;
}

console.log(`\n--- Summary ---`);
console.log(`Renamed:   ${renamed}`);
console.log(`Skipped:   ${skipped} (already slugified)`);
console.log(`Conflicts: ${conflicts}`);
