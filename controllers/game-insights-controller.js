/*
 * @Author: Rohan Wijesundara
 */
const {
  ERROR_MESSAGES,
  LOGGER
} = require("../common/static.json");
const logger = require("../lib/logger");
const {
  postResponse,
  setLogEntry,
} = require("../common/util");


const {
  analyzeTasksFeedback,
} = require("../services/ai-service");

/**
 * @function analyze  Game With Feedback
 * @description  analyze  Game With Feedback
 * @param {Array} req
 * @param {Array} res
 */
exports.analyzeGameWithFeedback = async function (req, res) {
  let response = {};
  let message = null;
  try {
    let result = await analyzeTasksFeedback(req.body);
    response = postResponse({
       result
    });
    message = setLogEntry(result);
  } catch (error) {
    response = postResponse(
      {},
      ERROR_MESSAGES.ERROR_PROCESSING_YOUR_REQUEST
    );
    message = setLogEntry(error.message);
  }
  res.status(response.status_code).json(response.data);
  logger.log(
    response.logger_info,
    LOGGER.AI_SERVICE_INFO + JSON.stringify(message)
  );
};


