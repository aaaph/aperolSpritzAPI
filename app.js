const Koa = require("koa");
const http = require("http");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");

const app = new Koa();
require("dotenv").config();

const router = require("./routers");
const db = require("./models");

app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.on("error", (err, ctx) => {
  console.error(err.stack);
  if (!ctx || ctx.headerSent || !ctx.writable) return;
  ctx.writable = false; //  interrupt `ctx.onerror`
  ctx.status = err.status || 500;
  //ctx.res.end(err.message);
  //write to log file need=
});
const port = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(port);
});
console.info(`listening on port ${port}`);

module.exports = app;
