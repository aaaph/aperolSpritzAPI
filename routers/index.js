const router = new require("koa-router")();

const vouchers = require("./vouchers");

router.use("/api/vouchers", vouchers.routes());

module.exports = router;
