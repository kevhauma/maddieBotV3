let database = require("../database/database")
let logger = require("../logger/logger")
let Member = require("../classes/member")
module.exports.members = {}
module.exports.settings = {}

module.exports.members.add = async function (guild, member) {
    let res = await maptoDB(guild, "insertOne", member)
    return res
}


module.exports.members.update = async function (guild, obj) {
    let res = await maptoDB(guild, "updateOne", {id:obj.id},{$set:{obj}})
    return res
}


module.exports.members.findbyID = async function (guild, id) {
    let res = await maptoDB(guild, "findOne", {
        "id": id
    })
    return res
}


module.exports.members.findMany = async function (guild, obj) {
    let res = await maptoDB(guild, "find", obj)
    return await res.toArray()
}
module.exports.members.find = async function (guild, obj) {
    let res = await maptoDB(guild, "findOne", obj)
    return res
}
module.exports.members.remove = async function (guild, obj) {
    let res = await maptoDB(guild, "deleteOne", obj)
    return res
}

module.exports.settings.set = async function (obj) {
    return await maptoDB(obj.guild, "insertOne", obj, null,true)

}
module.exports.settings.get = async function (guild) {
    return await maptoDB(guild, "findOne", {
        guild: guild
    }, null,true)
}

module.exports.settings.update = async function (guild, obj) {
    return await maptoDB(guild, "updateOne", {
        guild: guild
    }, {
        $set: {
            obj
        }
    }, true)

}

async function maptoDB(guild, func, obj, set, settings) {
    try {
        let db
        let collection
        if (settings) {
            db = await database.get("settings")
            collection = db.collection('settings')
        } else {
            db = await database.get(guild)
            collection = db.collection('members')
        }


        if (set) {
            return await collection[func](obj, set)
        } else {
            return await collection[func](obj)

        }
    } catch (e) {
        setTimeout(() => {
            throw "DBH - " + func + ": " + e
        })
    }
}
