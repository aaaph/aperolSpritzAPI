const Router = require("koa-router");
const router = new Router();

const models = require("../models");
const crypto = require("crypto");

router.get("/", async (ctx, next) => {
  const vouchers = await models.voucher.findAll();
  ctx.body = vouchers;

  await next();
});

router.get("/:id", async (ctx, next) => {
  const voucher = await models.voucher.findByPk(ctx.params.id);
  ctx.body = { status: "success", voucher: voucher };

  await next();
});

router.post("/", async (ctx, next) => {
  const obj = {
    number: crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase(),
    offer: ctx.request.body.offer,
    venue: ctx.request.body.venue,
    expiry: new Date(),
    brand: ctx.request.body.brand,
    PIN: ctx.request.body.PIN
  };
  const voucher = await models.voucher.create(obj);
  ctx.body = { status: "success", voucher: voucher };
  await next();
});

router.patch("/:id", async (ctx, next) => {
  const obj = {
    offer: ctx.request.body.offer,
    venue: ctx.request.body.venue,
    expiry: new Date(),
    brand: ctx.request.body.brand,
    PIN: ctx.request.body.PIN,
    status: ctx.request.body.status
  };
  const voucher = await models.voucher.findByPk(ctx.params.id);
  const updateVoucher = await voucher.update(obj);
  ctx.body = { status: "updated", voucher: updateVoucher };
  await next();
});

router.delete("/:id", async (ctx, next) => {
  const voucher = await models.voucher.findByPk(ctx.params.id);
  const del = await voucher.destroy();
  ctx.body = { status: "succes", result: del };
  await next();
});

module.exports = router;
