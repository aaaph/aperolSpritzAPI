const Router = require("koa-router");
const router = new Router();

const vouchers = require("./vouchers");
const changes = require("./changes");

router.use("/api/vouchers", vouchers.routes());
router.use("/api/changes", changes.routes());

router.all("/", (ctx, next) => {
  ctx.redirect("/api/vouchers");
});
module.exports = router;
