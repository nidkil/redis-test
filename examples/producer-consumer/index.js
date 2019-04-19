const config = require('./config');

console.log(JSON.stringify(config, null, 2));

require('./monitor');
require('./consumer');
