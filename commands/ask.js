let Discord = require("discord.js")
let config = require("../data/config.json")
let cleverbot = new require("cleverbot-node")()

let questionWords = ["why", "where", "how", "what", "when", "who"]


cleverbot.configure({
    botapi: config.clevertoken
})



async function run(message) {
    try {

        let settings = await dbH.get(message.guild.id)
        questionWordsResponses = settings.questionWordResponses
        eightballResponses = settings.eightballResponses
        let content = message.content
        let words = content.split(" ")

        let isYesNo = true
        let isOr = false
        let restofmessage = words.shift().join(" ")
        let lowercaseContent = restofmessage.toLowerCase()

        if (lowercaseContent.endsWith("?")) {
            if (lowercaseContent.includes(" or ")) {
                isYesNo = false
                isOr = true
            }
            if (isYesNo) {
                let index = Math.floor(Math.random() * (eightballresponses.length - 1))
                let response = eightballresponses[index]
                sendAnswer(response, restofmessage)

            } else if (isOr) {
                let chance = Math.random()
                if (chance < 0.3) sendAnswer(message, "hmmm... the first option looks fine.", restofmessage)
                else if (chance < 0.6 && chance > 0.3) sendAnswer(message, "Why not both?", restofmessage)
                else sendAnswer(message, "hmmm... i'd go with the latter.", restofmessage)
            } else {
                let questionword
                for (let w of questionWords) {
                    if (lowercaseContent.includes(w))
                        questionword = w
                }
                if (questionword)
                    response = getResponse(questionword)
                sendAnswer(message, response, restofmessage)
            }
        } else {
            cleverbot.write(restofmessage, responseCl => {
                sendAnswer(message, responseCl.output, restofmessage)
            })
        }
    } catch (e) {
        throw "ask.js: " + e
    }

    function sendAnswer(sentence) {
        let embed = new Discord.RichEmbed()
            .setTitle(message.member.displayName)
            .setColor(message.member.displayColor)
            .setDescription("❓ ``` " + restofmessage + "```\n 📢 ```" + sentence + "```")
            .setFooter("Ask a question with !ask", message.member.user.displayAvatarURL)
        message.channel.send({
                embed
            })
            .then(() => message.delete())
            .catch(err => setTimeout(() => {
                throw err
            }))
    }

    function getResponse(questionWord) {
        let i = Math.floor(Math.random() * (questionWordsResponses[questionWord].length - 1))
        return questionWordsResponses[questionWord][i]

    }
}




module.exports = {
    name: "ask",
    descr: "answers questions",
    run: run
}
