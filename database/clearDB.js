const mh = require("../handlers/memberHandler")
const config = require("../data/config.json")

async function clearGuild(guild) {
    let members = await mh.getMembers(guild)
    for (let m of members) {
        console.log("deleting " + m.name + " from " + guild)
        await mh.deleteMember(m,guild)
    }

}


async function run() {
    for (let s of config.servers) {
        s=s.guild
        if(s !== 'settings')
         await clearGuild(s)
    }
}


module.exports = {
    run
}
