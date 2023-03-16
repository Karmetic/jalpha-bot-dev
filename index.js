const getLatestCommitMessage = require('./util/github.js')

require('dotenv').config();

commitMessage = ""
const {REST} = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const axios = require('axios').default;

const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]
});

//List of Commands
const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles)
{
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

client.on("ready", async() => {
    commitMessage = await getLatestCommitMessage()
    setInterval(() => {
        commitMessage = getLatestCommitMessage()
    }, 1800000);
    //Get Ids of the servers
    const guild_ids = client.guilds.cache.map(guild => guild.id);

    const rest = new REST({version: '9'}).setToken(process.env.token);
    
    for (const guildId of guild_ids) 
    {
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), 
            {body: commands})
        .then(() => console.log('Succesfully updated commands for guild ' + guildId))
        .catch(console.error);
    }
});

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try {
        await command.execute(interaction);
    }
    catch(e)
    {
        console.error(e);
        await interaction.reply({content: "There was an error executing the command"});
    }
});

client.on("messageCreate", (message) => {
    if (message.content === '!server-status') {
        const channel = client.channels.cache.get('1000942079360368714');

        channel.send(
        "---Fermi Server Mod Info---" +
        "\nLast Server Update:" +
        "\n3/14/2023 - Optional Mods Folder Added" +
        "\n                                      " +
        "\nMods: https://github.com/Karmetic/jalpha-minecraft-server" +
        "\n                                      " +
        "\nServer IP: 4.tcp.ngrok.io:12527" +
        "\nServer Status: Live!" +
        "\n\nLatest Repository Commit Message: " + commitMessage
        ).catch(console.error);
    }

    if (message.content === "!server-ip") {
        const channel = client.channels.cache.get('1000942079360368714');

        axios({
            method: 'get',
            url: 'http://localhost:4040/api/tunnels',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response => {
            console.log(response.data);
          });

        //channel.send(ipData);
    }
});

client.login(process.env.token);