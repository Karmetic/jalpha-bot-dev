var msu = require('minecraft-server-util');

async function getServerStats(address, port) {
    return new Promise((resolve) => {
        msu.queryFull(address, port)
        .then((result) => resolve(result))
        .catch((e) => console.log(e));
    })
}

module.exports = getServerStats;