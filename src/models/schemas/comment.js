import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const commentModel = sequelize.define('comment', {
  organizationId: { type: DataTypes.STRING },
  comment: DataTypes.STRING,
  deleteMark: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default commentModel;
