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
        WHERE ?? = ?
        LIMIT 1`, data, (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                cb(false);
            } else {
                cb(true);
            }
        });
    }

    findOneByEmail(data, cb) {
        conn.query(`
        SELECT uuid, password
        FROM ${this.table}
        WHERE email = ?
        LIMIT 1`, data, (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                cb([]);
            } else {
                cb(result);
            }
        });
    }

    getAll(cb) {
        conn.query(`
        SELECT *
        FROM ${this.table}`, (err, result) => {
            if (err) throw err;

            cb(result);
        });
    }
}

export default new Rider();
