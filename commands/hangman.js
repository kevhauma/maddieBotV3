let mH = require("../handlers/memberHandler")
let sH = require("../handlers/databaHandler").settings
let Discord = require("discord.js")
let activeHangmanGames = []



let img = ["https://i.imgur.com/73KxhQ7.png", "https://i.imgur.com/w4O3ixF.png", "https://i.imgur.com/v4p6Vq7.png", "https://i.imgur.com/vdxQLEv.png", "https://i.imgur.com/1VTTS6e.png", "https://i.imgur.com/2PkLTtm.png", "https://i.imgur.com/V7jOXWf.png"]
let emojiAlphabet = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇱", "🇲", "🇳", "🇴", "🇵", "🇷", "🇸", "🇹", "🇺", "🇼", "🇾"]
let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "l", "m", "n", "o", "p", "r", "s", "t", "u", "w", "y"]
let forbiddenLetters = ["z", "j", "k", "v", "q", "x"]
let hangmanWords = require("../data/HangManwords.json")

let run = async function (message) {
    try {
        
        let game = findHMgame(message.member.displayName)
        if (game) {
            game.stop()
        }

        let player = mH.getMemberByID(message.member.id)

        activeHangmanGames.push(new Hangman(await mH.getMemberByID(mem.id)))

        game = findHMgame(message.member.displayName)

        let embed = game.getEmbed()

        let m = await message.channel.send({
            embed
        })

        let remLet = game.getremLetterA()

        for (let letter of remLet) {
            let em = getEmote(letter)
            if (em)
                await m.react(em)
        }

    } catch (e) {
        setTimeout(() => {
            throw "hangman.js - check : " + e
        })
    }


}

let check = async function (reaction) {
    try {
        if (!reaction.message.embeds[0]) return

        let game = findHMgame(reaction.message.embeds[0].title)
        if (!game) return

        let letter = getLetter(reaction.emoji.name)
        if (!letter) return

        game.guessLetter(letter)

        for (let r in reaction.message.reactions) {
            if (r.count > 1) r.remove()
        }

        let status = game.checkGame()

        reaction.remove()
        reaction.remove(user)

        let embed = game.getEmbed()
        if (status == 0) {
            embed.setDescription("``` you have lost this game. the word was '" + game.gethangword() + "'.```")
            reaction.message.edit({
                embed
            })
            game.creator.addHangMan("lost")
            game.stop()
        } else if (status == 2) {
            let gain = game.gethangword().length * 10

            if (!member.stats.hangman) member.stats.hangman = {
                gamesPlayed: 0,
                gamesWon: 0
            }
            game.creator.addCurrency(gain)
            game.creator.addHangman("won")
            embed.setDescription("``` you have won this game. Congratulations!```\n you have won " + gain + " " + config.currency + "!")
            reaction.message.edit({
                embed
            })
            game.stop()
        } else
        if (status == 1) {
            let embed = game.getEmbed()
            reaction.message.edit({
                embed
            })
        }


    } catch (e) {
        setTimeout(() => {
            throw "hangman.js - check : " + e
        })
    }
}

module.exports = {
    name: "hangman",
    spam: true,
    descr: "play a game of hangman",
    run: run,
    check: check
}

function findHMgame(name) {
    return activeHangmanGames.find(g => g.creator.name === name)
}

function getEmote(letter) {
    let i = alphabet.indexOf(letter)
    return emojiAlphabet[i]
}

function getLetter(emote) {
    let i = emojiAlphabet.indexOf(emote)
    return alphabet[i]
}
class Hangman {
    constructor(mem) {
        this.creator = mem
        do {
            let includesFL = false
            this.hangWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)]
            for (let letter of data.forbiddenLetters)
                if (this.hangWord.includes(letter)) includesFL = true
        }
        while ((this.hangWord.length < 4 || this.hangWord.length > 12) && includesFL)

        this.faults = 0
        this.usedLetters = []
        this.remainingLetters = []

        for (let letter of data.alphabet)
            this.remainingLetters[i] = letter

        this.guessedLetters = []

        for (let i = 0; i < this.hangword.length; i++)
            this.guessedLetters.push("_")
    }
    guessLetter(letter) {
        let rightguess = false

        if (this.usedLetters.includes(letter)) return

        let gLetters = this.getWordLetters()

        for (let i in gLetters) {
            if (gLetters[i] == letter) {
                this.guessedLetters[i] = letter
                rightguess = true
            }
        }
        if (!rightguess)
            this.faults++
            this.usedLetters.push(letter)

        this.remainingLetters = this.remainingLetters.filter(l => l != letter)
    }



    checkGame() {
        if (this.getguessedLetters() === this.hangWord) return "2" //won
        else if (this.faults >= img.length - 1) return "0" //lost
        else return "1" //ongoing
    }

    getguessedLetters() {
        return this.guessedLetters.join("").replace("_", "\\_ ")

    }
    getuLetters() {
        return "-> " + this.usedLetters.join(" ")

    }
    getremLetterA() {
        return this.remainingLetters
    }
    getWordLetters() {
        return this.hangWord.split("")
    }
    gethangword() {
        return this.hangWord
    }
    getname() {
        return this.creator.name
    }
    stop() {
        activeHangmanGames.filter(g => g.author.name != this.author.name);
    }
    getEmbed() {
        let embed = new Discord.RichEmbed()
            .setTitle(this.creator.name)
            .setColor(this.creator.color)
            .addField("Guess:", this.getguessedLetters(), true)
            .addField("Used letters:", this.getuLetters(), true)
            .setImage(config.hangman.img[this.faults])
            .setFooter("please wait untill the reaction are complete")
        return embed
    }
}
