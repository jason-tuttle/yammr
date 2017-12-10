let socket;

function init(url) {
    socket = new WebSocket(url);
    console.log('connecting...');
}

function registerOpenHandler(handler) {
    socket.onopen = () => {
        console.log('open');
        handler();
    };
}

function registerMessageHandler(handler) {
    socket.onmessage = (e) => {
        let data = JSON.parse(e.data);
        handler(data);
    }
}

function registerCloseHandler(handler) {
    socket.onclose = () => {
        console.log(('server disconnected'));
        handler();
    }
}

function sendMessage(message) {
    socket.send(JSON.stringify(message));
}

export default {
    init,
    registerOpenHandler,
    registerMessageHandler,
    registerCloseHandler,
    sendMessage,
}
