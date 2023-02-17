const { SlashCommandBuilder } = require('@discordjs/builders')
const { CommandInteraction } = require('discord.js')

module.exports = {

    ...new SlashCommandBuilder()
    .setName("say")
    .setDescription("the bot will repeat what you saying")
    .addStringOption((option) => 
        option
            .setName("message")
            .setDescription("what the bot is gonna say")
            .setRequired(true)
    ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const MessageToSend = interaction.options.getString('message')
        interaction.followUp({ content: MessageToSend})
    }

}