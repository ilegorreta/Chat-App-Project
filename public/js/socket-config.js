var socket = io();
var params = new URLSearchParams(window.location.search);

//On is to listen events
socket.on('connect', function() {

    console.log('Connected to the server (:');
});

socket.on('message', function(data) {
    console.log(data);
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