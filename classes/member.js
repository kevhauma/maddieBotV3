let database = require("../database/database")
class Member {
    constructor(m) {
        this.name = m.name
        this.id = m.id
        this.color = m.color
        this.joinedOn = m.joinedOn
        this.stats = m.stats
        this.currency = m.currency
    }
    addCurrency(amount, cb) {
        let amount = this.isValidAmount(amount)
        if (!amount) {
            throw "isNaN"
            return
        }

        this.currency.points += amount
        if (this.currency.points > this.currency.maxpoints)
            this.currency.maxpoints = this.currency.points

        cb(this)
    }
    subtractCurrency(amount, cb) {
        let amount = this.isValidAmount(amount)
        if (!amount) {
            throw "isNaN"
            return
        }
        if (amount > this.currency.points) {
            throw "not enough points"
            return
        }
        this.currency.points -= amount
        cb(this)

    }
    isValidAmount(amount) {
        if (isNaN(amount))
            return false

        return parseInt(amount)
    }
    addGamble(result, cb) {
        if (result === "won") {
            this.stats.gamble.wins += 1
        } else this.stats.gamble.losses += 1
        cb(this)
    }
    addJackpot(jackpot, cb) {
        if (jackpot)
            this.stats.jackpot.jackpot += 1
        this.stats.jackpot.gamesPlayed += 1
        cb(this)
    }
    addHighLow(maxMul, cb) {
        this.stats.highlow.gamesPlayed += 1
        if (maxMul > this.stats.higlow.maxMul)
            this.stats.higlow.maxMul = maxMul
        cb(this)
    }
    addHangman(result, cb) {
        if (result === "won")
            this.stats.hangman.wins += 1
        else
            this.stats.hangman.losses += 1
        cb(this)
    }
    changeName(newname, cb) {
        if (newname)
            this.name = newname
        else throw "newname from " + this.name + " is empty"

        cb(this)
    }
    changeColor(newcolor, cb) {
        if (newcolor)
            this.color = newcolor
        else throw "newcolor from " + this.name + " is empty"
        cb(this)
    }
    update(cb) {
        database.updateMember(this)
        .then(m=>{            
            cb(m)
        })
        .catch(err=> setTimeout(()=>{throw err}))
    }
    addMessage(message,cb){
        this.stats.message.latest = message.createAt
        this.stats.message.count += 1
        if(!this.stats.message.first){
            this.stats.message.first = message.createAt
        }
    }
}
module.exports = Member
let memberKSDKFSKDFJ = {
    name: "naam",
    id: "id",
    joinedOn: "date",
    color: "#F0F",
    currency: {
        points: 5000,
        maxpoints: 15000
    },
    stats: {
        messages: {
            latest: "date",
            count: 1500,
            first: "date"
        },
        gamble: {
            wins: 5,
            losses: 5,
            chance: 50
        },
        highlow: {
            gamesPlayed: 20,
            maxMul: 5.3
        },
        jackpot: {
            gamesPlayed: 4,
            jackpots: 0
        },
        hangman: {
            wins: 2,
            losses: 5
        },
        seasonal: [{
            name: "easter 2017",
            place: 2,
            points: 5
        }]
    }
}
