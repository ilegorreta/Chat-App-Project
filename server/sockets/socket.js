const { io } = require('../server');
const { User } = require('../classes/user');
const { renderMessage } = require('../../public/js/socket-config');

io.on('connection', (client) => {

    client.on('login', (data) => {
        console.log(data);
        client.broadcast.emit('message', data);
        renderMessage(data);
        //var person = new User(client.id, data.name);
        //let person = new User(client.id, data.name);
        //client.join(data.room);
    })

    // client.on('message', (data) => {
    //     client.broadcast.emit('message', data);
    // })

    client.on('disconnect', () => {
        console.log('User disconnected');
    });


});