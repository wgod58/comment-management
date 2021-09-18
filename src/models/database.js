import { Sequelize } from 'sequelize';
import config from '../constants/config';

const { DATABASE } = config;

const sequelize = new Sequelize(
  DATABASE.DATABASE,
  DATABASE.ACCOUNT,
  DATABASE.PASSWORD,
  {
    host: DATABASE.HOST,
    protocol: DATABASE.PORT,
    dialect: 'postgres',
    logging: true, // Set true to print executing sql

    define: {
      underscored: false,
      freezeTableName: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
      timestamps: true,
    },

    sync: { force: true },

    // pool configuration used to pool database connections
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
  },
);

export { sequelize };
