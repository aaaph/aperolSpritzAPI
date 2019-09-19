const Router = require("koa-router");
const router = new Router();

const models = require("../models");

const getVouchers = async (ctx, next) => {
  ctx.vouchers = await models.voucher.findAll();

  if (!ctx.vouchers) ctx.throw(404, "Vouchers empty");

  await next();
};
router.get("/", getVouchers, async (ctx, next) => {
  ctx.body = ctx.vouchers;

  await next();
});

router.get("/:properties/:values", getVouchers, async (ctx, next) => {
  const prop = ctx.params.properties.split("&");
  const vals = ctx.params.values.split("&");
  if (prop.length != vals.length)
    ctx.throw(400, "props count must be equals values count");
  const attr = ctx.vouchers[0]._options.attributes;

  if (prop.map(item => attr.includes(item)).every(item => item)) {
    const filter = ctx.vouchers
      .map(vouchers => vouchers.dataValues)
      .filter(voucher => {
        const arr = prop.map((item, i) =>
          voucher[item] == vals[i] ? voucher : false
        );
        return arr.includes(false) ? null : voucher;
      });
    if (!(filter.length > 0)) ctx.throw(404, "not found");
    ctx.body = filter;
  } else {
    ctx.throw(400, "invalid prop inputes");
  }
  await next();
});

module.exports = router;
