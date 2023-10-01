process.env.NODE_ENV = 'test';

const chai = require('chai');
const { describe, it } = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../app.js');


chai.should();

chai.use(chaiHttp);


describe('app', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.an("object");
                    // res.body.data.should.be.an("string");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /delayed', () => {
        it('should return 200 status and an object of delayed trains', async () => {
            const res = await chai.request(server).get("/delayed");
            res.should.have.status(200);
            res.body.should.be.an("object");
        });
    });

    // Works locally but there is an issue while testing with server
    // describe('GET /tickets', function() {
    //     this.timeout(300000);

    //     it('200 HAPPY PATH for route /tickets', (done) => {
    //         chai.request(server)
    //             .get("/tickets")
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.an("object");
    //                 // res.body.data.should.be.an("string");
    //                 // res.body.data.length.should.be.above(0);

    //                 done();
    //             });
    //     });

        // it('should return 200 status and an array of tickets', async ()  => {
        //     try {
        //         const res = await chai.request(server).get("/tickets");
        //         res.should.have.status(200);
        //         res.body.should.be.an("object");
        //         res.body.data.should.be.an("array");
        //         res.body.data.length.should.be.above(0);
        //     } catch (err) {
        //         console.error("Error in test:", err);
        //         throw err; // Rethrow the error to fail the test
        //     }
        // });
    });


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
    //                 throw err;
    //             });
    //     });
    // });
});
