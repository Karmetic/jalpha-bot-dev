require('dotenv').config();

const {REST} = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

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

client.on("ready", () => {
    //Get Ids of the servers
    const guild_ids = client.guilds.cache.map(guild => guild.id);

    const rest = new REST({version: '9'}).setToken(process.env.TOKEN);
    
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

client.on("message", (message) => {
    if (message.content === 's') {
        const channel = client.channels.cache.get('1000942079360368714');

        channel.send(
        "---Fermi Server Mod Info---" +
        "Last Server Update:" +
        "3/14/2023 - Optional Mods Folder Added" +
        "                                      " +
        "Mods: https://github.com/Karmetic/jalpha-minecraft-server" +
        "                                      " +
        "Server IP: 4.tcp.ngrok.io:12527" +
        "Server Status: Live!"
        ).catch(console.error);
    }
});

client.login(process.env.TOKEN);