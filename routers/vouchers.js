const Router = require("koa-router");
const router = new Router();

const models = require("../models");
const crypto = require("crypto");
const uuidValidate = require("uuid-validate");

router.get("/", async (ctx, next) => {
  try {
    const vouchers = await models.voucher.findAll();
    ctx.body = vouchers;
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    ctx.body = { err: err.status, message: err.message };
    ctx.app.emit("error", err, ctx);
  }
  await next();
});
router.all("/:id", async (ctx, next) => {
  if (await !uuidValidate(ctx.params.id)) {
    ctx.throw(400, "incorrect uuid");
  }
  ctx.voucher = await models.voucher.findByPk(ctx.params.id);
  if (!ctx.voucher) {
    ctx.throw(404, "not found");
  }
  await next();
});
router.get("/:id", async (ctx, next) => {
  try {
    ctx.body = { status: "success", voucher: ctx.voucher };
  } catch (err) {
    err.status = err.statusCode || err.status || err.errStatus || 500;
    ctx.app.emit("error", err, ctx);
  }
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
  try {
    const updatedVoucher = await ctx.voucher.update(obj);
    ctx.body = { status: "updated", voucher: updatedVoucher };
  } catch (err) {
    err.status = err.statusCode || err.status || err.errStatus || 500;
    ctx.app.emit("error", err, ctx);
  }
  await next();
});

router.delete("/:id", async (ctx, next) => {
  try {
    await ctx.voucher.destroy();
    ctx.body = { status: "deleted" };
  } catch (err) {
    err.status = err.statusCode || err.status || err.errStatus || 500;
    ctx.app.emit("error", err, ctx);
  }
  await next();
});

module.exports = router;
