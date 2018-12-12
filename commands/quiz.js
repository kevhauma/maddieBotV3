const quizData = require("../data/quiz.json")
let mH = require("../handlers/memberHandler")
let Discord = require('discord.js')
let he = require('he')
activeQuizGames = []

let run = async function (message) {
    try {
        let quizF = findQuizgame(message.member.displayName)

        if (quizF) quizF.stop()

        let quiz = new Quiz(await mh.getMemberByID(message.member.id))

        let r = []

        let embed = new Discord.RichEmbed()
            .setTitle(message.member.displayName)
            .setColor(message.member.displayColor)
            .setFooter("please select one category and one difficulty")
            .addField("🇨 🇦 🇹 🇪 🇬 🇴 🇷 🇮 🇪 🇸", "⚫")

        for (let cat of quizData.categories) {
            embed.addField(cat.name, cat.emoji, true)
            r.push(.cat.emoji)
        }
        embed.addBlankField(true)
        embed.addBlankField(false)
        embed.addField("🇩 🇮 🇫 🇫 🇮 🇨 🇺 🇱 🇹 🇮 🇪 🇸", "⚫")

        for (let diff of quizData.difficulties) {
            embed.addField(diff.name, diff.emoji, true)
            r.push(diff.emoji)
        }

        let m = await message.channel.send({
            embed
        })
        for (let emoji of r) {
            await m.react(emoji)
        }
    } catch (e) {
        setTimeout(() => {
            throw "quiz.js - run: " + e
        })
    }
}


let check = function (reaction) {
    try {
        if (!reaction.message.embeds[0]) return
        let quiz = findQuizgame(reaction.message.embeds[0].title)

        if (!quiz) return

        if (!quiz.started) {
            let category = findCategory(reaction.emoji.name)
            if (category)
                quiz.setCategory(category)

            let diff = findDiff(reaction.emoji.name)
            if (diff)
                quiz.setDifficulty(diff)
            if (quiz.settings.diff && quiz.settings.cat) {
                reaction.message.delete()

                quiz.startQuiz()

                setTimeout(async function () {
                    let n = ["1⃣", "2⃣", "3⃣", "4⃣"]
                    let embed = quiz.getEmbed()
                    let m = await reaction.message.channel.send({
                        embed
                    })
                    for (let number of n) {
                        await m.react(number)
                    }
                }, 1500)
            }
        } else {
            let answered = getNumber(reaction.emoji.name)
            if (answered > 3 && !answered) return

            if (quiz.activeQuestion.answers[answered] === quiz.activeQuestion.correct_answer) {
                quiz.score = quiz.score + 1
                let m = await reaction.message.channel.send("you answered right! Woohoo")
                nextQ(m, quiz, reaction.message)
            } else {
                let m = await reaction.message.channel.send("you answered wrong :( The correct answer was: " + quiz.activeQuestion.correct_answer)
                nextQ(m, quiz, reaction.message)
            }
        }

        function nextQ(m, quizm, rm) {
            setTimeout(() => {
                m.delete()
                if (quizm.round < 4)
                    quizm.round = quizm.round + 1
                else quizm.stop()
                embed = quizm.getEmbed()
                rm.edit({
                    embed
                })
            }, 5000)
        }
        reaction.remove(user)
    } catch (e) {
        setTimeout(() => {
            throw "quiz.js - check: " + e
        })
    }
}
module.exports = {
    name: "quiz",
    spam: true,
    descr: "play a game of quiz",
    run: run,
    check: check
}

function findQuizgame(name) {
    return activeQuizGames.find(g => g.creator.name === name)
}

class Quiz {
    constructor(creator) {
        this.creator = creator
        this.settings = {
            diff: "",
            cat: ""
        }
        this.answers = []
        this.score = 0
        this.started = false
        this.round = 0
        this.activeQuestion = {}
        activeQuizGames.push(this)
    }
    setDifficulty(diff) {
        this.settings.diff = diff
    }
    setCategory(cat) {
        this.settings.cat = cat
    }
    startQuiz() {
        this.started = true
        let url = "https://opentdb.com/api.php?amount=5&type=multiple&difficulty=" + this.settings.diff.name
        if (this.settings.cat.id != 0) url += "&category=" + this.settings.cat.id[Math.floor(Math.random() * this.settings.cat.id.length)]
        axios.get(url)
            .then(res => {
                this.questions = res.data.results
            })
    }
    setActiveQuestion() {
        this.activeQuestion = this.questions[this.round]
        this.activeQuestion.answers = [this.activeQuestion.correct_answer]

        for (let answer of this.activeQuestion.incorrect_answers)
            this.activeQuestion.answers.push(answer)

        this.shuffle(this.activeQuestion.answers)
    }
    getEmbed() {
        this.setActiveQuestion()
        let qEmbed = new Discord.RichEmbed()
            .setTitle(this.creator.name)
            .setColor(this.creator.color)
            .setFooter("choose answer below")
        let descr = "round: " + (this.round + 1) + "/5\npoints: " + this.score + "/5\nCategory: " + this.activeQuestion.category + " " + this.settings.cat.emoji + "\n**Q:**\n```" + he.decode(this.activeQuestion.question) + "```\n**A:**\n```"
        for (let i = 0; i < this.activeQuestion.answers.length; i++) {
            descr += (i + 1) + ": " + he.decode(this.activeQuestion.answers[i]) + "\n"
        }
        descr += "```"
        qEmbed.setDescription(descr)
        return qEmbed
    }
    stop() {
        activeQuizGames.filter(g => g.creator.id !== this.creator.id)
    }

    shuffle(a) {
        let shuffled = []

        for (let item of a) { //iterate through itemns
            let rand = 0
            do {
                rand = Math.floor(Math.random() * a.length)
            } while (!shuffled[rand]) // get random place which is not taken

            shuffled[rand] = item
        }
        return shuffled
    }
}



function findCategory(emoji) {
    return quizData.categories.find(c => c.emoji === emoji)
}

function findDiff(emoji) {
    return quizData.difficulties.find(d => d.emoji === emoji)
}

function findQuizgame(name) {
    return activeQuizGames.find(q => q.creator.name === name)
}

function getNumber(emote) {
    let number = null
    switch (emote) {
        case "1⃣":
            number = 0;
            break;
        case "2⃣":
            number = 1;
            break;
        case "3⃣":
            number = 2;
            break;
        case "4⃣":
            number = 3;
            break;
        case "5⃣":
            number = 4;
            break;
        case "6⃣":
            number = 5;
            break;
        case "7⃣":
            number = 6;
            break;
        case "8⃣":
            number = 7;
            break;
        case "9⃣":
            number = 8;
            break;
        case "🔟":
            number = 9;
            break;
    }
    return number
}
