var winston = require('winston');
const Config = require('../config.js');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: Config.PATH + '/log/debug.log', json: false })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: Config.PATH + '/log/exceptions.log', json: false })
  ],
  exitOnError: false
});

module.exports = logger;