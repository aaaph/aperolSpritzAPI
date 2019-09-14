const Router = require("koa-router");
const router = new Router();

const models = require("../models");
const crypto = require("crypto");
const uuidValidate = require("uuid-validate");

router.get("/", async (ctx, next) => {
  try {
    const vouchers = await models.voucher.findAll();
    if (!vouchers) {
      ctx.throw(404, "array is empty");
    }
    //console.log(vouchers[0].dataValues);
    /*let v = vouchers
      .filter(voucher => voucher.dataValues.status === "check")
      .map(voucher => voucher.dataValues);

    console.log(v);*/
    ctx.body = vouchers;
    /*const local = await models.voucher
      .findOne()
      .then(voucher => voucher._options.attributes);
    console.log(local);*/
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    ctx.body = { err: err.status, message: err.message };
    ctx.app.emit("error", err, ctx);
  }
  await next();
});
router.all("/:id", async (ctx, next) => {
  if (await uuidValidate(ctx.params.id)) {
    ctx.voucher = await models.voucher.findByPk(ctx.params.id);
  } else {
    ctx.voucher = await models.voucher.findOne({
      where: {
        userId: ctx.params.id
      }
    });
  }
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
  let obj = {
    // target
    userId: ctx.request.body.userId,
    //
    number: crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase(),
    offer: ctx.request.body.offer
      ? ctx.request.body.offer.replace(/\s+/g, " ").trim()
      : ctx.request.body.offer,
    venue: ctx.request.body.venue
      ? ctx.request.body.venue.replace(/\s+/g, " ").trim()
      : ctx.request.body.venue,
    expiry: ctx.request.body.expiry ? parseInt(ctx.request.body.expiry) : 14,
    brand: ctx.request.body.brand
      ? ctx.request.body.brand.replace(/\s+/g, " ").trim()
      : ctx.request.body.brand,
    //target
    PIN: ctx.request.body.PIN,
    //
    //target
    status: ctx.request.body.status ? ctx.request.body.status : "issued"
    //target
  };
  let date = new Date();
  date.setDate(date.getDate() + obj.expiry);
  date = await new Date(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`
  ).setHours(new Date().getTimezoneOffset() / -60);
  obj.expiry = date;
  console.log(obj);
  const voucher = await models.voucher.create(obj);
  ctx.status = 201;
  ctx.body = { status: "created", voucher: voucher };
  await next();
});

router.patch("/:id", async (ctx, next) => {
  const obj = {
    offer: ctx.request.body.offer
      ? ctx.request.body.offer.replace(/\s+/g, " ").trim()
      : ctx.request.body.offer,
    venue: ctx.request.body.venue
      ? ctx.request.body.venue.replace(/\s+/g, " ").trim()
      : ctx.request.body.venue,
    brand: ctx.request.body.brand
      ? ctx.request.body.brand.replace(/\s+/g, " ").trim()
      : ctx.request.body.brand,
    PIN: ctx.request.body.PIN,
    status: ctx.request.body.status,
    userId: ctx.request.body.userId
  };
  if (ctx.request.body.expiry) {
    let date = await new Date();
    await date.setDate(date.getDate() + parseInt(ctx.request.body.expiry));
    date = await new Date(
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate() + 1}`
    ).setHours(new Date().getTimezoneOffset() / -60);
    obj.expiry = await date;
  }
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
router.delete("/delete/all", async (ctx, next) => {
  try {
    await models.voucher.destroy({
      where: {},
      truncate: true
    });
  } catch (err) {
    err.status = err.statusCode || err.status || err.errStatus || 500;
    ctx.app.emit("error", err, ctx);
  }
  ctx.redirect("/api/vouchers");
});
module.exports = router;
