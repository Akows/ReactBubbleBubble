const Parser = require('rss-parser');
const parser = new Parser();
const db = require('../config/database');

const feedUrls = [
  'https://reactjs.org/feed.xml',
  'https://overreacted.io/rss.xml',
];

exports.fetchAndStoreRssFeeds = async () => {
  try {
    for (let url of feedUrls) {
      const feed = await parser.parseURL(url);
      await Promise.all(feed.items.map(async (item) => {
        const { title, link, contentSnippet, isoDate, guid } = item;

        // 데이터베이스 쿼리 실행 (중복된 데이터를 방지하기 위해 `guid` 필드 사용)
        const sql = `
          INSERT INTO RBBContents (title, link, description, publishedDate, guid)
          VALUES (?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
          title = VALUES(title),
          link = VALUES(link),
          description = VALUES(description),
          publishedDate = VALUES(publishedDate);
        `;
        await db.query(sql, [title, link, contentSnippet, isoDate, guid]);
      }));
    }
    console.log('RSS 피드가 성공적으로 가져오고 저장되었습니다.');

  } catch (error) {
    console.error('RSS 피드를 가져오거나 저장하는데 실패했습니다:', error);
  }
};
