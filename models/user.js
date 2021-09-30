const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");
const user = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      type: DataTypes.ENUM("user", "admin", "superAdmin"),
      // values: ["user", "admin", "superAdmin"],
      // enum: DataTypes.ENUM(["user", "admin", "superadmin"]), //
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = user;
