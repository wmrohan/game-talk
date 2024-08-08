/*
 * @Author: Rohan Wijesundara
 */
require("dotenv").config();

const express       = require('express');
const bodyParser    = require('body-parser')
const Constants     = require("./common/constant");
const chalk         = require('chalk');
const app           = express();
const PORT          = process.env.PORT || 3000;
const cors          = require('cors');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const {
  handleJsonParseErrors
}  = require("./middlewares/basicAuth");

// Swagger definition ========================================
const swaggerDocument = YAML.load('./swagger.yaml');

// Middleware for parsing JSON and catching JSON parsing errors
app.use(handleJsonParseErrors);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Define routes
const routes = require('./routes/route')(app);

//Up Sever
const serverDateTime = new Date().toLocaleString('en-US', {
    timeZone: Constants.TIME_ZONE
  });

// Start the server
const server = app.listen(PORT, () => {
  if (!process.env.APP_ENV) {
    console.log(chalk.bold(chalk.bgRedBright('> '+' Environment is not set, please choose local, development, production or test')));
    process.exit(0);
  }

  console.log(chalk.bgWhite.black('\n====================================================================\n>>>   Gametalk OpenAPI start on port  - ' + PORT + '          <<<\n===================================================================='));
  console.log(chalk.bold(chalk.bgRedBright('> '+' Environment :' + process.env.APP_ENV )));
  console.log(chalk.bold(chalk.white('> ')+' Date Time :' + serverDateTime+'\n'+chalk.white('> ')+' Access '+chalk.bgYellow.black(' SERVER ')+' - '+chalk.blue.underline('http://localhost:' + PORT +'/')+'\n'+chalk.white('> ')+' Access to API '+chalk.bgGreenBright.black(' DOCUMENTATION ')+' - '+chalk.blue.underline('http://localhost:' + PORT + '/api-docs/')));
  console.log(chalk.bgWhite.black('====================================================================\n'));
});


module.exports = server;











