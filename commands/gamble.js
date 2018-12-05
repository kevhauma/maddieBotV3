let mh = require("../handlers/memberHandler")
let settings = require("../handlers/databaseHandler").settings
let config = require("../data/config.json")
let run = async function (message) {
    try {
        config = await settings.get(message.guild.id)
        let member = await mh.getMemberByID(message.member.id, message.guild.id)
        let amount = message.content.match(/\d*$|all/i)[0]

        if (!amount) {
            message.reply("you can't gamble 0 " + config.currency)
            return
        }
        if (amount == "all") {
            amount = member.currency.points

        }
        member.subtractCurrency(amount)
        if (Math.random() * 100 > member.stats.gamble.chance) {
            member.addCurrency(amount * 2)
            member.addGamble("won")
            message.reply("you have won " + amount + " " + config.currency + ", you now have " + member.currency.points + " " + config.currency)

        } else {
            member.addGamble("lost")
            message.reply("you have lost " + amount + " " + config.currency + ", you now have " + member.currency.points + " " + config.currency)
        }
        await member.update()
        
    } catch (e) {
        setTimeout(() => {
            throw "gamble.js : " + e
        })
    }
}

module.exports = {
    name: "gamble",
    spam: true,
    descr: "gamble your " + config.currency + " away!",
    run: run
}
