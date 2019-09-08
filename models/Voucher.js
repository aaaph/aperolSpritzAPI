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
      allowNull: false
    },
    //Offer: What is being provided by the User?
    offer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    //Venue: Which venue(s) are part of the offer?
    venue: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //Expiry: When does the offer expire?
    expiry: {
      type: DataTypes.DATE,
      allowNull: false
    },
    //Brand: Which brand(s) (use Tags)
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //PIN: The PIN a Bartender will use to redeem the Voucher
    PIN: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // status Issued, Redeemed, Cancelled
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Issued"
    }
  });
  return Voucher;
};
