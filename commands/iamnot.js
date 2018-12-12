let sH = require("../handlers/databaseHandler").settings

let run = async function (message) {
    try {
        let settings = await sH.get(message.guild.id)
        let role = message.content.split(" ")[1]
        let roleExists = false
        let member = message.member //user who sent messages              

        if (words.length < 2) return

        if (settings.saroles.includes(role)) {
            role = message.guild.roles.find("name", role)
        } else {
            message.reply(" This role does not exists.")
            return
        }
        if (!message.member.roles.has(role.id)) {
            message.reply(" you don't have that role yet.", 16711680)
            return
        }
        member.removeRole(role)
        message.reply(" succesfully removed " + role.name + " from you.")
    } catch (e) {
        setTimeout(() => {
            throw "iamnot.js: " + e
        })
    }
}



module.exports = {
    name: "iamnot",
    spam: true,
    descr: "removes roles for hidden channels",
    run: run
}
