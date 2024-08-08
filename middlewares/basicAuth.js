/*
 * @Author: Rohan Wijesundara 
 */
const logger = require('../lib/logger');
const express = require('express');

const {
  ERROR_MESSAGES,
  LOGGER,
  HTTP_RESPONSE
} = require("../common/static.json");


exports.handleJsonParseErrors =  (req, res, next) => {
  express.json()(req, res, err => {
      if (err) {
          logger.log(
              LOGGER.ERROR,
              LOGGER.APP_INFO +  
              JSON.stringify(`${err.message}`)
          );
          return res.status(HTTP_RESPONSE.HTTP_BAD_REQUEST).json({
              status: LOGGER.ERROR,
              message: ERROR_MESSAGES.INVALID_JSON_FORMAT
          });
      }
      next();
  });
}
