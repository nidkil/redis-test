const net = require('net');

function displayInfo (id, config, monitor = false) {
  const msg = monitor ? 'server is running on' : 'is connected to';
  const cfg = monitor ? config.monitor : config.redis;

  console.log(`${id} ${msg}: http://${cfg.host}:${cfg.port}`);

  if (config.log.enabled) {
    console.log(`Logging to: ${config.log.options.streams[0].path}`);
  } else {
    console.log('Logging to disabled');
  }
}

function checkConnection(host, port, timeout = 2000) {
  return new Promise(function(resolve, reject) {
    console.log(`checkConnection: host=${host}, port=${port}, timeout=${timeout}`);
    const timer = setTimeout(function() {
      reject("timeout");
      socket.end();
    }, timeout);
    const socket = net.createConnection(port, host, function() {
      clearTimeout(timer);
      resolve();
      socket.end();
    });
    socket.on('error', function(err) {
      clearTimeout(timer);
      reject(err);
    });
  });
}

module.exports = {
  checkConnection,
  displayInfo
}
