const fetch = require('node-fetch');

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

    // First try the oEmbed endpoint as it's the cleanest
    try {
      const oembed = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`;
      const res = await fetch(oembed, { timeout: 5000 });
      if (res.status === 200) return true;
    } catch(e) {}

    // If oEmbed fails (like 403 for privacy settings or 404 for deleted)
    // Try hitting the player endpoint
    const playerUrl = `https://player.vimeo.com/video/${videoId}`;
    const playerRes = await fetch(playerUrl, {
      timeout: 5000,
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'follow'
    });

    // Some deleted videos redirect or give 404
    if (playerRes.status !== 200) return false;

    const text = await playerRes.text();
    // A video that gives a specific error (like "Sorry, this video does not exist" or private)
    // usually does not contain a robust playerConfig object.
    if (!text.includes('window.playerConfig = {')) return false;

    // We can also check for error messages in the HTML specifically
    if (text.includes('Private Video') || text.includes('This video is private')) return false;

    return true;
  } catch(e) {
    return false;
  }
}

async function test() {
  console.log("Vimeo valid 1 (8528974):", await checkVimeo("http://player.vimeo.com/video/8528974"));
  console.log("Vimeo valid 2 (34454482):", await checkVimeo("https://vimeo.com/34454482"));
  console.log("Vimeo valid 3 (34380806):", await checkVimeo("http://player.vimeo.com/video/34380806"));
  console.log("Vimeo invalid 1 (invalid):", await checkVimeo("https://vimeo.com/invalidid12345"));
}

test();
