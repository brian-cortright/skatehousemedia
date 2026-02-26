const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const dataPath = path.join(__dirname, '../data/postData.js');

// 1. Extract first image if available
function getLocalImage(text) {
  if (!text) return null;
  // Match image extensions explicitly to avoid trailing .com links inside src attributes
  const imgRegex = /<img[^>]+src="?([^"\s]+\.(?:jpg|jpeg|png|gif|webp))[^"\s]*"?\s*\/?>/i;
  const match = imgRegex.exec(text);
  if (match) return match[1];
  return null;
}

// 2. Extract YouTube video ID
function getYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  if (!url.includes('youtube.com') && !url.includes('youtu.be')) return null;

  try {
    if (url.includes('/embed/')) {
        return url.split('/embed/')[1].split('?')[0];
    } else if (url.includes('v=')) {
        return new URL(url).searchParams.get('v');
    } else if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1].split('?')[0];
    }
  } catch(e) { }
  return null;
}

// 3. Extract Vimeo video ID
function getVimeoId(url) {
  if (!url || typeof url !== 'string') return null;
  if (!url.includes('vimeo.com')) return null;

  try {
    if (url.includes('/video/')) {
        return url.split('/video/')[1].split('?')[0];
    } else {
        const parts = url.split('/');
        return parts[parts.length - 1];
    }
  } catch(e) {}
  return null;
}

async function fetchVimeoThumbnail(videoId) {
  // Vimeo strictly blocks server-side scraping via captcha pages (MW-RL), and oEmbeds.
  // Instead of hanging or throwing, we will provide a generic video thumbnail
  // or return null for Vimeo posts.
  return null;
}

// Combine URLs to search for videos
function getAllVideoUrls(post) {
  const urls = [...(post.contentUrls || [])];
  const iframeRegex = /<iframe[^>]+src="?([^"\s]+)"?\s*\/?>/gi;
  let match;
  while ((match = iframeRegex.exec(post.bodyText)) !== null) {
      urls.push(match[1]);
  }
  return [...new Set(urls)].filter(u => typeof u === 'string');
}

async function findBestThumbnail(post) {
  // 1. Check for images in the post body natively
  const localImage = getLocalImage(post.bodyText);
  if (localImage) return localImage;

  // 2. Check for YouTube videos
  const allUrls = getAllVideoUrls(post);
  for (const url of allUrls) {
      const ytId = getYouTubeId(url);
      if (ytId) {
          // Both maxresdefault and hqdefault exist, but hqdefault is more reliably present on all videos
          return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      }
  }

  // 3. Check for Vimeo videos
  for (const url of allUrls) {
      const vimId = getVimeoId(url);
      if (vimId) {
          const vimeoThumb = await fetchVimeoThumbnail(vimId);
          if (vimeoThumb) return vimeoThumb;
      }
  }

  // Fallback: No thumbnail
  return null;
}

async function generateThumbnails() {
  console.log('Loading postData...');
  const content = fs.readFileSync(dataPath, 'utf8');

  const startIndex = content.indexOf('[');
  const endIndex = content.lastIndexOf(']');

  const jsonStr = content.substring(startIndex, endIndex + 1);
  const posts = JSON.parse(jsonStr);

  console.log(`Extracting thumbnails for ${posts.length} posts...`);

  let completed = 0;
  const batchSize = 10;

  for (let i = 0; i < posts.length; i += batchSize) {
    const batch = posts.slice(i, i + batchSize);

    await Promise.all(batch.map(async (post) => {
      post.thumbnail = await findBestThumbnail(post);

      completed++;
      if (completed % 100 === 0) {
          console.log(`Processed ${completed}/${posts.length} posts...`);
      }
    }));
  }

  console.log(`Done processing. Writing updated posts to file...`);

  const newContent = `export const posts = ${JSON.stringify(posts, null, 2)};\n`;
  fs.writeFileSync(dataPath, newContent, 'utf8');

  console.log('Successfully updated thumbnails in data/postData.js');
}

generateThumbnails().catch(console.error);
