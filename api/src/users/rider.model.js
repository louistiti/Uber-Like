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
        })
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