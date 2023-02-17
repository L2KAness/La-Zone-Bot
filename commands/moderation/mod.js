const {Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')

module.exports = {
name: 'moderate',
description: 'Moderate a user',
aliases: ["mod"],
permis: ['KICK_MEMBERS', 'BAN_MEMBERS'],
botPerms: ['KICK_MEMBERS', 'BAN_MEMBERS'],
dev: false,
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 * @param {MessageEmbed} embed
 */
run: async (client, message, args, embed, guildQueue) => {
    const member = message.mentions.members.first()
    if (!member) return             message.channel.send('Please mention a valid user to moderate')

    if (member.roles.highest.position >= message.member.roles.highest.position) return             message.channel.send('You cannot moderate this user because they are higher than you.')
    if (member.roles.highest.position >= message.guild.me.roles.highest.position) return             message.channel.send('I cannot moderate this user because they are higher than me.')
    if (member.id === message.member.id) return             message.channel.send('You cannot moderate yourself.')
    if (member.id === message.guild.me.id) return             message.channel.send('I cannot moderate myself.')
    let reason = args.slice(1).join(' ') || 'no reason'

    const kButton = new MessageButton().setCustomId('kick').setLabel('Kick').setStyle('DANGER')
    const banButton = new MessageButton().setCustomId('ban').setLabel('Ban').setStyle('DANGER')

    let row = new MessageActionRow().addComponents(kButton, banButton)
    const collector = message.channel.createMessageComponentCollector({componentType: 'BUTTON', time: 30000})
                  message.channel.send({content: 'Select an action to perform.', components: [row]})

    collector.on('collect', async (m) => {
        if (m.customId === 'kick') {
            member.kick({reason: reason || 'No Reason Specified.'})
            kButton.setDisabled(true)
            banButton.setDisabled(true)
            row = new MessageActionRow().addComponents(kButton, banButton)
            m.update({content: `${member.user.tag} has been kicked for ${reason}`, components: [row]})
        }
        if (m.customId === 'ban') {
            member.ban({reason: reason || 'No reason specified.'})
            kButton.setDisabled(true)
            banButton.setDisabled(true)
            row = new MessageActionRow().addComponents(kButton, banButton)
            m.update({content: `${member.user.tag} has been banned for ${reason}`, components: [row]})
        }
    })
}
}