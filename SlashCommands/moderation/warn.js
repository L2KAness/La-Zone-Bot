const warnModel = require("../../models/warnModel")
const {
    Client,
    CommandInteraction,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
//define above

//code
module.exports = {
    name: "warn",
    description: "warns a user",
    options: [
        {
            name: "user",
            description: "warns a user",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "reason for this warn",
            type: "STRING",
            required: false,
        },
    ],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client , interaction , args) => {
        //options
        const member = interaction.options.getMember("user")
        const reason = interaction.options.getString('reason') || 'No reason'

        //perms check
        if (member.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.followUp({content: 'I cannot warn this user as their highest role is higher than mine or I have the same highest role as them.', ephemeral: true})

        if (member.id === interaction.guild.ownerId) return interaction.followUp({content: 'I cannot warn the owner of the server.', ephemeral: true})

        if (member.id === interaction.user.id) return interaction.followUp({content: 'You cannot warn yourself.', ephemeral: true})

        if (member.id === interaction.guild.me.id) return interaction.followUp({content: 'I cannot warn myself.', ephemeral: true})

        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.followUp('You  Don\'t Have The Permission to use this command')

        const e = new MessageEmbed()
        e.setDescription(`Are you sure you want to warn ${member.user.username}?`)
        e.setColor('BLUE')
        const components = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('YES')
                .setLabel('Yes')
                .setStyle('SUCCESS'),

            new MessageButton()
                .setCustomId('NO')
                .setLabel('No')
                .setStyle('DANGER')
        )
        const msg = await interaction.followUp({embeds: [e], components: [components], fetchReply: true})
        const filter = (i) => i.user.id === interaction.user.id
        const collector = msg.channel.createMessageComponentCollector({
            filter,
            time: 20000,
        })
        const e2 = new MessageEmbed()
        e2.setDescription(`✅ User has been warned\n\nUser: ${member.user.tag}\nModerator: ${interaction.user.tag}\nReason: \`${reason}\` `)
        e2.setColor('GREEN')

        const e3 = new MessageEmbed()
        e3.setDescription('❌ | Action was canceled!')
        e3.setColor('RED')

        collector.on('collect', async (i) => {
            if(i.customId === 'YES') {
                interaction.editReply({embeds: [e2], components: []})

                new warnModel({
                    userId: member.id,
                    guildId: interaction.guildId,
                    moderatorId: interaction.member.id,
                    reason,
                    timestamp: Date.now()
                }).save();

                collector.stop('success')

            } else if(i.customId === 'NO') {
                interaction.editReply({embeds: [e3], components: []})
                collector.stop('success')
            }
        })
        const e4 = new MessageEmbed()
        e4.setDescription('You took too much time! timed out')
        e4.setColor('RED')
        collector.on('end', async (ignore, error) => {
            if(error && error !== 'success') {
                interaction.editReply({embeds: [e4], components: []})
            }
            collector.stop('success')
        })
    }
}