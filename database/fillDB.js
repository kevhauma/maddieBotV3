const Discord = require('discord.js')
let mH = require('../handlers/memberHandler')
let conf = require("../data/config.json")


let bot = {}
bot.start = async function (token) {
    const client = new Discord.Client()
    client.on('ready', () => {
        for (let g of client.guilds.array())
            for (let m of g.members.array()) {
                mH.createMember(m)
                console.log("added " + m.displayName + " in " + g.name)
            }
    })

    client.login(token).catch((err) => {
        console.log(err)
    })
}




let run = function () {
    for (let s of conf.servers) {
        bot.start(s.token)
    }
}





module.exports = {
    run
}
