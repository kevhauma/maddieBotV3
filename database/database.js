const MongoClient = require('mongodb').MongoClient;

const serverList = require("../data/config").servers

const url = 'mongodb://localhost:27017';


// Create a new MongoClient
const client = new MongoClient(url);

let db = {}


client.connect(err => {
    if (err) throw "databse is rip: " + err
    for (let s of serverList)
        db[s.guild] = client.db(s.guild)

})

module.exports.get = function (s) {
    return new Promise((res, rej) => {
        if (!db[s])
            setTimeout(() => {
                res(db[s])
            }, 5000)
        else res(db[s])
    })

}
