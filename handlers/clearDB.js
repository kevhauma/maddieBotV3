const mh = require("./memberHandler")
const config = require("../data/config.json")

async function clearGuild(guild) {
    let members = await mh.getMembers(guild)
    for (let m in members) {
        await mh.deleteMember(members[m],guild)
    }

}


async function run() {
    for (let s in config.servers) {        
         await clearGuild(config.servers[s])
    }
}


module.exports = {
    run
}
