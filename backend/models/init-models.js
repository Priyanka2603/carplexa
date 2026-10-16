var DataTypes = require("sequelize").DataTypes;
var _brands = require("./brands");

function initModels(sequelize) {
  var brands = _brands(sequelize, DataTypes);


  return {
    brands,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
