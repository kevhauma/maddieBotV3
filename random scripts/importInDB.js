let jsonMembers = require("../data/members.json")
let dbH = require("../handlers/databaseHandler").members
run().then(() => console.log("done"))
async function run() {
    for (let i in jsonMembers) {
        let m = jsonMembers[i]
        let mem = {
            name: m.name,
            id: m.id,
            mod: false,
            guild: "316521652034863104",
            currency: {
                points: m.currency.points,
                maxpoints: m.stats.maxpoints
            },
            stats: {
                messages: {
                    latest: null,
                    count: m.stats.messagecount,
                    first: null
                },
                gamble: {
                    wins: m.stats.gamblewins,
                    losses: m.stats.gambleLosses,
                    chance: m.currency.gamechance
                },
                highlow: {
                    gamesPlayed: 0,
                    maxMul: 0
                },
                jackpot: {
                    gamesPlayed: m.stats.slotJackpots,
                    jackpots: m.stats.slotJackpots
                },
                hangman: {
                    wins: 0,
                    losses: 0
                },
                seasonal: []
            }
        }
        if (m.seasonal) mem.stats.seasonal.push(m.seasonal)
        if (m.hangman) {
            mem.hangman = {
                gamesPlayed: m.stats.highlow.gamesPlayed,
                maxMul: m.stats.highlow.highestMultiplier
            }
        }
        await dbH.add("316521652034863104", mem)
        console.log("added " + mem.name)

    }
}
