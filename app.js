const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const testlogger = require("./config/loggerConfig");
const app = new Koa();
require("dotenv").config();

const router = require("./routers");
const db = require("./models");

app
  .use(testlogger.accessLoggerMiddleware)
  .use(testlogger.devLogger)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.on("error", (err, ctx) => {
  console.log(err);
  if (!ctx || ctx.headerSent || !ctx.writable) return;
  if (err.name == "SequelizeValidationError") {
    //ctx.writable = false;
    let message = "";
    err.errors.forEach(element => {
      message += `${element.message}\n`;
    });
    ctx.status = err.status = 400;
    ctx.res.end(message);
  } else {
    ctx.writable = false; //  interrupt `ctx.onerror`
    ctx.status = err.status || 500;
    ctx.res.end();
    ctx.body = err.message;
  }
  testlogger.errorLogger.error({
    errorDate: new Date(),
    error: {
      context: ctx,
      message: err.message,
      status: err.status,
      original: err.stack
    }
  });
  //ctx.res.end(err.message);
  //write to log file need=
});
const port = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`server listen on ${port} port`);
  });
});

module.exports = app;
