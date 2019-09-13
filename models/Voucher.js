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
        isUppercase: {
          args: true,
          msg: "'Number' property is  upper case only"
        },
        notEmpty: { args: true, msg: "Property 'Number' can not be empty" },
        len: { args: [8, 8], msg: "'Number' has fix size in 8 symbols" }
      }
    },
    //Offer: What is being provided by the User?
    offer: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "nput string 'Offer' can not be empty" }
      }
    },
    //Venue: Which venue(s) are part of the offer?
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Input string 'Venue' can not be empty" }
      }
    },
    //Expiry: When does the offer expire?
    expiry: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { args: true, msg: "Invalid input of property 'expiry'" }
      }
    },
    //Brand: Which brand(s) (use Tags)
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Input string 'Brand' can not be empty" }
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
        len: { args: [6, 6], msg: "Property 'Pin' must have 6 digits only" }
      }
    },
    // status Issued, Redeemed, Cancelled
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "issued",
      validate: {
        isIn: {
          args: [["issued", "redeemed", "cancelled"]],
          msg:
            "status is enum, can be is only one next value: issued, redeemed, cancelled"
        }
      }
    }
  });
  return Voucher;
};
