const Parser = require('rss-parser');
const parser = new Parser();
const db = require('../config/database');

const feedUrls = [
  'https://reactjs.org/feed.xml',
  'https://overreacted.io/rss.xml',
];

exports.fetchAndStoreRssFeeds = async (req, res) => {
  try {
    for (let url of feedUrls) {
      const feed = await parser.parseURL(url);
      await Promise.all(feed.items.map(async (item) => {
        const { title, link, contentSnippet, isoDate } = item;

        console.log(title, link);

        // const [rows] = await db.query('INSERT INTO Contents (title, link, description, publishedDate) VALUES (?, ?, ?, ?)', [title, link, contentSnippet, isoDate]);
      }));
    }
    res.status(200).send('RSS Feeds fetched and stored successfully.');
  } catch (error) {
    console.error('Failed to fetch or store RSS feeds:', error);
    res.status(500).send('Error fetching or storing RSS feeds.');
  }
};
