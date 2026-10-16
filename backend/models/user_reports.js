module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_reports', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    reporter_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    reported_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    reason: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'reviewed', 'resolved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    }
  }, {
    tableName: 'user_reports',
    timestamps: true,
    paranoid: true
  });
};
