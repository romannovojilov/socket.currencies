const db = require('./index').instance();
const { getDateNow } = require('../helper');

module.exports = {
    create() {
        db.run(`CREATE TABLE currencies (
            id INTEGER PRIMARY KEY,
            code TEXT NOT NULL,
            units INTEGER NOT NULL,
            currency TEXT NOT NULL,
            course FLOAT NOT NULL,
            diff FLOAT NOT NULL,
            actual_date INTEGER NOT NULL
        )`);
        db.close();
    },
    async insert({ code, units, currency, course, diff, actualDate = getDateNow() }) {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO currencies (code, units, currency, course, diff, actual_date) VALUES (?, ?, ?, ?, ?, ?)`,
                [ code, units, currency, course, diff, actualDate ],
                function(err) {
                    if(err) return reject(err);
                    else return resolve({
                        id: this.lastID,
                        code, units, currency, course, diff,
                        actual_date: actualDate
                    });
                });
        });
    },
    async select(date = getDateNow()) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM currencies WHERE actual_date = ${parseInt(date)}`, (err, rows) => {
                if(err) return reject(err);
                else return resolve(rows);
            });
        });
    },
    async limit(count = 5) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM currencies ORDER BY RANDOM() LIMIT ${count}`, (err, rows) => {
                if(err) return reject(err);
                else return resolve(rows);
            });
        });
    },
    async clear() {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM currencies`,
                function(err) {
                    if(err) reject(err);
                    else resolve();
                });
        });
    }
}