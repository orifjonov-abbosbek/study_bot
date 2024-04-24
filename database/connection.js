const { Sequelize } = require("sequelize");
const config = require("../config/config");

// Initialize Sequelize with database configuration
const sequelize = new Sequelize(
  config.database.database,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    dialect: "postgres",
    port: config.database.port,
    dialectOptions: {
      ssl: config.database.ssl
        ? { require: true, rejectUnauthorized: false }
        : false, // Enable SSL if specified in config
    },
  }
);

module.exports = sequelize;
