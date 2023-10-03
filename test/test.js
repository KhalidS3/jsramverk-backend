process.env.NODE_ENV = 'test';

const chai = require('chai');
const { describe, it, before, after } = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const db = require('../db/database.js');

chai.should();
chai.use(chaiHttp);
const collectionName = "tickets";


describe('app', () => {
    let dbInstance;

    before(async function() {
        this.timeout(5000);
        try {
            dbInstance = await db.openDb();

            const collectionInfoCursor = dbInstance.db.listCollections({ name: collectionName });
            const databaseInfoOfCollection = await collectionInfoCursor.next();


            if (databaseInfoOfCollection) {
                await dbInstance.collection.drop(); // drop the collection if it exists
                console.log(`${collectionName} collection dropped`);
            }

            console.log('Database connection opened');
        } catch (err) {
            console.error('Error initializing database setup:', err);
            throw err;
        }
    });

    after(async function() {
        try {
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
                res.body.data.length.should.be.equal(0);
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

