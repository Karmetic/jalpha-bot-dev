const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('install-sex-mod')
    .setDescription('Holden needed this.')
    ,
    
    async execute(interaction)
    {
        await interaction.reply('Shut the fuck up');
    }
}
