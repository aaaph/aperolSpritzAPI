"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("vouchers", "userId", {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "User id can'not be empty" }
      },
      unique: { args: true, msg: "userId is unique value" }
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
