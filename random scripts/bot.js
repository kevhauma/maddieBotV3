const Discord = require('discord.js')

module.exports.start = (token) => {

    const client = new Discord.Client()

    client.on('ready', () => {
        let g = client.guilds.first()
        console.log('{"guild":"' + g.id + '","token": "' + token+'"},')
    })

    client.login(token).catch((err) => {
        console.log(err)
    })


}
