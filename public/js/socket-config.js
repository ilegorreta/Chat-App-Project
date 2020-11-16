// Client-side logic for Chat Rooms

// Agents enum
/*
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
*/

var socket = io()
var params = new URLSearchParams(window.location.search)
let board

//On is to listen events
socket.on('connect', () => {
    console.log('Connected to the server (:')
    socket.emit(utils.EVENTS.LOGIN, {
        name: params.get('name'),
        room: params.get('room')
    })
})

socket.on(utils.EVENTS.MESSAGE, (data) => {
    renderMessage(data)
})

socket.on(utils.EVENTS.INTERCOM, (data) => {
    renderMessage(data)
})

socket.on('disconnect', () => {
    console.log('Connection to the server is lost :(')
})


if (!localStorage.id) {
    localStorage.id = Math.trunc(Math.random() * 1000)
}

let id = localStorage.id

$(() => {

    board = $('.board')
    
    let roomTitle = $('h2')
    roomTitle.html(`Room: ${params.get('room')}`)

    $('.message-form').submit((e) => {

        e.preventDefault()

        // This is the text message from the form submission
        let message = $('.input-field').val()
        if (message == '') {
            return false
        } else {

            socket.emit(utils.EVENTS.SEND, {
                id: id,
                name: params.get('name'),
                room: params.get('room'),
                message: message
            })
    
            renderMessage({
                name: params.get('name'),
                message: message,
                user: utils.AGENT.PERSONAL
            })
    
            // Clear the text field
            $('.input-field').val('')
            return false
        }
    })
})

function renderMessage(message) {
    let html = ''

    // TODO: Naive ID impl. because of possible duplicates in one chat session...
    let id = Math.trunc(Math.random() * 1000)

    if (message.user == utils.AGENT.ADMIN) {
        html = `<li id="${id}" class="messages admin"><h5>${message.name}: ${message.message}</h5></li>`
    } else if (message.user == utils.AGENT.EXTERNAL) {
        html = `<li id="${id}" class="messages others"><h5>${message.name}: ${message.message}</h5></li>`
    } else if (message.user == utils.AGENT.PERSONAL) {
        html = `<li id="${id}" class="messages me"><h5>${message.name}: ${message.message}</h5></li>`
    }

    board.append(html)

    // Not what we want. Buggy after tests (It adds dead space to the page).
    let mess = document.getElementById(id)
    function scrollToBottom(e) {
        e.scrollTop = e.scrollHeight;
    }

    mess.scrollIntoView()

}