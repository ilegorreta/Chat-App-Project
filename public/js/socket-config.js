var socket = io();
var params = new URLSearchParams(window.location.search);
var board = $('#Board');

//On is to listen events
socket.on('connect', function() {

    console.log('Connected to the server (:');
});

socket.on('message', function(data) {
    console.log(data);
    renderMessage(data);
})

socket.on('disconnect', function() {
    console.log('Connection to the server is lost :(');
});


if (!localStorage.id) {
    localStorage.id = Math.trunc(Math.random() * 1000)
}

let id = localStorage.id

$(function() {
    $('#messageForm').submit(function(e) {

        e.preventDefault()

        // This is the text message from the form submission
        let message = $('#inputField').val()

        console.log(message);

        // Naive implementation
        socket.emit('login', {
            id: id,
            name: params.get('name'),
            room: params.get('room'),
            message: message
        });

        // Clear the text field with an empty string
        $('#inputField').val('')
        return false
    })
})

function renderMessage(message) {
    var html = '';
    html += '<li>';
    html += '<h5>' + message.name + ': ' + message.message + '</h5>';
    html += '</li>';
<<<<<<< HEAD
}
=======
    board.append(html);
}
>>>>>>> aee1b61e15260d8a032f812ecbbe3b4f34e34196
