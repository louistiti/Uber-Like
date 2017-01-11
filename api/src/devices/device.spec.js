'use strict';

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';

import { api } from '../config/config';

const url = `http://${api().host}:${api().port + api().version}`;

chai.use(chaiHttp);
chai.use(chaiThings);

let accessToken = '';
let refreshToken = '';
let clientId = '';

describe('POST /auth/token (password)', () => {
    it('should return error params missing', (done) => {
        chai.request(url).post('/auth/token').end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(false);
            expect(res.body.status).equal(400);
            expect(res.body.errors).all.include.keys('message', 'code');
            expect(res.body.errors).contain.a.thing.with.property('code', 'missing_params');

            done();
        });
    });

    it('should return error invalid grant type', (done) => {
        chai.request(url).post('/auth/token').send({
            email: 'rider@doe.com',
            password: '123456',
            user_type: 'rider',
            grant_type: 'xxx'
        }).end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(false);
            expect(res.body.status).equal(400);
            expect(res.body.errors).all.include.keys('message', 'code');
            expect(res.body.errors).contain.a.thing.with.property('code', 'invalid_grant_type');

            done();
        });
    });

    it('should return error invalid user type', (done) => {
        chai.request(url).post('/auth/token').send({
            email: 'rider@doe.com',
            password: '123456',
            user_type: 'xxx',
            grant_type: 'password'
        }).end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(false);
            expect(res.body.status).equal(400);
            expect(res.body.errors).all.include.keys('message', 'code');
            expect(res.body.errors).contain.a.thing.with.property('code', 'invalid_user_type');

            done();
        });
    });

    it('should return error invalid credentials', (done) => {
        chai.request(url).post('/auth/token').send({
            email: 'rider@doe.com',
            password: '1234567',
            user_type: 'rider',
            grant_type: 'password'
        }).end((err, res) => {
            expect(res).to.have.status(401);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(false);
            expect(res.body.status).equal(401);
            expect(res.body.errors).all.include.keys('message', 'code');
            expect(res.body.errors).contain.a.thing.with.property('code', 'invalid_credentials');

            done();
        });
    });

    it('should authenticate the rider', (done) => {
        chai.request(url).post('/auth/token').send({
            email: 'rider@doe.com',
            password: '123456',
            user_type: 'rider',
            grant_type: 'password'
        }).end((err, res) => {
            accessToken = res.body.data[0].access_token;
            refreshToken = res.body.data[0].refresh_token;
            clientId = res.body.data[0].client_id;
            expect(res).to.have.status(200);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(true);
            expect(res.body.status).equal(200);
            expect(res.body.message).to.be.a('string');
            expect(res.body.code).equal('rider_authenticated');
            expect(res.body.data).contain.a.thing.with.property('access_token', accessToken);
            expect(res.body.data).contain.a.thing.with.property('token_type', 'bearer');
            expect(res.body.data).contain.a.thing.with.property('expires_in', 3600);
            expect(res.body.data).contain.a.thing.with.property('refresh_token', refreshToken);
            expect(res.body.data).contain.a.thing.with.property('client_id', clientId);

            done();
        });
    });
});

describe('POST /auth/token (refresh_token)', () => {
    it('should return error invalid client (bad client_id)', (done) => {
        chai.request(url).post('/auth/token').send({
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
            client_id: 'xxx'
        }).end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(false);
            expect(res.body.status).equal(400);
            expect(res.body.errors).all.include.keys('message', 'code');
            expect(res.body.errors).contain.a.thing.with.property('code', 'invalid_client');

            done();
        });
    });

    it('should return error invalid client (bad refresh_token)', (done) => {
        chai.request(url).post('/auth/token').send({
            refresh_token: 'xxx',
            grant_type: 'refresh_token',
            client_id: clientId
        }).end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(false);
            expect(res.body.status).equal(400);
            expect(res.body.errors).all.include.keys('message', 'code');
            expect(res.body.errors).contain.a.thing.with.property('code', 'invalid_client');

            done();
        });
    });

    it('should return error invalid client (does not exist)', (done) => {
        chai.request(url).post('/auth/token').send({
            refresh_token: 'e8e86a53c00160bac975f17c3b21e82e2bb52425',
            grant_type: 'refresh_token',
            client_id: 'a7f939ed-aa3f-4bfe-bd14-3556d837a748'
        }).end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(false);
            expect(res.body.status).equal(400);
            expect(res.body.errors).all.include.keys('message', 'code');
            expect(res.body.errors).contain.a.thing.with.property('code', 'invalid_client');

            done();
        });
    });

    it('should provide new tokens', (done) => {
        chai.request(url).post('/auth/token').send({
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
            client_id: clientId
        }).end((err, res) => {
            accessToken = res.body.data[0].access_token;
            refreshToken = res.body.data[0].refresh_token;
            clientId = res.body.data[0].client_id;
            expect(res).to.have.status(200);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(true);
            expect(res.body.status).equal(200);
            expect(res.body.message).to.be.a('string');
            expect(res.body.code).equal('tokens_updated');
            expect(res.body.data).contain.a.thing.with.property('access_token', accessToken);
            expect(res.body.data).contain.a.thing.with.property('token_type', 'bearer');
            expect(res.body.data).contain.a.thing.with.property('expires_in', 3600);
            expect(res.body.data).contain.a.thing.with.property('refresh_token', refreshToken);
            expect(res.body.data).contain.a.thing.with.property('client_id', clientId);

            done();
        });
    });
});
