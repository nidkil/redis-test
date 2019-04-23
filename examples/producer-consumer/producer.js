const { Message, Producer } = require('redis-smq');
const config = require('./config');
const { displayInfo } = require('./helpers');

const smsMsg = {
  recipients: "3112345678",
  message: "Password: Hello. This is a temporary password. Use it to login to https://domain.com/login."
};
const emailMsg = {
  template: "welcome",
  addressing: {
    "to": "name@another-domain.com",
    "bcc": ["user@domain.com"],
    "from": "Cool <no-reply@domain.com>"
  },
  context: {
    general: {
      phoneNumber: "085-123 45 67",
      emailAddress: "questions@domain.com"
    },
    "links": {
      "login": "https://domain.com/login",
      "about": "https://domain.com/about",
      "contact": "mailto:questions@domain.com"
    },
    "images": {
      "logo": "https://domain.com/static/logo.png"
    },
    "user": {
      "email": "name@another-domain.com",
      "name": {
        "first": "Hello",
        "last": "World"
      }
    },
    "organisation": {
      "name": "Organisation"
    },
    "balance": {
      "budget": 1000
    }
  }
};

const producer = new Producer('test_queue', config);
const ttlSevenDays = 60 * 60 * 24 * 7;
const delaySecs = 1;

function randomWholeNum(maxNum) {
  return Math.floor(Math.random() * maxNum);
}

function produceNTimes(n, cb) {
  n -= 1;
  if (n >= 0) {
    const message = new Message();
    const type = randomWholeNum(20) % 2;
    const payload = type === 0 ? smsMsg : emailMsg;

    payload.payloadMeta = {
      type: type === 0 ? 'sms' : 'email',
      cnt: n + 1
    }

    message
      .setBody(payload)
      .setTTL(ttlSevenDays)
      .setScheduledDelay(delaySecs);

    console.log(message.toString());

    producer.produceMessage(message, (err) => {
      if (err) cb(err);
      else produceNTimes(n, cb);
    });
  } else cb();
}

displayInfo('RedisSMQ Producer', config);

produceNTimes(1000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log('Produced successfully!');
    producer.shutdown();
  }
});
