const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const moment = require("moment")

module.exports = {
    name: 'userinfo',
    description: 'Information sur un utilisateur',
    permission: ['SEND_MESSAGES'],
    botPermission: ["CONNECT", "VIEW_CHANNEL", "SPEAK", "SEND_MESSAGES","USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'Mention a user',
            name: 'user',
            required: true,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const user = interaction.guild.members.cache.get(args[0]) || interaction.member;
        let stat = {
            online: "https://emoji.gg/assets/emoji/9166_online.png",
            idle: "https://emoji.gg/assets/emoji/3929_idle.png",
            dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
            offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
        }

        const roles = user.roles.cache.filter(s => s.id !== user.guild.id).map(role => role).join(", ")
        const whois = new MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(`${user.user.tag}`, user.user.avatarURL())
            .setThumbnail(user.user.avatarURL({ dynamic: true }))
            .addField(" A rejoint le :", moment(user.joinedAt).format("`LLLL`"))
            .addField(" Le compte a été créer le :", moment(user.user.createdAt).format("`LLLL`"))
            .addField(" Informations sur la personne :", `ID: \`${user.user.id}\`\nHashtag: \`${user.user.discriminator}\`\nBot: \`${user.user.bot}\`\nUser Delete: \`${user.deleted}\``)
            .setFooter(user.presence.status, stat[user.presence.status])

        let array = []

        if (user.presence.activities.length) {
            let data = user.presence.activities;
            for (let i = 0; i < data.length; i++) {
                let name = data[i].name || "None"
                let xname = data[i].details || "None"
                let zname = data[i].state || "None"
                let type = data[i].type
                array.push(`**${type}** : \`${name} : ${xname} : ${zname}\``)
                if (data[i].name === "Spotify") {
                    whois.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`)
                }
                whois.setDescription(array.join("\n"))
            }
        }

        interaction.followUp({ embeds: [whois] });
    }
}