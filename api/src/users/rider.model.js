'use strict';

import conn from '../config/database';

class Rider {
    constructor() {
        this.table = 'rider';
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