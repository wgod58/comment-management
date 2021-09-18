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

app.use(
  morgan('tiny', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

app.use(`/${BASE_URL[config.ENVIRONMENT]}/${config.APP_NAME}/api`, routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next({
    status: responses.NOT_FOUND.status,
    message: responses.NOT_FOUND.message,
  });
});

// Error handler middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(`${nameSpace} :app.use=> ${JSON.stringify(err)}`);
  const error = {
    status: err.status || responses.SERVER_ERROR.status,
    message: err.message || responses.SERVER_ERROR.message,
  };

  res.status(error.status).json(error);
  next(err);
});

export default app;
