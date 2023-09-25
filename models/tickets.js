const database = require('../db/database.js');
const { ObjectId } = require('mongodb');

const tickets = {
    getTickets: async function getTickets(req, res) {
        let db;

        try {
            db = await database.openDb();

            const allTickets = await db.collection.find().toArray();

            return res.status(200).json({
                data: allTickets
            });
        } catch (error) {
            return res.status(500).json({
                error: {
                    title: "Database error (getTickets)",
                    detail: error.message,
                    source: "/tickets"
                }
            });
        } finally {
            try {
                if (db) {
                    await db.client.close();
                }
            } catch (error) {
                console.error('Error closing database connection:', error);
            }
        }
    },

    createTicket: async function createTicket(req, res) {
        let db;

        try {
            db = await database.openDb();

            // Generate a new ObjectId for _id
            const newObjectId = new ObjectId();

            const ticketData = {
                "_id": newObjectId,
                "code": req.body.code,
                "trainnumber": req.body.trainnumber,
                "traindate": req.body.traindate
            };

            console.log("Ticket Data:", ticketData);

            const result = await db.collection.insertOne(ticketData);

            console.log("Insert Result:", result);

            // Send the response with the responseData
            const responseData = {
                id: newObjectId, // generated ObjectId
                code: req.body.code,
                trainnumber: req.body.trainnumber,
                traindate: req.body.traindate,
            };

            return res.status(201).json({
                data: responseData
            });
        } catch (error) {
            return res.status(500).json({
                error: {
                    title: "Database error (createTicket)",
                    detail: error.message,
                    source: "/tickets"
                }
            });
        } finally {
            try {
                if (db) {
                    await db.client.close();
                }
            } catch (error) {
                console.error('Error closing database connection:', error);
            }
        }
    }

/*     createTicket: async function createTicket(req, res) {
        let db;

        try {
            db = await database.openDb();

            const result = await db.collection.insertOne({
                "code": req.body.code,
                "trainnumber": req.body.trainnumber,
                "traindate": req.body.traindate
            });

            return res.status(201).json({
                data: {
                    id: result.insertedId,
                    code: req.body.code,
                    trainnumber: req.body.trainnumber,
                    traindate: req.body.traindate,
                }
            });
        } catch (error) {
            return res.status(500).json({
                error: {
                    title: "Database error (createTicket)",
                    detail: error.message,
                    source: "/tickets"
                }
            });
        } finally {
            try {
                if (db) {
                    await db.client.close();
                }
            } catch (error) {
                console.error('Error closing database connection:', error);
            }
        }
    } */
};

module.exports = tickets;

/* const tickets = {
    getTickets: async function getTickets(req, res){
        var db = await database.openDb();

        var allTickets = await db.all(`SELECT *, ROWID as id FROM tickets ORDER BY ROWID DESC`);

        await db.close();

        return res.json({
            data: allTickets
        });
    },

    createTicket: async function createTicket(req, res){
        var db = await database.openDb();

        const result = await db.run(
            'INSERT INTO tickets (code, trainnumber, traindate) VALUES (?, ?, ?)',
            req.body.code,
            req.body.trainnumber,
            req.body.traindate,
        );

        await db.close();

        return res.json({
            data: {
                id: result.lastID,
                code: req.body.code,
                trainnumber: req.body.trainnumber,
                traindate: req.body.traindate,
            }
        });
    }
};

module.exports = tickets;*/
