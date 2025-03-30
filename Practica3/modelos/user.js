const db = require('./db');
exports.delete = (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
};
class User {
    static getAll(callback) {
        db.query('SELECT * FROM users', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM users WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO users (name, email, edad) VALUES (?, ?, ?)', 
                 [data.name, data.email, data.edad], callback);
    }

    static update(id, data, callback) {
        db.query('UPDATE users SET name = ?, email = ?, edad = ? WHERE id = ?', 
                 [data.name, data.email, data.edad, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM users WHERE id = ?', [id], callback);
    }
}

module.exports = User;
