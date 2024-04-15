const express = require('express');
const router = express.Router();
const rssController = require('../controllers/rssController');

// RSS 피드를 파싱하고 데이터베이스에 저장하는 라우트
router.get('/fetch-rss', rssController.fetchAndStoreRssFeeds);

module.exports = router;
