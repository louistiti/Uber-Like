'use strict';

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';

import { api } from '../config/config';

const url = `http://${api().host}:${api().port + api().version}`;

chai.use(chaiHttp);
chai.use(chaiThings);

describe('POST /riders', () => {
    it('should return error params missing', (done) => {
        chai.request(url)
            .post('/riders')
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

    it('should return several errors', (done) => {
        chai.request(url)
            .post('/riders')
            .send({
                firstname: 'John',
                lastname: 'Doe',
                phone: '060000000',
                email: 'rider@doe',
                password: '12345'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res.body.success).equal(false);
                expect(res.body.status).equal(400);
                expect(res.body.errors).all.include.keys('message', 'code');
                expect(res.body.errors).contain.a.thing.with.property('code', 'invalid_phone_number');
                expect(res.body.errors).contain.a.thing.with.property('code', 'invalid_email_address');
                expect(res.body.errors).contain.a.thing.with.property('code', 'password_too_short');

                done();
            });
    });

    it('should add a new rider', (done) => {
        chai.request(url)
            .post('/riders')
            .send({
                firstname: 'John',
                lastname: 'Doe',
                phone: '0600000000',
                email: 'rider@doe.com',
                password: '123456'
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                expect(res).to.have.header('location', '/v1/auth/token');
                expect(res.body.success).equal(true);
                expect(res.body.status).equal(201);
                expect(res.body.message).to.be.a('string');
                expect(res.body.code).equal('rider_added');

                done();
            });
    });

    it('should return error phone number already taken', (done) => {
        chai.request(url)
            .post('/riders')
            .send({
                firstname: 'John',
                lastname: 'Doe',
                phone: '0600000000',
                email: 'rider@doe.com',
                password: '123456'
            })
            .end((err, res) => {
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
        chai.request(url)
            .post('/riders')
            .send({
                firstname: 'John',
                lastname: 'Doe',
                phone: '0600000001',
                email: 'rider@doe.com',
                password: '123456'
            })
            .end((err, res) => {
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
