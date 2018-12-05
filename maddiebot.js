////packages
const Discord = require('discord.js')
const mh = require("./handlers/memberHandler")
const settingHandler = require("./handlers/databaseHandler").settings
const gamble = require("./commands/gamble")
const config = require("./data/config.json")
//const axios = require('axios')
//let fs = require("fs")
//let JSONStream = require("JSONStream")
//let he = require('he');
//let Cleverbot = require('cleverbot-node');
//
mh.getMember("316521652034863104",{name:"MrJunior717"}).then((m) => {
    console.log(m)
})

const client = new Discord.Client()
//
//let currencyMembers = require("./data/members.json")
//let membersFile = "/data/members.json"
//let owner = config.ownerID
//let cleverbot = new Cleverbot;
//cleverbot.configure({
//    botapi: config.clevertoken
//});
//
//
////loading functions
//let react = require("./functions/reacting")
//let countDown = require("./functions/countdown")
//let dadJoke = require("./functions/dadJoke")
//let giveOnMessage = require("./functions/giveOnMessage")
//var isLive = require("./functions/isLive")
//var onJoin = require("./functions/onJoin")
//var onLeave = require("./functions/onLeave")
//var pictureReact = require("./functions/pictureReact")
//var write = require("./write")
//
////load commands
//let generalCommands = []
//let spamCommands = []
//let reactionCommands = []
//fs.readdir("./commands/", (err, files) => {
//    for (let t = 0; t < files.length; t++) {
//        if (files[t].endsWith('.js')) {
//            let command = require("./commands/" + files[t])
//            if (!command.spam)
//                generalCommands.push(command)
//            if (command.check)
//                reactionCommands.push(command)
//            if (command.spam)
//                spamCommands.push(command)
//        }
//    }
//})
//
//
//
client.on('ready', () => {
    console.log('I am ready!')
    //    //countDown(client)
    //    owner = client.guilds.first().members.get(owner).user
    //    client.user.setPresence({
    //            'status': 'online',
    //            'game': {
    //                'name': 'back in a few weeks',
    //                'type': 1,
    //                'url': 'https://www.twitch.tv/madeleineink'
    //            }
    //        })
    //        .catch(error => {
    //            console.log(error)
    //        })
})
//client.on('message', function (message) {
//    if (message.channel.type == 'dm') {
//        if (message.channel.recipient.id !== owner.id)
//            owner.send(message.author.username + ' to ' + message.channel.recipient.username + ': ' + message.content)
//        if (message.author.id !== client.user.id) {
//            cleverbot.write(message.content, response => {
//                message.reply(response.output)
//            })
//        }
//        console.log(message.author.username + " sent something \n \t " + message.content)
//    } else {
//        console.log(message.channel.name + '|' + message.author.username + ": " + message.content)
//        giveOnMessage(message, currencyMembers)
//
//        //functions in general chat
//        if (message.channel.name == config.generalChat) {
//            react(message)
//            dadJoke(client, message)
//
//            if (message.content.startsWith(config.prefix)) {
//                let words = message.content.split(" ")
//                for (let i = 0; i < generalCommands.length; i++) {
//                    if (words[0].replace("!", "") == generalCommands[i].name) {
//                        generalCommands[i].run(Discord, client, message, words, currencyMembers, axios, cleverbot, he)
//                    }
//                }
//            }
//
//        }
//        //commands for bot_spam
//        if (message.channel.name == config.botSpamChat) {
//            if (message.content.startsWith(config.prefix)) {
//                let words = message.content.split(" ")
//                for (let i = 0; i < spamCommands.length; i++) {
//                    if (words[0].replace("!", "") == spamCommands[i].name) {
//                        spamCommands[i].run(Discord, client, message, words, currencyMembers, axios, cleverbot, he)
//                    }
//                }
//            }
//        }
//        //general commands
//
//
//        //for art channels
//        if (config.channelList.includes(message.channel.name))
//            pictureReact(message)
//
//        write(membersFile, currencyMembers, fs, JSONStream)
//    }
//})
//client.on('presenceUpdate', (oldMember, newMember) => {
//    isLive(oldMember, newMember, client)
//})
//client.on('guildMemberAdd', member => {
//    onJoin(member)
//})
//client.on('guildMemberRemove', member => {
//    onLeave(member)
//})
//client.on('messageReactionAdd', (reaction, user) => {
//    for (let i = 0; i < reactionCommands.length; i++) {
//        reactionCommands[i].check(Discord, client, reaction, user, currencyMembers)
//
//    }
//})
//client.on('disconnect', (event) => {
//    console.log("disconnect", event)
//})
//client.on('error', (event) => {
//    console.log("error", event)
//})
//client.on('reconnecting', () => {
//    console.log("reconnecting")
//})
//client.on('resume', (replayed) => {
//    console.log("resume", replayed)
//})
client.login(config.token).catch((err) => {
    console.log(err)
})
