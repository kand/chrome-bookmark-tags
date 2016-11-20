
let ws = new WebSocket('ws://localhost:9000');

ws.addEventListener('open', () => {
  console.log('live reload connection opened');
  ws.addEventListener('message', (message) => {
    if (message.data === 'do-reload-client') {
     window.location.reload();
    }
  });
});

window.addEventListener('beforeunload', () => {
  ws.close()
});

