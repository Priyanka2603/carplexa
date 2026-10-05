var DataTypes = require("sequelize").DataTypes;
var _cars = require("./cars");

function initModels(sequelize) {
  var cars = _cars(sequelize, DataTypes);


  return {
    cars,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
