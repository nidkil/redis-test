const redisSMQ = require('redis-smq');
const config = require('./config');
const { displayInfo, promiseWrapper } = require('./helpers');

const Consumer = redisSMQ.Consumer;

class TestQueueConsumer extends Consumer {
  /**
   *
   * @param message
   * @param cb
   */
  consume(message, cb) {
    console.log(`Received message type '${message.payloadMeta.type}':`, message);
    cb();
  }
}

TestQueueConsumer.queueName = 'test_queue';

const consumer = new TestQueueConsumer(config, { messageConsumeTimeout: 2000 });

displayInfo('RedisSMQ Consumer', config);

consumer.run();
