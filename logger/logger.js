let fs = require('fs')
let logFile
let mod_logs
let ignoredLevels = ["DEBUG","TRACE","INFO","MESSAGE"]

function log(level, st) {
    level = level.toUpperCase()
    let file = "MESSAGE"
    if(level !== "MESSAGE"){
        file = "LOG"
    }
    console.log(level + " | " + st)
    logfile = fs.createWriteStream("./logger/logs/" + file + ".log", {
        flags: 'a'
    })
    logfile.write("[" + new Date().toLocaleTimeString() + "] " + st + "\r\n");
    
    if(mod_logs && !ignoredLevels.includes(level)){
        mod_logs.send(level + " | " + st)
    }
}

function giveChannel(channel){
    mod_logs = channel
}


module.exports = {
    log,
    giveChannel
}
