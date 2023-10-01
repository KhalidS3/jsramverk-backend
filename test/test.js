process.env.NODE_ENV = 'test';

const chai = require('chai');
const { describe, it } = require('mocha');
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
                    if (err) {
                        return done(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    // Works locally but there is an issue while testing with server
    // describe('GET /tickets', function() {
    //     this.timeout(300000); // Set timeout for all tests in this describe block

    //     it('should return 200 status and an array of tickets', function() {
    //         return chai.request(server)
    //             .get("/tickets")
    //             .then((res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.an("object");
    //                 res.body.data.should.be.an("array");
    //                 res.body.data.length.should.be.above(0);
    //             })
    //             .catch((err) => {
    //                 throw err; // Rethrow error to fail the test
    //             });
    //     });
    // });

    // describe('POST /tickets', function() {
    //     this.timeout(3000000); // Set timeout for all tests in this describe block

    //     it('should return 201 status and a success message on valid input', function() {
    //         const ticketData = {
    //             code: '12345',
    //             trainnumber: '67678',
    //             traindate: '2023-09-25'
    //         };
    //         return chai.request(server)
    //             .post("/tickets")
    //             .send(ticketData)
    //             .then((res) => {
    //                 res.should.have.status(201);
    //                 res.body.should.be.an("object");
    //                 res.body.data.should.not.be.empty;
    //             })
    //             .catch((err) => {
    //                 throw err; // Rethrow error to fail the test
    //             });
    //     });
    // });
});
