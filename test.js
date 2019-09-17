const updatedVoucher = {
  id: 123,
  PIN: "0000010"
};
const before = {
  PIN: "000000"
};

console.log(
  (
    `update voucher with id ${updatedVoucher.id},\n` +
    `${
      !(before.PIN == updatedVoucher.PIN)
        ? `PIN changed from ${before.PIN} to ${updatedVoucher.PIN}`
        : ""
    }`
  ).slice(0, -1)
);
