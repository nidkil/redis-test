const path = require('path');

const logPath = path.normalize(`${__dirname}/../logs/redis-smq.log`);

module.exports = {
  namespace: 'redis_test',
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    connect_timeout: 3600000,
    password: process.env.REDIS_PASSWORD
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
