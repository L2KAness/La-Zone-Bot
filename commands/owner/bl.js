const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "blacklist",
  aliases: ["bl"],
  description: "Blacklist un utilisateur de tous les serveurs où le bot est présent",
  usage: "blacklist @user",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args   
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.reply("Vous n'êtes pas autorisé à mettre des membres dans la blacklist");

    let target = message.mentions.members.first();
    if (!target) return message.reply("Veuillez mentionner un utilisateur sur la blacklist");

    if (!target.bannable) {
      return message.reply("Je ne peux pas mettre cet utilisateur sur la blacklist");
    }

    fs.readFile("blacklist.json", (err, data) => {
      if (err) throw err;
      let blacklist = JSON.parse(data);
      if (blacklist.includes(target.id))
        return message.reply("Cet utilisateur est déjà sur la blacklist");
      blacklist.push(target.id);
      fs.writeFile("blacklist.json", JSON.stringify(blacklist), (err) => {
        if (err) throw err;
      });
    });

    try {
      await target.ban();
      message.channel.send(`${target.user.tag} a été mis sur la blacklist`);
    } catch (e) {
      console.error(e);
      message.channel.send(`Erreur de la blacklist ${target.user.tag}`);
    }
  }
};
