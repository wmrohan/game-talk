"use strict";

const Joi = require("joi");
const logger = require('../lib/logger');
const {LOGGER,
  VALIDATION,
  HTTP_RESPONSE,
  } 
  = require("../common/static.json");

  const {
    formatErrorResponse
    } = require("../common/util");


exports.validateGameInsight = async (req, res, next) => {

  let data = req.body;
  const Schema = Joi.object()
    .options({ abortEarly: false })
    .keys({
      groupname: Joi.string().min(1).max(10).required(),
      name: Joi.string().min(1).max(60).required(),
      count: Joi.number().required()
    });
  try {
    for (const item of data) {
      await Schema.validateAsync(item);
    }
      logger.log(LOGGER.INFO, LOGGER.VALIDATIONS  +  
        VALIDATION.SUCCESS + LOGGER.AI_SERVICE_INFO + 
        `| data: ${JSON.stringify(req.body)}`); 
      next();
  } catch (error) {
        const clientError = formatErrorResponse(error);
        res.status(HTTP_RESPONSE.HTTP_VALIDATION_ERROR)
        .json(clientError);
      logger.log(
        LOGGER.WARN,LOGGER.VALIDATIONS +  
        VALIDATION.FAILED + LOGGER.AI_SERVICE_INFO
        + `| data: ${JSON.stringify(
          data
        )} 
              | error: ${JSON.stringify(clientError)}`
      );
    res.end();
  }
};

