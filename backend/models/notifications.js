module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notifications', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    sender_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    receiver_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    notification_type: {
      type: DataTypes.ENUM('booking', 'message', 'review', 'payment', 'follow', 'friend_request', 'like', 'comment', 'system'),
      allowNull: false
    },
    reference_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active'
    }
  }, {
    tableName: 'notifications',
    timestamps: true,
    paranoid: true
  });
};
