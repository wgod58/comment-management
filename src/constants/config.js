const CONFIG = {
  APP_NAME: process.env.APP_NAME,
  BASE_URL: { development: 'test', production: 'prod' },
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  SERVER_PORT: process.env.PORT,
  DATABASE: {
    DATABASE: process.env.DATABASE,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    ACCOUNT: process.env.DB_ACCOUNT,
    PASSWORD: process.env.DB_PASSWORD,
  },
};

export default CONFIG;
