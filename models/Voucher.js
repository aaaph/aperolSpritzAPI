module.exports = (sequelize, DataTypes) => {
  const Voucher = sequelize.define("voucher", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    //Voucher Number: Which is shown on the voucher (randomise but unique 8 characters uppercase/numbers)
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUppercase: { args: true, msg: "number upper case only" },
        notEmpty: { args: true, msg: "number can not be empty" },
        len: { args: [8, 8], msg: "number has fix size in 8 symbols" }
      }
    },
    //Offer: What is being provided by the User?
    offer: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "offer can not be empty" }
      }
    },
    //Venue: Which venue(s) are part of the offer?
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "venue can not be empty" }
      }
    },
    //Expiry: When does the offer expire?
    expiry: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { args: true, msg: "invalid input expiry" }
      }
    },
    //Brand: Which brand(s) (use Tags)
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "brand can not be empty" }
      }
    },
    //PIN: The PIN a Bartender will use to redeem the Voucher
    PIN: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: "Pin must be digits only"
        },
        len: { args: [6, 6], msg: "Pin must have 6 digits only" }
      }
    },
    // status Issued, Redeemed, Cancelled
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["issued", "redeemed", "cancelled"],
      defaultValue: "issued"
    }
  });
  return Voucher;
};
