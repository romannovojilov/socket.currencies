let io = null;
let _parser = null;
let connections = [];
let messages = [];

function sendMessage(user, payload) {
    messages.push({ user, payload });
    io.sockets.emit('message', { user, payload });
    console.log(user, payload);
}

async function connection(socket) {

    const user = JSON.parse(socket.handshake.query['loggeduser']);
    socket.user = user;
    connections.push(socket);

    const insertItem = item => socket.emit('insertItem', item);

    socket.on('disconnect', () => {
        _parser.removeInsertListener(insertItem);
        connections = connections.filter(s => s !== socket);
        sendMessage(socket.user, 'Отключился');
    });

    _parser.addInsertListener(insertItem);

    socket.emit('connected', {
        messages,
        items: await _parser.repository.select()
    });
    sendMessage(socket.user, 'Подключился');
}

module.exports = function (server, parser) {
    _parser = _parser || parser;
    io = io || require('socket.io').listen(server);
    io.sockets.on('connection', connection);
}