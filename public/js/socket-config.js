// Client-side logic for Chat Rooms

// Agents enum
const AGENT = {
    PERSONAL: 'personal',
    EXTERNAL: 'external',
    ADMIN: 'admin'
}

// Events enum
const EVENTS = {
    LOGIN: 'login',
    SEND: 'send',
    MESSAGE: 'message',
    INTERCOM: 'internal (admin) communication',
}

var socket = io()
var params = new URLSearchParams(window.location.search)
let board

//On is to listen events
socket.on('connect', function() {
    console.log('Connected to the server (:')
    socket.emit(EVENTS.LOGIN, {
        name: params.get('name'),
        room: params.get('room')
    })
})

socket.on(EVENTS.MESSAGE, function(data) {
    renderMessage(data)
})

socket.on(EVENTS.INTERCOM, (data) => {
    renderMessage(data)
})

socket.on('disconnect', function() {
    console.log('Connection to the server is lost :(')
})


if (!localStorage.id) {
    localStorage.id = Math.trunc(Math.random() * 1000)
}

let id = localStorage.id

$(function() {

    // Not in use
    board = $('#Board')
    
    let roomTitle = $('h2')
    roomTitle.html(`Room: ${params.get('room')}`)

    $('#messageForm').submit(function(e) {

        e.preventDefault()

        // This is the text message from the form submission
        let message = $('#inputField').val()

        socket.emit(EVENTS.SEND, {
            id: id,
            name: params.get('name'),
            room: params.get('room'),
            message: message
        })

        renderMessage({
            name: params.get('name'),
            message: message,
            user: AGENT.PERSONAL
        })

        // Clear the text field with an empty string
        $('#inputField').val('')
        return false
    })
})

function renderMessage(message) {
    let html = ''

    if (message.user == AGENT.ADMIN) {
        console.log(AGENT.ADMIN)
        html = `<li class="messagesAdmin"><h5>${message.name}: ${message.message}</h5></li>`
    } else if (message.user == AGENT.EXTERNAL) {
        html = `<li class="messagesOthers"><h5>${message.name}: ${message.message}</h5></li>`

    } else if (message.user == AGENT.PERSONAL) {
        html = `<li class="messagesMe"><h5>${message.name}: ${message.message}</h5></li>`
    }

    board.append(html)
}

    /*
    if (message.user === "me") {
        var html = `<li class="messagesMe"><h5> ${message.name}: ${message.message}</h5></li>`;
    } else if (message.user === "admin") {
        var html = `<li class="messagesAdmin"><h5> ${message.name}: ${message.message}</h5></li>`;
    } else if (message.user === "other") {
        var html = `<li class="messagesOthers"><h5> ${message.name}: ${message.message}</h5></li>`;
    }
    */
