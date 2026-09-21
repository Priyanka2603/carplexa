const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "unique_email"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    profile_image: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('admin','user','dealer'),
      allowNull: false,
      defaultValue: "user"
    },
    dealer_logo: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    dealer_cover_image: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    dealership_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    business_registration_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(11,8),
      allowNull: true
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    login_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    device_type: {
      type: DataTypes.ENUM('ios','android'),
      allowNull: true
    },
    device_token: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    socket_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    social_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    social_type: {
      type: DataTypes.ENUM('google','apple','facebook'),
      allowNull: true
    },
    forgot_hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    forgot_hash_expiry: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: false,
      defaultValue: "active"
    }
  }, {
    sequelize,
    tableName: 'users',
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
        name: "unique_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "idx_status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
      {
        name: "idx_social_id",
        using: "BTREE",
        fields: [
          { name: "social_id" },
        ]
      },
      {
        name: "idx_forgot_hash",
        using: "BTREE",
        fields: [
          { name: "forgot_hash" },
        ]
      },
      {
        name: "idx_socketId",
        using: "BTREE",
        fields: [
          { name: "socket_id" },
        ]
      },
      {
        name: "idx_location",
        using: "BTREE",
        fields: [
          { name: "location" },
        ]
      },
      {
        name: "idx_latitude_longitude",
        using: "BTREE",
        fields: [
          { name: "latitude" },
          { name: "longitude" },
        ]
      },
      {
        name: "idx_deletedAt",
        using: "BTREE",
        fields: [
          { name: "deletedAt" },
        ]
      },
    ]
  });
};
