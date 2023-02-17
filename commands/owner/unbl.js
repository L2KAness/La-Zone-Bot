const client = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "unblacklist",
  aliases: [],
  description: "Annuler la liste noire d'un utilisateur du serveur",
  usage: "unblacklist <user ID>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args   
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.reply("Vous n'êtes pas autorisé à débannir des membres");

    let targetId = args[0];
    if (!targetId || isNaN(targetId))
      return message.reply("Veuillez fournir un ID utilisateur valide pour supprimer la liste noire");

    let target;
    try {
      target = await client.users.fetch(targetId);
    } catch (e) {
      return message.reply("Impossible de trouver l'utilisateur avec cet ID");
    }

    try {
      await message.guild.members.unban(target);

      // remove the blacklisted user's ID from the blacklist file
      fs.readFile("blacklist.json", (err, data) => {
        if (err) throw err;
        let blacklist = JSON.parse(data);
        let index = blacklist.indexOf(target.id);
        if (index === -1) return message.reply("Cet utilisateur n'est pas sur la liste noire");
        blacklist.splice(index, 1);
        fs.writeFile("blacklist.json", JSON.stringify(blacklist), (err) => {
          if (err) throw err;
        });
      });

      message.channel.send(`${target.tag} a été retirer de la liste noire`);
    } catch (e) {
        console.error(e);
        message.channel.send(`Erreur lors de la suppression de la liste noire ${target.tag}`);
      }
    },
  };
