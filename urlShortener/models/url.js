"use strict";
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("postgres::memory:");

class Url extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Url.init(
  {
    short_url: DataTypes.STRING,
    long_url: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Url",
    tableName: "urls",
  }
);

module.exports = Url;
