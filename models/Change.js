module.exports = (sequelize, DataTypes) => {
  const Change = sequelize.define("change", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    voucherId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "issued",
      validate: {
        isIn: {
          args: [["created", "updated", "deleted"]],
          msg:
            "status is enum, can be is only one next value: created, updated, deleted"
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      validate: {
        isDate: { args: true, msg: "Invalid input of property 'expiry'" }
      }
    },
    before: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    after: { type: DataTypes.JSONB, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: false }
  });
  return Change;
};
