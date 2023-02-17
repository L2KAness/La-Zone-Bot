const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "unban",
    description: "unban a user",
    userPermissions: ["BAN_MEMBERS"],
    options: [
        {
            name: "userid",
            description: "userid that you want to unban",
            type: "STRING",
            required: true
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {
        const userID = interaction.options.getString("userID");

        interaction.guild.members
            .unban(userID)
            .then((user) => {
                interaction.followUp({
                    content: `${user.tag} as been unbanned from the server!`,
                })
            })
            .catch(() => {
                interaction.followUp({
                    content: "Please specify a valid banned member's id"
                })
            })
    }       
};