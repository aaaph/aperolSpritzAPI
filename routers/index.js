const Router = require("koa-router");
const router = new Router();

const vouchers = require("./vouchers");

router.use("/api/vouchers", vouchers.routes());
router.use("/api/find", require("./find").routes());

router.all("/", (ctx, next) => {
  ctx.redirect("/api/vouchers");
});
module.exports = router;
