class User {

    constructor() {
        this.users = [];
    }

    setUser(id, name, room) {
        let user = { id, name, room }
        this.users.push(user);
    }

    getUser(id) {
        let user = this.users.filter(u => u.id === id)[0];
    }
}

module.exports = {
    User
}