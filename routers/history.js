const Router = require("koa-router");
const router = new Router();

const models = require("../models");

router.get("/", async (ctx, next) => {
  console.log(123);
  try {
    const changes = await models.change.findAll();
    ctx.body = changes;
    //await next();
  } catch (err) {
    err.status = err.statusCode || err.status || err.errStatus || 500;
    ctx.app.emit("error", err, ctx);
  }
});

router.get("/:id", async (ctx, next) => {
  console.log(123);
  //check for changeId
  let changes = await models.change.findByPk(ctx.params.id);

  if (!changes) ctx.throw(404, "not found");

  ctx.body = changes;
  await next();
});

module.exports = router;
