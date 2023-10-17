const database = require('../db/database.js');
const { ObjectId } = require('mongodb');

const tickets = {
    getTickets: async function getTickets(req, res) {
        let db;

        try {
            db = await database.openDb();

            const allTickets = await db.collection.find().toArray();

            console.log("getting all tickets:", allTickets);

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
                    await database.closeDb();
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
            console.error('Server Error:', error);
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
                    await database.closeDb();
                }
            } catch (error) {
                console.error('Error closing database connection:', error);
            }
        }
    },

    updateTicket: async function updateTicket(req, res) {
        let db;

        try {
            db = await database.openDb();

            // Retrieving the ticket's ID from the request
            const ticketId = new ObjectId(req.params.id);

            // Prepare the updated data
            const updatedData = {
                code: req.body.code,
                trainnumber: req.body.trainnumber,
                traindate: req.body.traindate
            };

            console.log("Update Data for ID:", ticketId, updatedData);

            // Update the ticket in the database
            const result = await db.collection.updateOne({_id: ticketId}, {$set: updatedData});

            // Check if any document was actually updated
            if (result.matchedCount === 0) {
                return res.status(404).json({
                    error: {
                        title: "No ticket found",
                        detail: "No ticket with the given ID was found",
                        source: "/tickets/:id"
                    }
                });
            }

            console.log("Update Result:", result);

            // Send the response with the updated data
            const responseData = {
                id: ticketId,
                ...updatedData
            };

            return res.status(200).json({
                data: responseData
            });
        } catch (error) {
            console.error('Server Error:', error);
            return res.status(500).json({
                error: {
                    title: "Database error (updateTicket)",
                    detail: error.message,
                    source: "/tickets/:id"
                }
            });
        } finally {
            try {
                if (db) {
                    await database.closeDb();
                }
            } catch (error) {
                console.error('Error closing database connection:', error);
            }
        }
    }
};

module.exports = tickets;

