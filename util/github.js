async function getLatestCommit() {
    const url = 'https://api.github.com/repos/Karmetic/jalpha-minecraft-server/commits';
    const response = await fetch(url);
    const commits = await response.json();
    const commit = commits[0]
    return commit
}

module.exports = getLatestCommit;