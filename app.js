const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const koaqs = require("koa-qs");
const app = new Koa();
require("dotenv").config();
koaqs(app);

const router = require("./routers");
const db = require("./models");

app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.on("error", async (err, ctx) => {
  console.log(err, ctx);
  //write to log file need
});
const port = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(port);
});
console.info(`listening on port ${port}`);

module.exports = app;
