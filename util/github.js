async function getLatestCommitMessage() {
    const url = 'https://api.github.com/repos/Karmetic/jalpha-minecraft-server/commits';
    const response = await fetch(url);
    const commits = await response.json();
    const latestCommitMessage = commits[0].commit.message;
    return latestCommitMessage;
}
