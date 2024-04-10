const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.post('/test', userController.test);

router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router;