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
        // atlas database password:
        // let dsn = "mongodb://localhost:27017/trians";
        let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.tvxah5f.mongodb.net/trians?retryWrites=true&w=majority`;

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
