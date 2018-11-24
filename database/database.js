const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'maddieBot';

// Create a new MongoClient
const client = new MongoClient(url);

let db

client.connect(err => {
    console.log("Database is ready");
    db = client.db(dbName);
})

module.exports.get = ()=>{
    if (db) return db
    else throw "db not connected"
}
