/**
 * Here, we're using Sequelize to mention details related to our database.
 */

const Sequelize = require("sequelize");
const {
  sequelize_database,
  sequelize_username,
  sequelize_password,
  sequelize_host,
  sequelize__dialect,
} = require("../config/index");
const sequelize = new Sequelize(
  sequelize_database,
  sequelize_username,
  sequelize_password,
  {
    host: sequelize_host,
    dialect: sequelize__dialect,
  }

  /*
  "icarus", //dbname
  "icarus", //user
  "tiger", //password
  {
    host: "localhost",
    dialect: "postgres",
  }
  */
);

sequelize.sync(); // Check if a table exists, if not then crate one.

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (err) {
    // console.log(err)
    console.log("Connection to database failed.");
  }
};
connectDB();

module.exports = sequelize;
