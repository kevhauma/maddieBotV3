let artclub, countdown, giveOnMessage,
    isLive, onJoin, onLeave, pictureReact,
    promotion, messageReact

loadFunctions()


function onStart(client) {
    countdown.run(client)
}

function onMessage(message) {
    giveOnMessage.run(message)
    messageReact.run(message)
    pictureReact.run(message)
    artclub.run(message)
}

function onPresence(newMember, oldMember) {
    isLive.run(newMember, oldMember)
}

module.exports = {
    onStart,
    onMessage,
    onPresence,
    onJoin,
    onLeave
}





function loadFunctions() {
//    artclub = require("../functions/artclub")
//    countdown = require("../functions/countdown")
//    giveOnMessage = require("../functions/giveOnMessage")
//    isLive = require("../functions/isLive")
//    onJoin = require("../functions/onJoin")
//    onLeave = require("../functions/onLeave")
//    pictureReact = require("../functions/pictureReact")
//    promotion = require("../functions/promotion")
//    messageReact = require("../functions/messageReact")
}