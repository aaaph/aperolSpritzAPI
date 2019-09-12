const rfs = require("rotating-file-stream");
const fs = require("fs");
const path = require("path");
const appRoot = require("app-root-path");
const winston = require("winston");
const koaLogger = require("koa-logger");

const logDir = path.join(appRoot.path, "logs");

fs.existsSync(logDir) || fs.mkdirSync(logDir);

const sequelizeStream = rfs("dbAccess.log", {
  size: "10M",
  interval: "1d",
  path: path.join(logDir, "db")
});

const sequelizeLogger = sql => {
  sequelizeStream.write(sql + "\n");
};
const accesStream = rfs("access.log", {
  size: "10M",
  interval: "1d",
  path: path.join(logDir, "access")
});
const accessLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [new winston.transports.Stream({ stream: accesStream })]
});
const accessLoggerMiddleware = async (ctx, next) => {
  const log = accessLogger.log({
    level: "info",
    message: {
      log: ctx.request
    }
  });
  await next();
};
const errorStream = rfs("error.log", {
  size: "10M",
  interval: "1d",
  path: path.join(logDir, "error")
});
const errorLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [new winston.transports.Stream({ stream: errorStream })]
});

const devLogger = koaLogger();

module.exports = {
  sequelizeLogger,
  accessLoggerMiddleware,
  devLogger,
  errorLogger
};
