const {MongoClient} = require('mongodb')
require("dotenv").config()
const uri = process.env.DATABASE_URL
const dbName = process.env.DB_NAME
const collectionName = process.env.COLLECTION_NAME
const client = new MongoClient(uri)

async function getData() {
    try {
        // Connect to the MongoDB cluster
        await client.connect()

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const query = {};
        const result = await collection.findOne(query);

        if (result) {
            await client.close()
            return result
        } else {
            console.log("No record found matching that query.");
        }
        
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

module.exports =  getData 
