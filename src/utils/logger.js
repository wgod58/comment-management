import bunyan from 'bunyan';
import config from 'constants/config';

const modifiedStream = () => {
  return {
    write: (log) => {
      delete log.name;
      delete log.hostname;
      delete log.pid;
      delete log.v;
      delete log.time;
      if (!log.msg) delete log.msg;
      log.level = bunyan.nameFromLevel[log.level];
      console.log(log);
    },
  };
};

const logger = bunyan.createLogger({
  name: config.APP_NAME,
  streams: [{ type: 'raw', stream: modifiedStream() }],
  serializers: bunyan.stdSerializer,
});

export default logger;
