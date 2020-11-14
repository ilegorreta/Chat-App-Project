var socket = io();
var params = new URLSearchParams(window.location.search);
var board = $('#Board');
var roomTitle = $('h2');

//On is to listen events
socket.on('connect', function() {
    console.log('Connected to the server (:');
    socket.emit('login', {
        name: params.get('name'),
        room: params.get('room')
    })
});

socket.on('message', function(data) {
    renderMessage({
        name: data.name,
        message: data.message,
        user: data.user
    });
})

socket.on('disconnect', function() {
    console.log('Connection to the server is lost :(');
});


if (!localStorage.id) {
    localStorage.id = Math.trunc(Math.random() * 1000)
}

let id = localStorage.id

$(function() {

    roomTitle.html(`Room: ${params.get('room')}`)

    $('#messageForm').submit(function(e) {

        e.preventDefault()

        // This is the text message from the form submission
        let message = $('#inputField').val()

        socket.emit('send', {
            id: id,
            name: params.get('name'),
            room: params.get('room'),
            message: message
        });

        renderMessage({
            name: params.get('name'),
            message: message,
            user: "me"
        });

        // Clear the text field with an empty string
        $('#inputField').val('')
        return false
    })
})

function renderMessage(message) {
    if (message.user === "me") {
        var html = `<li class="messagesMe"><h5> ${message.name}: ${message.message}</h5></li>`;
    } else if (message.user === "admin") {
        var html = `<li class="messagesAdmin"><h5> ${message.name}: ${message.message}</h5></li>`;
    } else if (message.user === "other") {
        var html = `<li class="messagesOthers"><h5> ${message.name}: ${message.message}</h5></li>`;
    }
    board.append(html);
}

module.exports = {
    renderMessage
}