let sH = require("../handlers/databaseHandler").settings
let mH = require("../handlers/memberHandler")
let run = async function (message) {
    let members = await mH.getMembers(message.guild.id).sort(comp)
    let settings = await sH.get(message.guild.id)
    let embed = new Discord.RichEmbed()
        .setTitle("LEADERBOARD")
        .setDescription("```All the "+settings.currency+"!```")
        .setThumbnail(member.guild.iconURL)
        .setColor(member.displayColor)
    
    for (let i = 0; i < 10; i++) {
        embed.addField((i + 1) + '. ' + members[i].name, members[i].currency.points, true)
    }
    
    message.channel.send({
        embed
    })

    function comp(a, b) {
        return b.currency.points > a.currency.points ? 1 : -1
    }
}
module.exports = {
    name: "leaderboard",
    spam: true,
    descr: "gives top 10 of feather-owners",
    run: run
}
