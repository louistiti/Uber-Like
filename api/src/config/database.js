'use strict';

import mysql from 'mysql';

import { db } from './config';

const conn = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    port: db.port
});

conn.connect((err) => {
    if (err) throw err;

    console.log('Hi! Database connected');
});

export default conn;
