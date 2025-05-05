const express = require('express');
const router = express.Router();
const { getRecommendation } = require('../controllers/geminiController');

router.post('/', getRecommendation);

module.exports = router;
