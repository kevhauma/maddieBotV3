let database = require("../database/database")
let logger = require("../logger/logger")
let db

tryConnect()
modules.exports.members.add = (member) => {
    return new Promise((res, rej) => {
        if (!db) {
            rej("db not connected")
            return
        }
        const collection = db.collection('members')
        collection.insertOne(member, (err, result) => {
            if (err) {
                rej(err)
            }
            logger.log("INFO", "member added: " + member.name)
            res(result)
        })
    })
}

modules.exports.members.update = (obj) => {
    return new Promise((res, rej) => {
        if (!db) {
            rej("db not connected")
            return
        }

        const collection = db.collection('members');
        collection.updateOne({
            id: member.id
        }, {
            $set: {obj}
        }, (err, result) => {
            if (err) {
                rej(err)
                return
            }
            logger.log("INFO", "member update: " + member.name)
            res(result);
        })
    })
}

modules.exports.members.findbyID = (id) => {
    return new Promise((res, rej) => {
        if (!db) {
            rej("db not connected")
            return
        }

        const collection = db.collection('members');
        let found = collection.findOne({
            "id": id
        })
        if (!found) {
            rej("no member found with ID: " + id)
            return
        } else
            res(found)
    })
}


modules.exports.members.findMany = (obj) => {
    return new Promise((res, rej) => {
        if (!db) {
            rej("db not connected")
            return
        }
        const collection = db.collection('members');
        collection.find(obj).toArray((err, found) => {
            if (err) {
                rej(err)
                return
            }
            res(found)
        })
    })
}
modules.exports.members.find = (obj) => {
    return new Promise((res, rej) => {
        if (!db) {
            rej("db not connected")
            return
        }

        const collection = db.collection('members');
        let found = collection.findOne(obj)
        if (!found) {
            rej("no member found with :" + obj)
            return
        } else
            res(found)
    })
}
modules.exports.members.remove = (obj) => {
    return new Promise((res, rej) => {
        if (!db) {
            rej("db not connected")
            return
        }
        const collection = db.collection('members');
        collection.deleteOne({
            id: obj.id
        }, (err, result) => {
            if (err)
                rej(err)
            else {
                logger.log("INFO", "member deleted: " + obj.name)
                res(result)
            }
        });

    })

}


modules.export.settings.get = () {
    return new Promise((res, rej) => {
        if (!db) {
            rej("db not connected")
            return
        }
        const collection = db.collection('settings');
        let found = collection.findOne({
            id: 1
        })
        if (!found) {
            rej("no settings found")
            return
        } else
            res(found)
    })
}

modules.export.settings.update = (obj) {
    return new Promise((res, rej) => {
        if (!db) {
            rej("db not connected")
            return
        }
        const collection = db.collection('settings');
        collection.updateOne({id: 1}, {
            $set: {
                obj
            }
        }, (err, result) => {
            if (err) {
                rej(err)
                return
            } else {
                logger.log("INFO", "settings updated")
                res(result)
            }
        })
    })
}


function tryConnect() {
    try {
        db = database.get()
    } catch (err) {
        setTimeout(tryConnect, 5000)
    }
}

module.exports = {
    "members": {
        findbyID,
        findMany,
        find,
        update,
        add,
        remove
    },
    "settings": {
        update
    }
}
