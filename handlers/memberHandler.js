let Member = require("../classes/member")
let db = require("../handlers/databaseHandler").members

async function createMember(gm) {
    let member = {
        name: gm.displayName,
        id: gm.id,
        guild: gm.guild.id,
        mod: false,
        currency: {
            points: 100,
            maxpoints: 100
        },
        stats: {
            messages: {
                latest: null,
                count: 0,
                first: null
            },
            gamble: {
                wins: 0,
                losses: 0,
                chance: 50
            },
            highlow: {
                gamesPlayed: 0,
                maxMul: 0
            },
            jackpot: {
                gamesPlayed: 0,
                jackpots: 0
            },
            hangman: {
                wins: 0,
                losses: 0
            },
            seasonal: []
        }
    }

    try {
        return await dbQuery(db.add, new Member(member), member.guild)
    } catch (e) {
        setTimeout(() => {
            throw "memberHandler - : " + e
        })
    }
}


async function getMemberByID(id, guild,gm) {
    let res = await dbQuery(db.findbyID, id, guild)
    if(!res && gm){
        return await createMember(gm)
    }
    return new Member(res)
}

async function getMember(guild, obj) {
    let res = await dbQuery(db.find, obj, guild)
    return new Member(res)

}

async function getMembers(obj, guild) {
    if (!guild) {
        guild = obj
        obj = null
    }
    return await dbQuery(db.findMany, obj, guild)
}

async function deleteMember(obj, guild) {
    return await dbQuery(db.remove, {
        "id": obj.id
    }, guild)
}

async function updateMember(member) {
    return await dbQuery(db.update, member, member.guild)

}


async function dbQuery(func, obj, guild) {
    try {
        let m = await func(guild, obj)
        return m
    } catch (e) {
        setTimeout(() => {
            throw "memberHandler - : " + e
        })
    }
}





module.exports = {
    createMember,
    getMemberByID,
    getMember,
    getMembers,
    deleteMember,
    updateMember
}
