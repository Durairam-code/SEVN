const Sequelize = require("sequelize");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const db = {};
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    storage: path.resolve(__dirname, process.env.DB_STORAGE),
    pool: {
      max: parseInt(process.env.POOL_MAX),
      min: parseInt(process.env.POOL_MIN),
      accquire: parseInt(process.env.POOL_ACCQUIRE),
      idle: parseInt(process.env.POOL_IDLE),
    },
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
