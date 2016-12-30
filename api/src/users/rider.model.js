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
        WHERE ?? = ?`, data, (err, rows) => {
            if (err) throw err;

            if (rows.length === 0) {
                cb(false);
            } else {
                cb(true);
            }
        });
    }

    getDataForAuth(data, cb) {
        conn.query(`
        SELECT uuid, password
        FROM ${this.table}
        WHERE email = ?`, data, (err, rows) => {
            if (err) throw err;

            if (rows.length === 0) {
                cb([]);
            } else {
                cb(rows[0]);
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
