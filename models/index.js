const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const logger = require("../config/loggerConfig");
const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(config.host);
} else {
  sequelize = new Sequelize(
    process.env.database_dev,
    process.env.username_dev,
    process.env.password_dev,
    {
      host: "127.0.0.1",
      dialect: "postgres",
      logging: logger.sequelizeLogger
    }
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
