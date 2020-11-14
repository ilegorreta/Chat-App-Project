const { io } = require('../server')
const { User } = require('../classes/user')
const { AGENT, EVENTS } = require('../../public/js/utils.js')
const users = new User();

io.on('connection', (client) => {

    client.on(EVENTS.LOGIN, (data) => {
        let user = users.addUser(client.id, data.name, data.room)
        client.join(data.room)
        client.broadcast.to(data.room).emit(EVENTS.INTERCOM, {
            name: data.name,
            message: `${data.name} joined the room`,
            user: AGENT.ADMIN
        });
    })

    client.on(EVENTS.SEND, (data) => {
        client.broadcast.to(data.room).emit(EVENTS.MESSAGE, {
            name: data.name,
            message: data.message,
            user: AGENT.EXTERNAL
        });
    })

    client.on('disconnect', () => {
        console.log('User disconnected');
        let user = users.getUser(client.id);
        client.broadcast.to(user.room).emit(EVENTS.INTERCOM, {
            name: user.name,
            message: `${user.name} left the room`,
            user: AGENT.ADMIN
        });
    });
});