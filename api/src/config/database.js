'use strict';

import { db } from './config';
import mysql from 'mysql';

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
