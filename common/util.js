const responseType = require("./static.json");
const languageSet = require("../languages/translation.json");

const {
  VALIDATION,
  } 
  = require("./static.json");

exports.formatErrorResponse =  (error) => {
  let customErrorMessages = [];
  let errorResponse = {};
  if (error.details && Array.isArray(error.details)) {
      for (let detail of error.details) {
          customErrorMessages.push(detail.message);
      }
      errorResponse = {
          status: VALIDATION.FAILED,
          details: VALIDATION.FAILED_MESSAGE,
          message: customErrorMessages,
      };
  } else {
      errorResponse = {
          status: VALIDATION.FAILED,
          details: VALIDATION.FAILED_MESSAGE,
          message: error.message,
      };
  }
  return errorResponse;
}


exports.postResponse =  (data,error) => {  
  let response = {
    status: responseType.RESPONSE.SUCCESS,
    action: responseType.ACTION.CREATE,
    data : data
    };
  let logger_info = responseType.LOGGER.INFO;
  let status_code = responseType.HTTP_RESPONSE.HTTP_CREATED;
  if(error) {
    response.status = responseType.RESPONSE.FAILED;
    response.error = error;
    logger_info = responseType.LOGGER.ERROR;
    status_code = responseType.HTTP_RESPONSE.HTTP_INTERNAL_SERVER_ERROR;
  } 
  return {data : response,status_code:status_code,logger_info:logger_info};

}


exports.setLogEntry = (data,user) => {
  return {
      userId : (user === null || user === undefined) ? 'web_id' : user.userID,
      email: (user === null || user === undefined) ? '' : user.email,
      result : JSON.stringify(data)
  };
};


exports.setLanguage = (lang) => {
    if (lang === "" || lang === undefined || lang === "en-US") {
      return languageSet["en-US"];
    }
    const langType = lang;
    return languageSet[langType] === undefined
      ? languageSet["en-US"]
      : languageSet[langType];
  };




