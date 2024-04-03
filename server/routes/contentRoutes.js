const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController.js');

router.post('/test', contentController.test);