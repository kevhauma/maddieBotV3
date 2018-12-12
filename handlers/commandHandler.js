let logger = require("../logger/logger")
let fs = require("fs")
let commands = []

let dbHandler = require("../handlers/databaseHandler")
let setting

try {
    loadFiles()
} catch (e) {
    logger.log("error", "commandHandler - loadfiles: " + e)
}



async function messageHandle(message) {
    try {
        setting = await dbHandler.settings.get(message.guild.id)

        if (!message.content.startsWith(setting.prefix)) return

        let commandCall = message.content.split(" ")[0].replace(setting.prefix, "")
        let command = commands.find(c => c.name === commandCall)
        if (!command) throw commandCall + " is not a command"

        command.run(message)
    } catch (e) {
        logger.log("error", "commandHandler - handleMessage: " + e)
    }
}

function reactionHandle(reaction) {
    try {
        commands.forEach(c => {
            if (c.check) c.check()
        })
    } catch (e) {
        logger.log("error", "commandHandler - handleMessage: " + e)

    }
}


function loadFiles() {
    commands = []
    fs.readdir("./commands/", (err, files) => {
        if (err) throw err
        files.forEach(file => {
            if (file.endsWith('.js')) {
                let command = require("../commands/" + file)
                commands.push(command)
            }
        })
    })
}


module.exports = {
    reactionHandle,
    messageHandle
}
