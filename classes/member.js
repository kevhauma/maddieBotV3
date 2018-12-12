let mh = require("../handlers/memberhandler")
class Member {
    constructor(m) {
        this.name = m.name
        this.id = m.id
        this.guild = m.guild
        this.mod = m.mod
        this.stats = m.stats
        this.currency = m.currency
    }
    addCurrency(amount) {
        amount = this.isValidAmount(amount)
        if (!amount) {
            throw "isNaN"
            return
        }

        this.currency.points += amount
        if (this.currency.points > this.currency.maxpoints)
            this.currency.maxpoints = this.currency.points

    }
    subtractCurrency(amount) {
        amount = this.isValidAmount(amount)
        if (!amount) {
            throw "isNaN"
            return
        }
        if (amount > this.currency.points) {
            throw "not enough points"
            return
        }
        this.currency.points -= amount

    }
    isValidAmount(amount) {
        if (isNaN(amount))
            return false

        return parseInt(amount)
    }
    addGamble(result) {
        if (result === "won") {
            this.stats.gamble.wins += 1
            this.stats.gamble.chance = 70
        } else {
            this.stats.gamble.losses += 1
            this.stats.gamble.chance -= 5
        }
    }
    addJackpot(jackpot) {
        if (jackpot)
            this.stats.jackpot.jackpot += 1
        this.stats.jackpot.gamesPlayed += 1
    }
    addHighLow(mult) {
        this.stats.highlow.gamesPlayed += 1
        if (mult > this.stats.higlow.maxMul)
            this.stats.higlow.maxMul = mult
    }
    addHangman(result) {
        if (result === "won")
            this.stats.hangman.wins += 1
        else
            this.stats.hangman.losses += 1
    }
    changeName(newname) {
        if (newname)
            this.name = newname
        else throw "newname from " + this.name + " is empty"

    }
    update() {
        mh.updateMember(this)
    }
    addMessage(message) {
        this.stats.message.latest = message.createAt
        this.stats.message.count += 1
        if (!this.stats.message.first) {
            this.stats.message.first = message.createAt
        }
    }
}
module.exports = Member
let memberKSDKFSKDFJ = {
    name: "naam",
    id: "id",
    mod: true,
    guild: "566746516865684",
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
