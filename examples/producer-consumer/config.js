const path = require('path');

const logPath = path.normalize(`${__dirname}/../logs/redis-smq.log`);

module.exports = {
  namespace: 'redis_test',
  redis: {
    host: 'redis',
    port: 6379,
    connect_timeout: 3600000,
  },
  log: {
    enabled: true,
    options: {
      level: 'trace',
      streams: [
          {
              path: logPath
          },
      ]
    },
  },
  monitor: {
    enabled: true,
    host: '0.0.0.0',
    port: 3000,
  },
};
