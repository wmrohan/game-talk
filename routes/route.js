/*
 * @Author: Rohan Wijesundara 
 */
const {ROUTE} = require('../common/constant');

module.exports = function (app) {
    const API_PREFIX = "/v" + process.env.VERSION;

    app.get(API_PREFIX + '/', function(req, res){
        res.send('Welcome to GameTalk OpenAPI - Version - ' + process.env.VERSION);
    });

    app.use(API_PREFIX + ROUTE.GAME_INSIGHTS.PREFIX, require('./game-insights-route'));

}