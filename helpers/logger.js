const log4js = require('log4js');
const log4js_extend = require("log4js-extend");
const loggerHeader = require('../package.json')['name']
log4js_extend(log4js, {
  path: __dirname,
  format: "(@file:@line:@column)"
});
const logger = log4js.getLogger(loggerHeader.toUpperCase());
logger.level = 'trace';

module.exports = logger;