const client = require("../../index");
const {Client, Message, MessageEmbed} = require('discord.js')
const Discord = require('discord.js')
const db = require("quick.db");
module.exports = {
  name: 'ban',
  description: 'Ban an user',
  aliases: [],

  /**
   * 
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * 
   */
  
  run: async(client, message, args, member) => {
  if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply({content: 'Vous n\'êtes pas autorisé à l\'utiliser ! Permis requis :\`BAN MEMBER\`', allowedMentions: {repliedUser: false}})
  if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply({content: 'Je n\'ai pas les autorisations requises, veuillez m\'accorder les autorisations nécessaires ! Permis requis :\`BAN MEMBERS\`', allowedMentions: {repliedUser: false}})
  const target = message.mentions.members.first() ||message.guild.members.cache.get(args[0]) 
  const reason = args.slice(1).join(" ") || 'Aucune raison n\'a été spécifiée'
  
  if(!target) return message.reply({content: 'Veuillez spécifier un utilisateur à bannir !', allowedMentions: {repliedUser: false}})

  if(target.id === message.author.id) return message.reply({content: 'Vous ne pouvez pas vous interdire smh!', allowedMentions: {repliedUser: false}})
  if(target.id === message.guild.ownerId) return message.reply({content: 'Vous ne pouvez pas bannir le propriétaire du serveur ! *Imaginez essayer d\'interdire le propriétaire Lmaoo**', allowedMentions: {repliedUser: false}})
  if(target.id === client.user.id) return message.reply({content: 'Merci de ne pas me bannir :worried:', allowedMentions: {repliedUser: false}})
  if(target.roles.highest.position >= message.member.roles.highest.position) return message.reply({content: 'Vous ne pouvez pas bannir cet utilisateur car son rôle est supérieur au vôtre !', allowedMentions: {repliedUser: false}})

  if(!target.bannable) return message.reply({content: 'Je ne peux pas bannir cet utilisateur en raison de la hiérarchie des rôles ! S\'il vous plaît vérifier ma position de rôle!', allowedMentions: {repliedUser: false}})
  
  try{
    const logsChannelID = db.get("logs_" + message.guild.id);
  target.send(`Vous avez été banni de **${message.guild.name}** Raison: ${reason}`).catch((e) => {
    client.channels.cache.get(logsChannelID).send({content: `Impossible d'envoyer un dm à cette personne ${target.user.tag} ! ${message.author}`, allowedMentions: {repliedUser: false}})
  })

  target.ban({ reason });

  message.reply({content: `Banni avec succès **${target.user.tag}**`, allowedMentions: {repliedUser: false}})
  const embedban = new Discord.MessageEmbed()
  .setColor('#303136')
  .setDescription(`**${target.user.tag}** Vien d'être banni par : ${message.author}`)
  client.channels.cache.get(logsChannelID).send({embeds: [embedban]});
  }
   catch(e) {
    return message.reply({content: `Quelque chose s'est mal passé ! Si vous pensez qu'il s'agit d'un bogue, veuillez le signaler à nos développeurs en rejoignant notre serveur d'assistance ! \nError msg:\n${e}`})
  }
  }
}