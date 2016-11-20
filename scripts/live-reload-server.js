
let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({ port: 9000 });

wss.on('connection', (socket) => {
  console.log('established live reload connection');

  socket.on('message', (message) => {

    if (message === 'send-reload-client') {
      wss.clients.forEach((client) => {
        if (client !== socket) {
          console.log('live reloading clients');
          client.send('do-reload-client');
        }
      });
    }
  });

  socket.on('error', console.log);

  socket.on('close', () => console.log('live reload connection closed'));
});

