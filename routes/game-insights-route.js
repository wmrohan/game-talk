/*
 * @Author: Rohan Wijesundara 
 */
const express = require('express');
const router = express.Router();

const {
    analyzeGameWithFeedback,
} = require('../controllers/game-insights-controller');


const {
    validateGameInsight,
} = require('../validators/game-insights-validator');

router.post("/",validateGameInsight,analyzeGameWithFeedback);


module.exports = router;