// const mongo = require("mongodb").MongoClient;
// require('dotenv').config();

// const collectionName = "tickets";
// const database = {
//     openDb: async function openDb() {
//         // let dsn = "mongodb://localhost:27017/trians";
//         let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}
//         @cluster0.eoj2ui3.mongodb.net/?retryWrites=true&w=majority`;


//         if (process.env.NODE_ENV === 'test') {
//             dsn = `mongodb://localhost:27017/trians`;
//         }

//         const client = await mongo.connect(dsn);

//         const db = await client.db();
//         const collection = db.collection(collectionName);

//         return {
//             db: db,
//             collection: collection,
//             client: client,
//         };
//     }
// };

// module.exports = database;

const mongo = require("mongodb").MongoClient;

require('dotenv').config();

const collectionName = "tickets";
let _db, _client;

const database = {
    openDb: async function openDb() {
        if (_db) {
            console.log("Using existing connection");
            return { db: _db, collection: _db.collection(collectionName), client: _client };
        }
        // let dsn = "mongodb://localhost:27017/trians";
        let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}
            @cluster0.eoj2ui3.mongodb.net/?retryWrites=true&w=majority`;

        if (process.env.NODE_ENV === 'test') {
            dsn = `mongodb://localhost:27017/trians`;
        }

        try {
            _client = await mongo.connect(dsn);
            _db = _client.db();
            console.log("Created new connection");
            return { db: _db, collection: _db.collection(collectionName), client: _client };
        } catch (err) {
            console.error(`Failed to connect to the database. Error: ${err}`);
            throw err;
        }
    },

    closeDb: async function closeDb() {
        if (_client) {
            try {
                await _client.close();
                console.log("Closed the database connection");
                _db = null;
                _client = null;
            } catch (error) {
                console.error("Error closing the database connection:", error);
            }
        } else {
            console.warn("No connection to close.");
        }
    }
};

module.exports = database;
