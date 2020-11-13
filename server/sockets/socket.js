const { io } = require('../server');
const { User } = require('../classes/user');

io.on('connection', (client) => {

    client.on('login', (data) => {
        console.log(data);
        client.broadcast.emit('message', data);
    })

    client.on('disconnect', () => {
        console.log('User disconnected');
    });
});