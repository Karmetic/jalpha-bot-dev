const { SlashCommandBuilder } = require('@discordjs/builders');
const getLatestCommitMessage = require('../util/github.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('server-status')
    .setDescription('Get Status Live, IP, and Mod information.')
    ,
    
    async execute(interaction)
    {
        commitMessage = await getLatestCommitMessage()
        await interaction.reply(
            "---Fermi Server Mod Info---" +
            "\nLast Server Update:" +
            "\nLatest Repository Commit Message: " + commitMessage +
            "\n                                      " +
            "\nMods: https://github.com/Karmetic/jalpha-minecraft-server" +
            "\n                                      " +
            "\nServer IP: 6.tcp.ngrok.io:19490" +
            "\nServer Status: Live!"
            );
    }
}
