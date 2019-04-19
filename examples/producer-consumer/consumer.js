const redisSMQ = require('redis-smq');
const config = require('./config');
const { displayInfo } = require('./helpers');

const Consumer = redisSMQ.Consumer;

class TestQueueConsumer extends Consumer {
  /**
   *
   * @param message
   * @param cb
   */
  consume(message, cb) {
    console.log(`Received message type '${message.payloadMeta.type}':`, message);
    //
    //  throw new Error('TEST!');
    //
    //  cb(new Error('TEST!'));
    //
    //  const timeout = parseInt(Math.random() * 100);
    //  setTimeout(() => {
    //      cb();
    //  }, timeout);
    cb();
  }
}

TestQueueConsumer.queueName = 'test_queue';

const consumer = new TestQueueConsumer(config, { messageConsumeTimeout: 2000 });

displayInfo('RedisSMQ Consumer', config);

consumer.run();
