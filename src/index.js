import 'dotenv/config';
import config from 'constants/config';
import logger from 'utils/logger';
import server from './server';

const nameSpace = 'index';
const BASE_URL = { development: 'test', production: 'prod' };
const initialMsg = {
  ENVIRONMENT: config.ENVIRONMENT,
  port: config.SERVER_PORT,
  APP_NAME: config.APP_NAME,
  endpoint: `/${BASE_URL[config.ENVIRONMENT]}/${config.APP_NAME}`,
};

server.listen(config.SERVER_PORT, () => {
  logger.info(`${nameSpace} :initializeServer=> ${JSON.stringify(initialMsg)}`);
});
