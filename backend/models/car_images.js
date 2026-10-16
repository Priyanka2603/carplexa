const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('car_images', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    car_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'cars',
        key: 'id'
      }
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    sort_order: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'car_images',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_car_images_car_id",
        using: "BTREE",
        fields: [
          { name: "car_id" },
        ]
      },
      {
        name: "idx_car_images_sort_order",
        using: "BTREE",
        fields: [
          { name: "sort_order" },
        ]
      },
      {
        name: "idx_car_images_deletedAt",
        using: "BTREE",
        fields: [
          { name: "deletedAt" },
        ]
      },
    ]
  });
};
