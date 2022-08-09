const log4js = require('log4js');
// const log4js_extend = require("log4js-extend");
const loggerHeader = require('../package.json')['name'];
const chalk = require('ansi-colors');

// log4js_extend(log4js, {
//   path: __dirname,
//   format: "(@file:@line:@column)"
// });
const loggerInit = log4js.getLogger(loggerHeader.toUpperCase());
loggerInit.level = 'trace';

let logger = {}

logger.debug = (...args)=>{
  loggerInit.debug(chalk.cyan.bold(JSON.stringify(args)))
}

logger.custom = (args)=>{
  loggerInit.debug(args)
}

logger.error = (...args)=>{
  loggerInit.error(chalk.red.bold(args))
}

logger.fatal = (...args)=>{
  loggerInit.fatal(chalk.bgRedBright.bold(args))
}

logger.info = (...args)=>{
  loggerInit.info(chalk.green.bold(args))
}
module.exports = logger;