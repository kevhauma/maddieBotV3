let mH = require("../handlers/memberHandler")
let dbH = require("../handlers/databaseHandler")
let config = require("../data/config.json")
let logger = require("../logger/logger")
let run = async function (message) {
    try {
        config = await dbh.settings.get(message.guild.id)
        let member = await mh.getMemberByID(message.member.id, message.guild.id, message.member)
        let mentioned = message.mentions.members.first()
        if (mentioned) {
            if (!member.mod) {
                logger.log("info", message.member.displayName + " tried to check " + mentioned.displayName + "'s currency but is not a mod")
                message.reply(" you cannot check other people's currency.")
                return
            }
            member = await mh.getMemberByID(mentioned.member.id, message.member.guild.id)

            logger.log("info", message.member.displayName + " checked " + mentioned.displayName + "'s currency")
        }

        logger.log("info", message.member.displayName + " tried to check " + mentioned.displayName + "'s currency but failed")

        message.send(member.name + " has " + member.currency.points + " " + config.currency + ".")

    } catch (e) {
        setTimeout(() => {
            throw "currency.js: " + e
        })
    }
}


module.exports = {
    name: config.currency,
    spam: true,
    descr: "returns your amount of " + config.currency,
    run: run
}
