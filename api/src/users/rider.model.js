'use strict';

import conn from '../config/database';

class Rider {
    constructor() {
        this.table = 'rider';
    }

    add(data, cb) {
        conn.query(`
        INSERT INTO ${this.table}
        SET ?`, data, (err) => {
            if (err) throw err;

            cb();
        });
    }

    doesThisExist(data, cb) {
        conn.query(`
        SELECT id
        FROM ${this.table}
        WHERE ?? = ?`, data, (err, results) => {
            if (err) throw err;

            if (results.length === 0) {
                cb(false);
            } else {
                cb(true);
            }
        });
    }

    getAll(cb) {
        conn.query(`
        SELECT *
        FROM ${this.table}`, (err, rows) => {
            if (err) throw err;

            cb(rows);
        });
    }
}

export default new Rider();
