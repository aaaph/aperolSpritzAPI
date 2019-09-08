const Router = require("koa-router");
const router = new Router();

const vouchers = require("./vouchers");

router.use("/api/vouchers", vouchers.routes());

module.exports = router;
