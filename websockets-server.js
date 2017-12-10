const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const port = 3001;
const ws = new WebSocketServer({port});

const messages = [];

console.log('websocket server started...');

ws.on('connection', function(socket) {
    console.log('client connection established');
    const clientArray = [];
    ws.clients.forEach(client => clientArray.push(client));

    messages.forEach(msg => socket.send(msg));

    socket.on('message', function(data) {
        console.log('message received: ' + data);
        messages.push(data);
        ws.clients.forEach(clientSocket => clientSocket.send(data));
    });
});
