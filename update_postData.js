const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'postData.ts');
const content = fs.readFileSync(filePath, 'utf8');

const match = content.match(/\[[\s\S]*\]/);
if (match) {
  const jsonStr = match[0];
  try {
    let posts = JSON.parse(jsonStr);
    posts = posts.map(p => ({
      ...p,
      featuredPost: false
    }));
    const newStr = JSON.stringify(posts, null, 2);
    const newContent = content.replace(jsonStr, newStr);
    fs.writeFileSync(filePath, newContent);
    console.log("Updated postData.ts successfully.");
  } catch(e) {
    console.error("Error parsing JSON:", e.message);
  }
} else {
  console.log("Could not find JSON array in file.");
}
