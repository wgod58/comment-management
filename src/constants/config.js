const CONFIG = {
  APP_NAME: process.env.APP_NAME,
  BASE_URL: { development: 'test', production: 'prod' },
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  SERVER_PORT: process.env.PORT,
  DATABASE: {
    name: process.env.DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    account: process.env.DB_ACCOUNT,
    password: process.env.DB_PASSWORD,
  },
};

export default CONFIG;
