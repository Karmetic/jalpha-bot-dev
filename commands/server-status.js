const { SlashCommandBuilder } = require('@discordjs/builders');
const getLatestCommit = require('../util/github.js')
const getServerStats = require('../util/server.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('server-status')
    .setDescription('Get Status Live, IP, and Mod information.')
    ,
    
    async execute(interaction)
    {
        commit = await getLatestCommit()
        server = await getServerStats('6.tcp.ngrok.io', 19490)
        serverStatus = server.online == true ? "Live" : "Offline" 

        await interaction.reply(
            "---Fermi Server Mod Info---" + "\n" + 
            "\nLast Server Update:" + commit.commit.author.date + 
            "\nLatest Repository Commit Message: " + commit.commit.message +
            "\n" +
            "\nMods: https://github.com/Karmetic/jalpha-minecraft-server" + "\n" + 
            "\n" +
            "Server Information:" + 
            "\n---Server IP: " + server.hostIP + ":" + server.hostPort + 
            "\n---Server Version: " + server.version + 
            "\n---Server MOTD: " + server.motd +
            "\n---Server Latency: " + server.latency + 
            "\n---Server Players: " + server.players.online + "/" + server.players.max + 
            "\n---Players Online: " + server.players.list +
            "\n---Server Status: " + serverStatus
            
            
            // "\nServer IP (Updated 12:00 AM 3/17/2022): 2.tcp.ngrok.io:18323" +
            // "\nServer Status: Live!"
            );
    }
}
