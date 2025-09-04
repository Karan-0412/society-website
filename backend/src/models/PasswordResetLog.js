import { DataTypes } from 'sequelize';

const PasswordResetLogModel = (sequelize) => {
  const PasswordResetLog = sequelize.define('password_reset_logs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    action: {
      type: DataTypes.ENUM('reset_requested', 'token_verified', 'password_reset', 'reset_failed'),
      allowNull: false
    },
    success: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  return PasswordResetLog;
};

export default PasswordResetLogModel;
