const config = require('./config');

if (process.env.REDIS_DEBUG && process.env.REDIS_DEBUG === 'true') {
  console.log(JSON.stringify(process.env, null, 2));
  console.log(JSON.stringify(config, null, 2));
}

require('./monitor');
require('./consumer');
