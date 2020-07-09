const path = require("path");

module.exports = {
  development: {
    username: "todo",
    password: "secret",
    database: "todo",
    host: "localhost",
    dialect: "sqlite",
    storage: path.resolve(__dirname, "../../todo.sqlite"),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
