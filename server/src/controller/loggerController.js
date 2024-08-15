const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({format:"YYYY-MM-DD HH:mm:ss"}),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
        filename: 'src/logs/info.log',
        level:'info'
    }),
    new winston.transports.File({
        filename: 'src/logs/error.log',
        level:'info'
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

module.exports = { logger };
