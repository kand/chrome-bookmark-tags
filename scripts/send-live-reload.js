
let WebSocket = require('ws');
let ws = new WebSocket('ws://localhost:9000');

ws.on('open', () => {
  console.log('sending message to reload clients');
  ws.send('send-reload-client');
  ws.close();
});

ws.on('error', (error) => {
  console.error(error.code, 'not able to connect to live reload. have you started it with `npm run livereload`?');
});

