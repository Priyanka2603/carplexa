module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    room_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    sender_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    receiver_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    message_type: {
      type: DataTypes.ENUM('text', 'image', 'video', 'file', 'audio'),
      allowNull: false,
      defaultValue: 'text'
    },
    file_url: {
      type: DataTypes.STRING(500),
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
    tableName: 'messages',
    timestamps: true,
    paranoid: true
  });
};
