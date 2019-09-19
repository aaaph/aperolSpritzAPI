require("dotenv").config();
module.exports = {
  development: {
    username: process.env.username_dev,
    password: process.env.password_dev,
    database: process.env.database_dev,
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    host:
      "postgres://ztxkcxobsilpph:47e29c59596377925e3faa07895d4027c9f18d00897927271849a332abd1f0dd@ec2-174-129-27-3.compute-1.amazonaws.com:5432/d5fciusav0kv6u",
    dialect: "postgres",
    use_env_variable: true
  }
};
