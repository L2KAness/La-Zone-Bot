const Discord = require("discord.js");
const QuickDB = require("quick.db");

module.exports = {
  name: "setstaff",

    description: "Définit le canal des journaux du serveur.",
    usage: "<canal>",
    aliases: ["setstf"],


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

    const roles = message.mentions.roles.first();
    if (!roles) return message.reply("Veuillez spécifier un canal valide.");

    QuickDB.set("rolestaff_" + message.guild.id, roles.id);
    message.reply(`Le canal des bienvenue a été défini avec succès sur ${roles}`);
  },
};
