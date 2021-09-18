import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const organizationModel = sequelize.define('organization', {
  orgName: DataTypes.STRING,
});

export default organizationModel;
