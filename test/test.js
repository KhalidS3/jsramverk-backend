/* global it describe */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');


chai.should();

chai.use(chaiHttp);

describe('app', () => {
    describe('GET /', () => {
        it('should return 200 status and a message', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("string");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /delayed', () => {
        it('should return 200 status and an array of delayed trains', (done) => {
            chai.request(server)
                .get("/delayed")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /tickets', () => {
        it('should return 200 status and an array of tickets', (done) => {
            chai.request(server)
                .get("/tickets")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('POST /tickets', () => {
        it('should return 201 status and a success message on valid input', (done) => {
            const ticketData = {
                code: '12345',
                trainnumber: '67678',
                traindate: '2023-09-25'
            };

            chai.request(server)
                .post("/tickets")
                .send(ticketData)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.should.not.be.empty;

                    done();
                });
        });
    });

});
