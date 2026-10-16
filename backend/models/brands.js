const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('brands', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "unique_brand_name"
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "unique_brand_slug"
    },
    logo: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: false,
      defaultValue: "active"
    }
  }, {
    sequelize,
    tableName: 'brands',
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
        name: "unique_brand_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "unique_brand_slug",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "slug" },
        ]
      },
      {
        name: "idx_brand_status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
      {
        name: "idx_brand_deletedAt",
        using: "BTREE",
        fields: [
          { name: "deletedAt" },
        ]
      },
    ]
  });
};
