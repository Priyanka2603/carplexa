const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cars', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    vin: {
      type: DataTypes.STRING(17),
      allowNull: true
    },
    vehicle_year: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    vehicle_make: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    vehicle_model: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    vehicle_trim: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    vehicle_body: {
      type: DataTypes.ENUM('sedan','suv','hatchback','coupe','convertible','truck','van','wagon'),
      allowNull: false
    },
    engine: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    vehicle_doors: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    vehicle_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    clean_title: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    condition: {
      type: DataTypes.ENUM('new','used','certified'),
      allowNull: false,
      defaultValue: "used"
    },
    service_history: {
      type: DataTypes.ENUM('complete_records_available','partial_records','no_records'),
      allowNull: false,
      defaultValue: "no_records"
    },
    previous_owners: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    fuel_type: {
      type: DataTypes.ENUM('gasoline','hybrid','electric','diesel'),
      allowNull: false
    },
    transmission: {
      type: DataTypes.ENUM('automatic','manual'),
      allowNull: false,
      defaultValue: "automatic"
    },
    drive_type: {
      type: DataTypes.ENUM('awd','rwd','fwd','4wd'),
      allowNull: false
    },
    asking_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft','active','sold','archived'),
      allowNull: false,
      defaultValue: "draft"
    }
  }, {
    sequelize,
    tableName: 'cars',
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
        name: "idx_cars_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "idx_cars_vin",
        using: "BTREE",
        fields: [
          { name: "vin" },
        ]
      },
      {
        name: "idx_cars_vehicle_make",
        using: "BTREE",
        fields: [
          { name: "vehicle_make" },
        ]
      },
      {
        name: "idx_cars_vehicle_model",
        using: "BTREE",
        fields: [
          { name: "vehicle_model" },
        ]
      },
      {
        name: "idx_cars_vehicle_year",
        using: "BTREE",
        fields: [
          { name: "vehicle_year" },
        ]
      },
      {
        name: "idx_cars_vehicle_body",
        using: "BTREE",
        fields: [
          { name: "vehicle_body" },
        ]
      },
      {
        name: "idx_cars_fuel_type",
        using: "BTREE",
        fields: [
          { name: "fuel_type" },
        ]
      },
      {
        name: "idx_cars_transmission",
        using: "BTREE",
        fields: [
          { name: "transmission" },
        ]
      },
      {
        name: "idx_cars_drive_type",
        using: "BTREE",
        fields: [
          { name: "drive_type" },
        ]
      },
      {
        name: "idx_cars_status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
      {
        name: "idx_cars_deletedAt",
        using: "BTREE",
        fields: [
          { name: "deletedAt" },
        ]
      },
    ]
  });
};
