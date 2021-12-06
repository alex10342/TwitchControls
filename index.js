const tmi = require('tmi.js');
const ks = require('node-key-sender');
const {username, oauth, keyPressDelay} = require('./config')

const opts = {
  identity: {
    username: username,
    password: oauth
  },
  channels: [username]
};

const client = new tmi.client(opts);
client.on('connected', onConnectedHandler);
client.on('message', onMessageHandler);

client.connect();

// ------------------------------------

function onConnectedHandler(addr, port) {
  ks.setOption("globalDelayPressMillisec", keyPressDelay)
  console.log(`* Connected to ${addr}:${port}`);
}

function onMessageHandler(target, context, msg, self) {
  if (self) { return; }
  const message = msg.trim();

  switch (message) {
    case 'left':
      ks.sendKey('a')
      break;
    case 'right':
      ks.sendKey('d')
      break;
    case 'forward':
      ks.sendKey('w')
      break;
    case 'back':
      ks.sendKey('s')
      break;
    case 'jump':
      ks.sendKey('space')
      break;
  }
}

// https://dev.twitch.tv/docs/irc