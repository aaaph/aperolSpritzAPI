//require("dotenv").config();
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
      "postgres://diykwiovmmkhgx:c73a93a9224e305671dbbfa47ca88aa042ff9bf26dddd46d149330f5fed7dc34@ec2-54-221-243-211.compute-1.amazonaws.com:5432/d27qbf3m55e9eb",
    dialect: "postgres",
    use_env_variable: true
  }
};
