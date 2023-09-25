const mongo = require("mongodb").MongoClient;

const collectionName = "tickets";
const database = {
    openDb: async function openDb() {
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
