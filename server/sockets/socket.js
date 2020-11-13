const { io } = require('../server');
const { User } = require('../classes/user');

io.on('connection', (client) => {

    client.on('login', (data) => {
        client.join(data.room)
    })

    client.on('send', (data) => {
        client.broadcast.to(data.room).emit('message', data);
    })

    client.on('disconnect', () => {
        console.log('User disconnected');
    });
});