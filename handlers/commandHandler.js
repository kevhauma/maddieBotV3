let settings = require("../handlers/databaseHandler").settings.get()

let commands = []


function messageHandle(message) {
    if (!message.content.startsWith(setting.prefix)) return
    
    let commandCall = message.content.split(" ")[0].replace("!", "")
    let command = commands.find(c=> c.name === commandCall)
    if(!command) return
    
    command.run(message)
}

function reactionHandle(reaction){
    commands.forEach(c=>{
        if (c.check) c.check()
    })
}


function loadFiles() {
    commands = []
    fs.readdir("../commands/", (err, files) => {
        files.forEach(file => {
            if (file.endsWith('.js')) {
                let command = require("./commands/" + files[t])
                commands.push(command)
            }
        })
    })
}


module.exports = {
    reactionHandle,
    messageHandle
}