var ms = require('minestat')

async function getServerStats(address, port) {
    return new Promise((resolve, reject) => {
        ms.init(address, port, function (result) {
            resolve(result);
        });
    })
}

module.exports = getServerStats;