/*
 * @Author: Rohan Wijesundara
 */
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.CHAT_GPT_KEY
});
const responseType = require("../common/static.json");
const logger = require('../lib/logger');


/**
 * Asynchronously requests a response from the ChatGPT model based on user input and additional details.
 * @param {string} requestMessage - The initial user message for context.
 * @param {string} prompt - Additional details to guide the model's response.
 * @returns {Promise<string>} - The text response from ChatGPT.
 */
const askChatGPT4 = async (requestMessage,content,prompt) => {
  try {
    const result = await openai.chat.completions.create({
      model: process.env.CHAT_GPT_MODEL_4,
      messages: [
        requestMessage,
        {
          role: "user", 
          content: `${content} : ${JSON.stringify({prompt})}`
        }
      ],
    });
    return JSON.parse(JSON.stringify(result.choices[0].message.content));
  } catch (error) {
      logger.log(
        responseType.LOGGER.ERROR,
        responseType.LOGGER.AI_SERVICE_INFO + JSON.stringify(`Error during API call to ChatGPT-4: ${error.message}`)
      );
      throw new Error(`Failed to get response from ChatGPT 4.0: ${error.message}`);
  }
}
/**
 * Analyzes feedback on task performance from game data, focusing on team behavior and safety improvements.
 * This function formats the task data for AI processing, sends it to ChatGPT for analysis, and then logs the AI-generated feedback.
 * @param {Object} data - The input data describing the behaviors and performances of various teams.
 * @param {number} fileId - A unique identifier used to name the output file.
 */
exports.analyzeTasksFeedback = async (data) => {

  let results = '';
    try {
    const content = 'Analyze the game progress';
    const requestMessage = {
      role: "system", 
      content: `The teams are playing this game to improve  and "Behaviors" are the areas the teams supposed to act on. Based on the number results give affective 
      elaborated feedback in English on progress of each team in the form of comments from start to end to each team separately covering all the teams and all the behaviors. 
      The feedback should be in a more conversational form and in the performance order from highest to lowest. Suggest corrective actions for poor performing teams.
       Description relevant to the data being provided is as below
        {
          "groupname": "Name of the teams",
        }
        {
          "name": "Name of the Behavior",
        }
        {
          "count": "How many times a team has performed a relevant behaviour during this game,
        }
        \`\`\`
        `
    };
    // Optionally, analyze or enhance each question's response using ChatGPT
    results = await askChatGPT4(requestMessage,content,data);
    } catch (error) {
      logger.log(
        responseType.LOGGER.ERROR,
        responseType.LOGGER.AI_SERVICE_INFO 
        + JSON.stringify(`Analyze Tasks Feedback error ${error.message}`)
        );
        throw new Error(`Failed to analyze task feedback: ${error.message}`);
    }
    return results;
}


