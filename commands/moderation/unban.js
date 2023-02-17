const client = require("../../index");
const {Client, Message, MessageEmbed} = require('discord.js')
const Discord = require('discord.js')
const db = require("quick.db");
module.exports = {
  name: 'unban',
  description: 'Unban a banned user',
  aliases: [],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args   
   */
  run: async(client, message, args) => {
    if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply({content: 'Vous n\'êtes pas autorisé à l\'utiliser ! Permis requis :\`BAN MEMBERS\`', allowedMentions: {repliedUser: false}})
    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply({content: 'Je n\'ai pas les autorisations requises, veuillez m\'accorder les autorisations nécessaires ! Permis requis :\`BAN MEMBERS\`', allowedMentions: {repliedUser: false}})
    const uid = args[0]
    const reason = args.slice(1).join(" ") || 'Aucune raison fournie'

    if(!uid) return message.reply({content: 'Veuillez fournir un ID utilisateur valide!', allowedMentions: {repliedUser: false}})
    if(isNaN(uid)) return message.reply({content: 'L\'ID utilisateur doit être un nombre!', allowedMentions: {repliedUser: false}})
    if(uid === message.author.id) return message.reply({content: 'Ah sérieux ? Vous n\'êtes même pas banni de ce serveur smh !', allowedMentions: {repliedUser: false}})
    if(uid === message.guild.ownerId) return message.reply({content: 'Oh mon dieu, le propriétaire ne peut pas être banni, alors s\'il vous plaît, n\'essayez jamais de les bannir ou de les débannir lmao', allowedMentions: {repliedUser: false}})
    if(uid === client.user.id) return message.reply({content: 'Je ne suis pas banni ! **Vous sus**', allowedMentions: {repliedUser: false}})

    message.guild.members
    .unban(uid, reason)
    .then((user) => {
      message.reply({content: `Débanni avec succès **${user.tag}**!`, allowedMentions: {repliedUser: false}})
      const logsChannelID = db.get("logs_" + message.guild.id);
      const embedkick = new Discord.MessageEmbed()
      .setColor('#303136')
      .setDescription(`**${user.tag}** Vien d'être débanni par : ${message.author}`)
      client.channels.cache.get(logsChannelID).send({embeds: [embedkick]})
    })
    .catch((e) => {
      message.reply({content: `L'utilisateur n'est pas banni !`, allowedMentions: {repliedUser: false}})
    })
  }
}