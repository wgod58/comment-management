import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const commentModel = sequelize.define('comment', {
  comment: DataTypes.STRING,
  deleteMark: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default commentModel;
