class User {

    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = { id, name, room }
        this.users.push(user);
        return user
    }

    getUser(id) {
        let user = this.users.filter(u => u.id === id)[0];
        return user
    }
}

module.exports = {
    User
}