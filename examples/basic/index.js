const redis = require('redis');

const config = {
  host: '127.0.0.1',
  port: 6379,
  no_ready_check: true,
  password: 'secret'
}

const client = redis.createClient(config.port, config.host);

client.auth(config.password);

client.on('connect', function() {
  console.log('connected');
});

client.on('error', err => {
  console.log(err.message)
});

function cb(err, reply) {
  if (err) {
    console.error('Error occurred:', err)
  } else {
    console.log('Response:', reply)
  }
}

function cbExists(err, reply) {
  if (err) {
    console.error('Error occurred:', err)
  } else {
    if (reply === 1) {
      console.log('Key exists');
    } else {
      console.log('Key does not exist, creating it');
      client.set('name', 'nidkil', cb);
    }
  }
}

client.exists('name', cbExists);
// Give the key an expiration time of 1 second
client.set('expireName', 'nidkil', cb);
client.expire('expireName', 1);
client.exists('expireName', cbExists);
// Wait for 2 seconds and check the key again
setTimeout(function() {
  client.exists('expireName', cbExists);
}, 2000);

setTimeout(function() {
  console.log('Shutting down gracefully');
  process.exit(0);
}, 4000);
