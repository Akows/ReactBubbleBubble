const express = require('express');
const router = express.Router();
const userController = require('../controllers/postController.js');

router.post('/test', userController.test);