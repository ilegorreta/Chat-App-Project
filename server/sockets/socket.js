const { io } = require('../server');
const { User } = require('../classes/user');

io.on('connection', (client) => {

    client.on('login', (data) => {
        client.join(data.room)
        client.broadcast.to(data.room).emit('message', {
            name: data.name,
            message: `${data.name} join the room`,
            user: "admin"
        });
    })

    client.on('send', (data) => {
        client.broadcast.to(data.room).emit('message', {
            name: data.name,
            message: data.message,
            user: "other"
        });
    })

    client.on('disconnect', () => {
        console.log('User disconnected');
    });
});