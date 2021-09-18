import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const Organization = sequelize.define('organization', {
  orgName: DataTypes.STRING,
});

export default Organization;
