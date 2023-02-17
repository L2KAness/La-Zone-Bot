const Discord = require("discord.js");
const QuickDB = require("quick.db");

module.exports = {
  name: "setbienvenue",

    description: "Définit le canal des journaux du serveur.",
    usage: "<canal>",
    aliases: ["set-bienvenue"],

  /**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 * 
 */
  run: async ( client, message, args ) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.reply("Vous n'avez pas les permissions nécessaires pour exécuter cette commande.");

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!channel) return message.reply("Veuillez spécifier un canal valide.");

    QuickDB.set("bien_" + message.guild.id, channel.id);
    message.reply(`Le canal des bienvenue a été défini avec succès sur ${channel}`);
  },
};
