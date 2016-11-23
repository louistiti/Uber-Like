'use strict';

import mysql from 'mysql';

import { db } from './config';
import log from '../helpers/log';

const conn = mysql.createConnection({
    host: db().host,
    user: db().user,
    password: db().password,
    database: db().database,
    port: db().port
});

conn.connect((err) => {
    if (err) throw err;

    log.success(`Hi! Connected to the database ${db().database}`);
});

export default conn;
