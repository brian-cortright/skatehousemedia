const { posts } = require("./postData");

const taxonomy = {
  categories: [...new Set(posts.flatMap((post) => post.categories || []))],
  tags: [...new Set(posts.flatMap((post) => post.tags || []))],
};

module.exports = { taxonomy };
