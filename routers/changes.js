const Router = require("koa-router");
const router = new Router();

const models = require("../models");

router.get("/", async (ctx, next) => {
  const changes = await models.change.findAll();
  console.log(changes);
  ctx.body = changes;
  await next();
});
router.get("/:id", async (ctx, next) => {
  //check for changeId
  let changes = await models.change.findByPk(ctx.params.id);
  if (!changes)
    changes = await models.change.findAll({
      where: { voucherId: ctx.params.id }
    });
  if (!changes) ctx.throw(404, "not found");

  ctx.body = changes;
  await next();
});

module.exports = router;
