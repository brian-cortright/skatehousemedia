const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// The path to the data file
const dataPath = path.join(__dirname, '../data/postData.js');

// Validates YouTube via oEmbed
async function checkYouTube(url) {
  try {
    let videoId = "";
    if (url.includes('/embed/')) {
        videoId = url.split('/embed/')[1].split('?')[0];
    } else if (url.includes('v=')) {
        videoId = new URL(url).searchParams.get('v');
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    }

    if (!videoId) return false;

    const formattedUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(formattedUrl)}&format=json`;

    const res = await fetch(oembedUrl, { method: 'GET', timeout: 5000 });
    return res.status === 200;
  } catch (e) {
    return false;
  }
}

// Validates Vimeo via oEmbed then fallback player fetch
async function checkVimeo(url) {
  try {
    let videoId = "";
    if (url.includes('/video/')) {
        videoId = url.split('/video/')[1].split('?')[0];
    } else {
        const parts = url.split('/');
        videoId = parts[parts.length - 1];
    }

    if (!videoId) return false;

    try {
      const oembed = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`;
      const res = await fetch(oembed, { timeout: 5000 });
      if (res.status === 200) return true;
    } catch(e) {}

    const playerUrl = `https://player.vimeo.com/video/${videoId}`;
    const playerRes = await fetch(playerUrl, {
      timeout: 5000,
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'follow'
    });

    if (playerRes.status !== 200) return false;

    const text = await playerRes.text();
    if (!text.includes('window.playerConfig = {')) return false;
    if (text.includes('Private Video') || text.includes('This video is private')) return false;

    return true;
  } catch(e) {
    return false;
  }
}

// Check if any of a post's contentUrls or body iframes are valid videos
async function getValidVideoCount(post) {
  let validVideos = 0;

  // Combine all urls we can find
  const urls = [...(post.contentUrls || [])];

  // Extract iframe src
  const iframeRegex = /<iframe[^>]+src="?([^"\s]+)"?\s*\/?>/gi;
  let match;
  while ((match = iframeRegex.exec(post.bodyText)) !== null) {
      urls.push(match[1]);
  }

  // De-duplicate
  const uniqueUrls = [...new Set(urls)];

  for (const url of uniqueUrls) {
      if (typeof url !== 'string') continue;

      if (url.includes('youtube.com') || url.includes('youtu.be')) {
          if (await checkYouTube(url)) validVideos++;
      } else if (url.includes('vimeo.com')) {
          if (await checkVimeo(url)) validVideos++;
      }
  }

  return validVideos;
}

function getWordCount(text) {
  if (!text) return 0;
  // Strip html
  const stripped = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  // Return early if empty string
  if (stripped.length === 0) return 0;
  return stripped.split(' ').length;
}

function getImageCount(text) {
  // We prioritize checking for R2 images primarily, as those are guaranteed to work
  // since the user recently downloaded and rewrote them
  const imgRegex = /<img[^>]+src="?([^"\s]*assets\.skatehousemedia\.com[^"\s]*)"?\s*\/?>/gi;
  let count = 0;
  while (imgRegex.exec(text) !== null) {
      count++;
  }
  return count;
}

// Calculate the 1-5 ranking
function calculateRanking(wordCount, imgCount, validVideoCount) {
  let score = 1;

  if (imgCount >= 1) score += 1;
  if (imgCount >= 3) score += 1;
  if (validVideoCount >= 1) score += 2;
  if (wordCount >= 50) score += 1;
  if (wordCount >= 250) score += 1;

  // Cap at 5, Min at 1
  return Math.max(1, Math.min(5, score));
}

async function rankPosts() {
  console.log('Loading postData...');
  const content = fs.readFileSync(dataPath, 'utf8');

  // Find the start of the array
  const startIndex = content.indexOf('[');
  // Find the end by looking for the last square bracket
  const endIndex = content.lastIndexOf(']');

  const jsonStr = content.substring(startIndex, endIndex + 1);
  const posts = JSON.parse(jsonStr);

  console.log(`Analyzing ${posts.length} posts. This will take a while...`);

  let completed = 0;

  // We process in small batches to not overwhelm APIs
  const batchSize = 10;
  for (let i = 0; i < posts.length; i += batchSize) {
    const batch = posts.slice(i, i + batchSize);

    await Promise.all(batch.map(async (post) => {
      const words = getWordCount(post.bodyText);
      const images = getImageCount(post.bodyText);
      const videos = await getValidVideoCount(post);

      post.ranking = calculateRanking(words, images, videos);

      completed++;
      if (completed % 100 === 0) {
          console.log(`Processed ${completed}/${posts.length} posts...`);
      }
    }));
  }

  console.log(`Done processing. Writing updated posts to file...`);

  // Write back formatted
  const newContent = `export const posts = ${JSON.stringify(posts, null, 2)};\n`;
  fs.writeFileSync(dataPath, newContent, 'utf8');

  console.log('Successfully updated data/postData.js');
}

rankPosts().catch(console.error);
