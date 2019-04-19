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

module.exports = {
  displayInfo
}
