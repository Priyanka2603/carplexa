module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chat_rooms', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    sender_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    receiver_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    last_message_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active'
    }
  }, {
    tableName: 'chat_rooms',
    timestamps: true,
    paranoid: true
  });
};
