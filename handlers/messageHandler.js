let commandHandler = require("./commandHandler")
let functionHandler = require("./functionhandler")


function handle(message){
    //all commands *obviously*
    commandHandler.messageHandle()
    //functions -> giveOnMessage, react, artclub,
    functionHandler.handle()
}