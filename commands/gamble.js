let mh = require("../handlers/memberHandler")
let settings = require("../handlers/databaseHandler").settingss
let run = async function (message) {
    try {
        let settings = await settings.get(message.guild.id)
        let member = await mh.getMemberByID(message.member.id, message.guild.id)

        let amount = message.content.match(/ [0-9]+| all/i)
        if (amount)
            amount = amount[0].trim()

        if (!amount) {
            message.reply("you can't gamble 0 " + settings.currency)
            return
        }
        if (amount == "all") {
            amount = member.currency.points

        }
        member.subtractCurrency(amount)
        if (Math.random() * 100 > member.stats.gamble.chance) {
            member.addCurrency(amount * 2)
            member.addGamble("won")
            message.reply("you have won " + amount + " " + settings.currency + ", you now have " + member.currency.points + " " + settings.currency)

        } else {
            member.addGamble("lost")
            message.reply("you have lost " + amount + " " + settings.currency + ", you now have " + member.currency.points + " " + settings.currency)
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
    descr: "gamble your points away!",
    run: run
}
