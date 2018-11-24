let Member = require("../classes/member")
let db = require("../handlers/databaseHandler")

function createMember(gm, cb) {
    let member = {
        name: gm.displayName,
        id: gm.id,
        joinedOn: gm.joinedAt,
        color: gm.displayColor,
        isMod: false,
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
    db.addMember(new Member(member))
        .then(m => {
            if (cb)
                cb(m)
        })
        .catch(err => setTimeout(() => {
            throw err
        }))

}


function getMemberByID(gm, cb) {
    db.findMemberbyID(gm.id).then(m => {
        if (cb)
            cb(m)
    }).catch(err => setTimeout(() => {
        throw err
    }))
}

function getMember(obj, cb) {
    db.findMember(obj).then(m => {
        if (cb)
            cb(m)
    }).catch(err => setTimeout(() => {
        throw err
    }))
}

function getMembers(obj, cb) {
    db.findMembers(obj).then(m => {
        if (cb)
            cb(m)
    }).catch(err => setTimeout(() => {
        throw err
    }))
}

function deleteMember(obj, cb) {
    db.removeMember(obj).then(m => {
        if (cb)
            cb(m)
    }).catch(err => setTimeout(() => {
        throw err
    }))
}

function updateMember() {

}


module.exports = {
    createMember,
    getMemberByID,
    getMember,
    getMembers,
    deleteMember
}
