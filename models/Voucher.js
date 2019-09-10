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
        isUppercase: true,
        notEmpty: true,
        len: [8, 8]
      }
    },
    //Offer: What is being provided by the User?
    offer: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    //Venue: Which venue(s) are part of the offer?
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    //Expiry: When does the offer expire?
    expiry: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    //Brand: Which brand(s) (use Tags)
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    //PIN: The PIN a Bartender will use to redeem the Voucher
    PIN: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [6, 6]
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
