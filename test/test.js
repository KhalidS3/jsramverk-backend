process.env.NODE_ENV = 'test';

const chai = require('chai');
const { describe, it, before, after } = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const db = require('../db/database.js');

chai.should();
chai.use(chaiHttp);

const dataset = [
    {
        "_id": "651c021afa253e44db2248dc",
        "code": "TEST1",
        "trainnumber": "13834",
        "traindate": "2023-10-03"
    },
    {
        "_id": "651c3666b7311261b550829a",
        "code": "TEST2",
        "trainnumber": "3484",
        "traindate": "2023-10-03"
    }
];

describe('app', () => {
    before(async function() {
        this.timeout(5000);
        try {
            await db.openDb();
            await db.collection.insertMany(dataset);
            console.log('Database connection opened');
        } catch (err) {
            console.error('Error opening database connection:', err);
            throw err;
        }
    });

    after(async function() {
        try {
            await db.openDb();
            await db.collection.deleteMany({ _id: { $in: dataset.map(item => item._id) } });
            await db.closeDb();
            console.log('Database connection closed');
        } catch (err) {
            console.error('Error closing database connection:', err);
        }
    });

    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
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

    describe('GET /tickets', function() {
        it('should return 200 status and an array of tickets', async ()  => {
            try {
                const res = await chai.request(server).get("/tickets");

                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.data.should.be.an("array");
                res.body.data.length.should.be.above(0);
            } catch (err) {
                console.error("Error in test:", err);
                throw err;
            }
        });
    });

    // describe('POST /tickets', function() {
    //     // this.timeout(3000000);

    //     it('should return 201 status and a success message on valid input', function() {
    //         const ticketData = {
    //             code: '12345',
    //             trainnumber: 'TEST125',
    //             traindate: '2023-09-25'
    //         };

    //         return chai.request(server)
    //             .post("/tickets")
    //             .send(ticketData)
    //             .then((res) => {
    //                 res.should.have.status(201);
    //                 res.body.should.be.an("object");
    //                 // res.body.data.should.not.be.empty;
    //                 res.body.data.should.be.an("array");
    //                 res.body.data.should.include(ticketData);
    //             })
    //             .catch((err) => {
    //                 throw err;
    //             });
    //     });
    //});
});

