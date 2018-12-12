let activeHLGames = []
let config = require("../data/config.json")
let mH = require("../handlers/memberHandler")
let cardLinks = [
        ["https://i.imgur.com/L153PAB.png", "https://i.imgur.com/dFa7Odn.png", "https://i.imgur.com/vLoWTU1.png", "https://i.imgur.com/UdJ9r6Y.png", "https://i.imgur.com/EW5mUKy.png", "https://i.imgur.com/ueNjAUe.png", "https://i.imgur.com/gNjDyUx.png", "https://i.imgur.com/ErBu5dM.png", "https://i.imgur.com/wpG1TTP.png", "https://i.imgur.com/AwAck4B.png", "https://i.imgur.com/ZN2hXYL.png", "https://i.imgur.com/ISgGXjC.png", "https://i.imgur.com/GufwcNy.png"]
        ,
        ["https://i.imgur.com/DukEboO.png", "https://i.imgur.com/FrBPW5J.png", "https://i.imgur.com/ILeFSkh.png", "https://i.imgur.com/TASnAQC.png", "https://i.imgur.com/uWknRBZ.png", "https://i.imgur.com/c3gcWuY.png", "https://i.imgur.com/4813h2n.png", "https://i.imgur.com/ssGn1xc.png", "https://i.imgur.com/iP4q2oq.png", "https://i.imgur.com/NguoASJ.png", "https://i.imgur.com/ocgGONt.png", "https://i.imgur.com/qX4Siur.png", "https://i.imgur.com/3ldkoZ6.png"]
        ,
        ["https://i.imgur.com/G8sTG2Z.png", "https://i.imgur.com/IaYso3c.png", "https://i.imgur.com/WvCZD63.png", "https://i.imgur.com/hWbWuzy.png", "https://i.imgur.com/c4Eq0Bh.png", "https://i.imgur.com/uWrznDU.png", "https://i.imgur.com/mZqIcbM.png", "https://i.imgur.com/ynJlDGP.png", "https://i.imgur.com/fc3v7FF.png", "https://i.imgur.com/BG4BOTm.png", "https://i.imgur.com/s2C9jWh.png", "https://i.imgur.com/fFwITf2.png", "https://i.imgur.com/euXhh8G.png"]
        ,
        ["https://i.imgur.com/LQKVoBg.png", "https://i.imgur.com/uKpClSO.png", "https://i.imgur.com/2Rnk7WT.png", "https://i.imgur.com/cjWfrXH.png", "https://i.imgur.com/l1rTuXf.png", "https://i.imgur.com/bpdpFJB.png", "https://i.imgur.com/7dIfqgJ.png", "https://i.imgur.com/tjOAJIq.png", "https://i.imgur.com/wjbulpo.png", "https://i.imgur.com/SHjRLfv.png", "https://i.imgur.com/jBQlQKM.png", "https://i.imgur.com/plUOF38.png", "https://i.imgur.com/Dl8xBgN.png"]
    ]

let run = async function (message) {
    let isAllowed = false
    let player = await mH.getMemberByID(message.member.id)

    let amountReg = message.content.match(/ [0-9]+| all/i)
    let amount
    if (amountReg)
        amount = amountReg[0].trim()

    if (!amount) {
        amount = 0
    }
    if (amount == "all") {
        amount = member.currency.points

    }
    if (amount)
        player.subtractCurrency(amount)

    let game = findHLgame(message.member.displayName)

    if (game) {
        game.stop()
    }

    game = new HighLow(player, amount)
    activeHLGames.push(game)

    let card = game.getCard()
    let embed = game.getEmbed(card)

    let m = await message.channel.send({
        embed
    })

    await m.react("🔺")
    setTimeout(() => {
        Rmessage.react("🔻")
    }, 250)

    function findHLgame(name) {
        for (let i = 0; i < activeHLGames.length; i++) {
            if (activeHLGames[i].getname() === name) {
                return activeHLGames[i]
            }
        }
        return null
    }
}




let check = function (Discord, client, reaction, user, currencyMembers) {
    if (reaction.message.channel.name !== config.botSpamChat) return
    if (reaction.message.author.id !== client.user.id) return
    if (user.id === client.user.id) return
    if (!reaction.message.embeds[0]) return
    let game = findHLgame(reaction.message.embeds[0].title)
    if (!game) return
    let embed
    let r
    if (reaction.emoji.name === "🔺") {
        r = game.checkGame("high")
    }
    if (reaction.emoji.name === "🔻") {
        r = game.checkGame("low")
    }
    if (r == 1) {
        embed = game.getEmbed()
    } else {
        embed = game.getEmbed()
        embed.setDescription("```you have won " + (game.bet * game.multiplier) + " " + config.currency + "```")
        let member = findMember(user, currencyMembers)
        changeCurrency(member, "add", (game.bet * game.multiplier))
        member.stats.highlow.gamesWon = member.stats.highlow.gamesWon + 1
        if (member.stats.highlow.highestMultiplier < game.multiplier) member.stats.highlow.highestMultiplier = game.multiplier
        reaction.message.react("❌").catch(err => {
            console.log(err.message)
        })
        game.stop()
    }
    reaction.remove(user)
    reaction.message.edit({
        embed
    })


}

module.exports = {
    name: "highlow",
    spam: true,
    descr: "play a card game of high-low",
    run: run,
    check: check
}

function findHLgame(name) {
    return activeHLGames.find(g=>g.creator.name === name)
}

class HighLow {
    constructor(player, bet) {
        this.creator = player
        this.remainingCards = []
        
        for (let set of cardLinks.length) {
            for (let j = 0; j < set.length; j++) {
                this.remainingCards.push(new Card(j + 1, set[j]))
            }
        }
        this.previousCard = {}
        this.multiplier = 0
        this.bet = bet

    }
    getCard() {
        //getNextCard
        let card = this.remainingCards[Math.floor(Math.random() * this.remainingCards.length)]
        //remove that card from the deck
        this.remainingCards = this.remainingCards.filter(c => c != card)
        //set it as previousq
        this.previousCard = card
        return card
    }
    checkGame(highlow) {
        let prevCard = this.previousCard
        let newCard = this.getCard()
        if (this.remainingCards.length == 0) return 0
        if (newCard.getValue() == prevCard.getValue()) {
            return 1
        }
        if (highlow === "high") {
            if (newCard.getValue() > prevCard.getValue()) {
                this.multiplier = this.multiplier + 0.5
                return 1
            } else return 0

        } else if (highlow === "low") {
            if (newCard.getValue() < prevCard.getValue()) {
                this.multiplier = this.multiplier + 0.5
                return 1
            } else return 0

        }
    }
    getname() {
        return this.creator.name
    }
    getid() {
        return this.creator.id
    }

    stop() {
        const index = activeHLGames.indexOf(this);
        if (index !== -1) {
            activeHLGames.splice(index, 1);
        }
    }
    getEmbed() {
        let embed = new Discord.RichEmbed()
            .setTitle(this.creator.name)
            .setColor(this.creator.color)
            .setDescription("``` HIGHER OR LOWER```")
            .addField("Bet:", this.bet, true)
            .addField("Multiplier:", this.multiplier, true)
            .setImage(this.previousCard.getImg())
            .setFooter("click up for higher and down for lower")
        return embed
    }

}
class Card {
    constructor(value, img) {
        this.value = value
        this.img = img
    }
    getValue() {
        return this.value
    }
    getImg() {
        return this.img
    }
}
