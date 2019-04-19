const config = require('./config');
const RedisSMQ = require('redis-smq');
const { displayInfo } = require('./helpers');

const monitorServer = RedisSMQ.monitor(config);

monitorServer.listen(() => {
  displayInfo('RedisSMQ Monitor', config, true);
});
