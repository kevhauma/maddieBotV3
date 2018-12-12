let commandHandler = require("./commandHandler")
let functionHandler = require("./functionhandler")


function handle(message) {
    message.channel.startTyping()
    //all commands *obviously*
    commandHandler.messageHandle(message)
    //functions -> giveOnMessage, react, artclub,
    functionHandler.handle(message)
    message.channel.stopTyping()
}
