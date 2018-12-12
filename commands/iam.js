let sH = require("../handlers/databaseHandler").settings

let run = async function (message) {
    try {
        let settings =await sH.get(message.guild.id)
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

        if (message.member.roles.has(role.id)) {
            message.reply(" You already have this role.")
            return
        }
        member.addRole(role)

        message.reply(" succesfully added " + role.name + " to you.")


    } catch (e) {
        setTimeout(() => {
            throw "iam.js: " + e
        })
    }

}



module.exports = {
    name: "iam",
    spam: true,
    descr: "gives roles for hidden channels",
    run: run
}
