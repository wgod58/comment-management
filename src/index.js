import 'dotenv/config';
import config from 'constants/config';
import logger from 'utils/logger';
import server from './server';

const nameSpace = 'index';

const initialMsg = {
  ENVIRONMENT: config.ENVIRONMENT,
  port: config.SERVER_PORT,
  APP_NAME: config.APP_NAME,
  endpoint: `/${config.APP_NAME}`,
};

server.listen(config.SERVER_PORT, () => {
  logger.info(`${nameSpace} :initializeServer=> ${JSON.stringify(initialMsg)}`);
});
