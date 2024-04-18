const express = require('express');
const router = express.Router();
const contentsController = require('../controllers/contentController');

// 전체 콘텐츠 조회 라우트
router.get('/fetchContents', contentsController.fetchAllContents);

module.exports = router;
