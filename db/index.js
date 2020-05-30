const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db = null;

module.exports = {
    instance() {
        db = db || new sqlite3.Database(path.resolve(__dirname, 'socket.currencies.db'));
        return db;
    }
}