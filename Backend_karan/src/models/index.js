import sequelize from '../config/database.js';
import UserModel from './User.js';
import PasswordResetLogModel from './PasswordResetLog.js';

const User = UserModel(sequelize);
const PasswordResetLog = PasswordResetLogModel(sequelize);

// Set up associations
User.hasMany(PasswordResetLog, { foreignKey: 'user_id' });
PasswordResetLog.belongsTo(User, { foreignKey: 'user_id' });

export { sequelize, User, PasswordResetLog };
