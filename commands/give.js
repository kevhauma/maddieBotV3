let mH = require("../handlers/memberHandler")
let sH = require("../handlers/databaseHandler").settings
let run = async function (message) {
    try {
        let settings = await sH.get(message.guild.id)
        if (!message.mentions.users.first()) {
            throw message.member.displayName + " tried to give feathers to no one"
            return
        }

        let gifter = await mH.getMemberByID(message.member.id)
        let giftee = await mH.getMemberByID(message.mentions.members.first().id)

        let amount = message.content.match(/ [0-9]+| all/i)
        if(amount)
            amount = amount[0].trim()
        if (!amount) {
            message.reply("you can't gamble 0 " + settings.currency)
            return
        }
        if (amount == "all") {
            amount = member.currency.points

        }
        if (!gifter.mod)
            gifter.subtractCurrency(amount)

        giftee.addCurrency(amount)

        message.channel.send(message.mentions.members.first() + ", you have received " + amount + " " + settings.currency + " from " + message.member)

    } catch (e) {
        setTimeout(() => {
            throw "give.js: " + e
        })
    }

}

module.exports = {
    name: "give",
    spam: true,
    descr: "give your points away!",
    run: run
}
