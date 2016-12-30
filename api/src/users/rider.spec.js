'use strict';

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';

import { api } from '../config/config';
import Server from '../config/server';

const url = `http://${api().host}:${api().port + api().version}`;

Server.init();

chai.use(chaiHttp);
chai.use(chaiThings);

let token = '';

describe('POST /riders', () => {
    it('should return error fields missing', (done) => {
        chai.request(url).post('/riders').end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(false);
            expect(res.body.status).equal(400);
            expect(res.body.errors).all.include.keys('message', 'code');
            expect(res.body.errors).contain.a.thing.with.property('code', 'missing_fields');

            done();
        });
    });

    it('should return several errors', (done) => {
        chai.request(url).post('/riders').send({
            firstname: 'John',
            lastname: 'Doe',
            phone: '060000000',
            email: 'john@doe',
            password: '12345'
        }).end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(false);
            expect(res.body.status).equal(400);
            expect(res.body.errors).all.include.keys('message', 'code');
            expect(res.body.errors).contain.a.thing.with.property('code', 'incorrect_phone_number');
            expect(res.body.errors).contain.a.thing.with.property('code', 'incorrect_email_address');
            expect(res.body.errors).contain.a.thing.with.property('code', 'password_too_short');

            done();
        });
    });

    it('should add a new rider', (done) => {
        chai.request(url).post('/riders').send({
            firstname: 'John',
            lastname: 'Doe',
            phone: '0600000000',
            email: 'john@doe.com',
            password: '123456'
        }).end((err, res) => {
            expect(res).to.have.status(201);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res).to.have.header('location', '/v1/signin');
            // expect(res).to.have.header('location', `/v1/riders/${res.body.data[0].rider.uuid}`);
            expect(res.body.success).equal(true);
            expect(res.body.status).equal(201);
            expect(res.body.message).to.be.a('string');
            expect(res.body.code).equal('rider_added');

            done();
        });
    });

    it('should return error phone number already taken', (done) => {
        chai.request(url).post('/riders').send({
            firstname: 'John',
            lastname: 'Doe',
            phone: '0600000000',
            email: 'john@doe.com',
            password: '123456'
        }).end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(false);
            expect(res.body.status).equal(400);
            expect(res.body.errors).all.include.keys('message', 'code');
            expect(res.body.errors).contain.a.thing.with.property('code', 'phone_number_already_taken');

            done();
        });
    });

    it('should return error email already taken', (done) => {
        chai.request(url).post('/riders').send({
            firstname: 'John',
            lastname: 'Doe',
            phone: '0600000001',
            email: 'john@doe.com',
            password: '123456'
        }).end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(false);
            expect(res.body.status).equal(400);
            expect(res.body.errors).all.include.keys('message', 'code');
            expect(res.body.errors).contain.a.thing.with.property('code', 'email_address_already_taken');

            done();
        });
    });
});

describe('POST /riders/authenticate', () => {
    it('should return error fields missing', (done) => {
        chai.request(url).post('/riders/authenticate').end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(false);
            expect(res.body.status).equal(400);
            expect(res.body.errors).all.include.keys('message', 'code');
            expect(res.body.errors).contain.a.thing.with.property('code', 'missing_fields');

            done();
        });
    });

    it('should return error incorrect credentials', (done) => {
        chai.request(url).post('/riders/authenticate').send({
            email: 'john@doe.fr',
            password: '123456'
        }).end((err, res) => {
            expect(res).to.have.status(401);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(false);
            expect(res.body.status).equal(401);
            expect(res.body.errors).all.include.keys('message', 'code');
            expect(res.body.errors).contain.a.thing.with.property('code', 'incorrect_credentials');

            done();
        });
    });

    it('should return error incorrect credentials', (done) => {
        chai.request(url).post('/riders/authenticate').send({
            email: 'john@doe.com',
            password: '1234567'
        }).end((err, res) => {
            expect(res).to.have.status(401);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(false);
            expect(res.body.status).equal(401);
            expect(res.body.errors).all.include.keys('message', 'code');
            expect(res.body.errors).contain.a.thing.with.property('code', 'incorrect_credentials');

            done();
        });
    });

    it('should authenticate the rider', (done) => {
        chai.request(url).post('/riders/authenticate').send({
            email: 'john@doe.com',
            password: '123456'
        }).end((err, res) => {
            token = res.body.data[0].token;
            expect(res).to.have.status(200);
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.success).equal(true);
            expect(res.body.status).equal(200);
            expect(res.body.message).to.be.a('string');
            expect(res.body.code).equal('rider_authenticated');
            expect(res.body.data).contain.a.thing.with.property('token', token);

            done();
        });
    });
});
