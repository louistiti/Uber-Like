'use strict';

import conn from '../config/database';
import { api } from '../config/config';

class Device {
    constructor() {
        this.table = 'device';
    }

    add(data, cb) {
        conn.query(`
        INSERT INTO ${this.table}
        SET ?`, data, (err) => {
            if (err) throw err;

            cb();
        });
    }

    doesTheRefreshTokenValid(data, cb) {
        conn.query(`
        SELECT uuid, user_uuid, user_type, refresh_token
        FROM ${this.table}
        WHERE uuid = ?
        AND refresh_token = ?
        AND revoked = 0
        AND DATE_ADD(created_at, INTERVAL ${api().refresh_token.exp} SECOND) >= NOW()
        LIMIT 1`, data, (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                cb([]);
            } else {
                cb(result);
            }
        });
    }

    doesTheDeviceBelongToTheUser(data, cb) {
        conn.query(`
        SELECT id
        FROM ${this.table}
        WHERE uuid = ?
        AND user_uuid = ?
        AND user_type = ?
        AND revoked = 0
        AND DATE_ADD(created_at, INTERVAL ${api().refresh_token.exp} SECOND) >= NOW()
        LIMIT 1`, data, (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                cb(false);
            } else {
                cb(true);
            }
        });
    }

    updateOneColumn(data, cb) {
        conn.query(`
        UPDATE ${this.table}
        SET ?? = ?
        WHERE uuid = ?
        AND user_uuid = ?
        AND user_type = ?
        AND revoked = 0
        AND DATE_ADD(created_at, INTERVAL ${api().refresh_token.exp} SECOND) >= NOW()
        LIMIT 1`, data, (err) => {
            if (err) throw err;

            cb();
        });
    }

    updateRefreshToken(data, cb) {
        conn.query(`
        UPDATE ${this.table}
        SET refresh_token = ?,
        created_at = NOW() + INTERVAL ${api().refresh_token.exp} SECOND
        WHERE refresh_token = ?
        AND uuid = ?
        AND revoked = 0
        LIMIT 1`, data, (err) => {
            if (err) throw err;

            cb();
        });
    }
}

export default new Device();
