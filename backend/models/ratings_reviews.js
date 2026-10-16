module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ratings_reviews', {
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
    reviewed_user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active'
    }
  }, {
    tableName: 'ratings_reviews',
    timestamps: true,
    paranoid: true
  });
};
