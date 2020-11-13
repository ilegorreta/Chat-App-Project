class User {
    // constructor(data) {
    //     // Here we can take advantage of all the socket object metadata
    //     this.id = data.id
    //         // This below means that we must append a name to the socket object...
    //     this.name = data.name
    // }

    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

module.exports = {
    User
}