const rssController = require('../controllers/rssController');

async function testFetchAndStore() {
  await rssController.fetchAndStoreRssFeeds();
  console.log('스크립트 정상 실행됨');
}

testFetchAndStore();
