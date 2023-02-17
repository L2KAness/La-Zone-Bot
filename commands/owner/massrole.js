const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord.js');
const ms = require("ms")
getNow = () => { return { time: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };
module.exports = {
    name: 'massrole',
    description: 'Permet de add/remove un rôle à tout les membres du serveur',
      /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args   
   */
    run: async (client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR"))
        return message.reply("Vous n'avez pas les permissions nécessaires pour exécuter cette commande.");
  

            if (args[0] === "add") {
                const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                if (!role) return message.channel.send(`Aucun rôle trouver pour \`${args[1] || " "}\``)
             let count = 0
                message.channel.send(`Je suis entrain d'ajouté le rôle \ ${role}\ à ${message.guild.memberCount} utilisateur...`)
                message.guild.members.cache.forEach(member => setInterval(() => {
                   count++
                    if (member) member.roles.add(role, `Masiverole par ${message.author.tag}`).catch()
                    if(count === message.guild.memberCount)  return message.channel.send(`✅\`${getNow().time}\` 1 rôle ajouté à ${message.guild.memberCount} ${message.guild.memberCount > 1 ? 'membres' : 'membre'}`);
                }), 250)
            

            } else if (args[0] === "remove") {
                const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                if (!role) return message.channel.send(`Aucun rôle trouver pour \`${args[1] || " "}\``)

                message.channel.send(`Je suis entrain d'enlevé le rôle \ ${role}\ à ${message.guild.memberCount} utilisateur...`)
                message.guild.members.cache.forEach(member => setInterval(() => {
                    count++
                    if (member) member.roles.remove(role, `Masiverole par ${message.author.tag}`).catch()
                    if(count === message.guild.memberCount)  return message.channel.send(`✅\`${getNow().time}\` 1 rôle enlevé à ${message.guild.memberCount} ${message.guild.memberCount > 1 ? 'membres' : 'membre'}`);

                }), 250);


        }

    }
}