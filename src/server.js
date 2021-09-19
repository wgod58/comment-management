import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import routes from 'routes';
import config from 'constants/config';
import responses from 'constants/responses';
import logger from 'utils/logger';

const BODY_PARSER_LIMIT = '10mb';
const app = express();
const nameSpace = 'server';

const interceptResponseBody = (req, res, next) => {
  const oldSend = res.send;

  res.send = function (data) {
    if (data) {
      logger.info(
        `${nameSpace} :interceptResponseBody=> ${JSON.stringify(data)}`,
      );
    }

    oldSend.apply(res, arguments);
  };

  next();
};

app.server = http.createServer(app);
app.use(
  morgan('tiny', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(interceptResponseBody);
app.use(express.json({ limit: BODY_PARSER_LIMIT }));
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// google gke health check
app.get('/', (_, res) => {
  logger.info('GKE health check');
  return res.status(200).json();
});

app.use(`/${config.APP_NAME}/`, routes);

app.use((req, res, next) => {
  logger.error(`${nameSpace} :app.use=> Not found`);

  return res.status(responses.NOT_FOUND.status).json({
    error: responses.NOT_FOUND.message,
  });
});

app.use(function (err, req, res, next) {
  logger.error(`${nameSpace} :app.use ${JSON.stringify(err.stack)}`);
  res.status(500).send('Server error!');
});

export default app;
