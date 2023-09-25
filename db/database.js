// const sqlite3 = require('sqlite3').verbose();
// const { open } = require('sqlite');

const mongo = require("mongodb").MongoClient;

const collectionName = "tickets";
const database = {
/*     openDb: async function openDb() {
        let dbFilename = `./db/trains.sqlite`;

        if (process.env.NODE_ENV === 'test') {
            dbFilename = "./db/test.sqlite";
        }

        return await open({
            filename: dbFilename,
            driver: sqlite3.Database
        });
    } */
    openDb: async function openDb() {
        let dsn = "mongodb://localhost:27017/trians";

        if (process.env.NODE_ENV === 'test') {
            dsn = `mongodb://localhost:27017/test`;
        }

        const client = await mongo.connect(dsn);

        const db = await client.db();
        const collection = db.collection(collectionName);

        return {
            db: db,
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;
