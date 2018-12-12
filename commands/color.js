let sH = require("../handlers/datbaseHandler").settings
let run = async function (message) {
    try {
        let settings = await sH.get(message.guild.id)
        let member = message.member
        let user = message.author
        let color = message.content.split(" ")[1]
        let colorRole
        let guildRoles = message.guild.roles
        let ranks = []

        if (!color) throw "no color given"
        //search each rolename from settings and store the guildrole
        for (let rank of settings.colorranks) {
            let r = guildRoles.find("name", rank)
            if (r)
                ranks.push(r)
        }
        //check if member has the role required to change color
        let isAllowed = false;
        for (let rank of ranks) {
            if (member.roles.has(rank.id)) isAllowed = true
        }
        if (!isAllowed) throw member.displayName + " doesn't have require role to change color"

        //role with user's username (for color)
        colorRole = message.guild.roles.find("name", user.username)
        //when color doesn't exists yet
        if (!role) {
            let r = await member.guild.createRole({
                name: user.username,
                color: color.toUpperCase().replace("#", ""),
                hoist: false,
                permissions: 104188992,
                mentionable: false
            })

            await r.setPosition(roles.size - 6)
            await member.addRole(role)
            sendColorConfirmation(role, message.channel)
        } else {
            let r = await role.setColor(words[1].toUpperCase().replace("#", ""))
            sendColorConfirmation(r, message.channel, message)
        }


    } catch (e) {
        setTimeout(() => {
            throw "color.js: " + e
        })
    }
}

module.exports = {
    name: "color",
    spam: true,
    descr: "gives color to people with required rank",
    run: run
}



let sendColorConfirmation = async function (role, channel, message) {
    let hexStringTEMP = role.hexColor
    let hexString = role.hexColor.substr(1, hexStringTEMP.length - 1)
    let colorame = await axios.get('http://www.thecolorapi.com/id?format=json&hex=' + hexString)
    colorname = response.data.name.value
    let embedcolor = parseInt(hexString, 16)
    sendEmbed(message, embedcolor, " you have the color: " + colorname + "(#" + hexString + ") now", "colours provided by TheColorApi.com")

}



function sendEmbed(message, color, sentence, footer) {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL)
        .setColor(color)
        .setDescription(sentence)
        .setFooter(footer)
    message.channel.send({
        embed
    })
}
