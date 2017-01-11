'use strict';

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';

import { api } from '../config/config';

const url = `http://${api().host}:${api().port + api().version}`;

chai.use(chaiHttp);
chai.use(chaiThings);

const rider = {
    email: 'rider@doe.com',
    password: '123456',
    user_type: 'rider',
    grant_type: 'password'
};

let accessToken = '';
let clientId = '';

describe('PATCH /devices/:uuid (revoked)', () => {
    before((done) => {
        chai.request(url).post('/auth/token').send(rider).end((err, res) => {
            accessToken = res.body.data[0].access_token;
            clientId = res.body.data[0].client_id;

            done();
        });
    });

    it('should return invalid access token', (done) => {
        chai.request(url)
            .patch(`/devices/${clientId}`)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res.body.success).equal(false);
                expect(res.body.status).equal(401);
                expect(res.body.errors).all.include.keys('message', 'code');
                expect(res.body.errors).contain.a.thing.with.property('code', 'invalid_access_token');

                done();
            });
    });

    it('should return error params missing', (done) => {
        chai.request(url)
            .patch(`/devices/${clientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res.body.success).equal(false);
                expect(res.body.status).equal(400);
                expect(res.body.errors).all.include.keys('message', 'code');
                expect(res.body.errors).contain.a.thing.with.property('code', 'missing_params');

                done();
            });
    });

    it('should return error too many params', (done) => {
        chai.request(url)
            .patch(`/devices/${clientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                revoked: 'xxx',
                name: 'xxx'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res.body.success).equal(false);
                expect(res.body.status).equal(400);
                expect(res.body.errors).all.include.keys('message', 'code');
                expect(res.body.errors).contain.a.thing.with.property('code', 'too_many_params');

                done();
            });
    });

    it('should return error invalid param value', (done) => {
        chai.request(url)
            .patch(`/devices/${clientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                revoked: 'xxx'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res.body.success).equal(false);
                expect(res.body.status).equal(400);
                expect(res.body.errors).all.include.keys('message', 'code');
                expect(res.body.errors).contain.a.thing.with.property('code', 'invalid_param_value');

                done();
            });
    });

    it('should revoke the device', (done) => {
        chai.request(url)
            .patch(`/devices/${clientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                revoked: 'true'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res.body.success).equal(true);
                expect(res.body.status).equal(200);
                expect(res.body.message).to.be.a('string');
                expect(res.body.code).equal('device_revoked');
                expect(res.body.data).include.something.that.deep.equals({
                    device: { revoked: true }
                });

                done();
            });
    });

    it('should return error the device does not belong to the user', (done) => {
        chai.request(url)
            .patch(`/devices/${clientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                revoked: 'true'
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res.body.success).equal(false);
                expect(res.body.status).equal(404);
                expect(res.body.errors).all.include.keys('message', 'code');
                expect(res.body.errors).contain.a.thing.with.property('code', 'the_device_does_not_belong_to_the_user');

                done();
            });
    });
});

describe('PATCH /devices/:uuid (name)', () => {
    before((done) => {
        chai.request(url).post('/auth/token').send(rider).end((err, res) => {
            accessToken = res.body.data[0].access_token;
            clientId = res.body.data[0].client_id;

            done();
        });
    });

    it('should change the device name', (done) => {
        chai.request(url)
            .patch(`/devices/${clientId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                name: 'Laptop test'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res.body.success).equal(true);
                expect(res.body.status).equal(200);
                expect(res.body.message).to.be.a('string');
                expect(res.body.code).equal('device_name_changed');
                expect(res.body.data).include.something.that.deep.equals({
                    device: { name: 'Laptop test' }
                });

                done();
            });
    });
});
