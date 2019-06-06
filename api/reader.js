const fs = require('fs');
const { join } = require('path');
const folder = join(__dirname, '..', 'posts');

/**
 *
 * @param slug Slug of the post to fetch
 * @returns {*} The complete post
 */
const readPost = (slug) => {
  try {
    const content = fs.readFileSync(`${ folder }/${ slug }.md`, 'utf-8');
    const meta = JSON.parse(fs.readFileSync(`${ folder }/${ slug }.meta.json`, 'utf-8'));

    return {
      ...meta,
      slug,
      content,
    };
  } catch(ex) { console.log(ex) }
};

/**
 * Get a list of all posts
 * @returns {any[]}
 */
const listPosts = () => {
  const files = fs.readdirSync(folder);
  return files
    .filter(file => file.endsWith('.md')) // filter for only markdown files
    .map(f => f.substring(0, f.length - 3)) // Remove .md extension
    .map(readPost); // Get all post contents
};

const filterPosts = (comparator) => {
  const posts = listPosts();
  return posts.filter(comparator)
};

module.exports = {
  readPost,
  listPosts,
  filterPosts,
};