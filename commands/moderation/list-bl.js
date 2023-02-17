const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "list-blacklist",
  aliases: [],
  description: "List all blacklisted users",
  usage: "list-blacklist",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.reply("Vous n'êtes pas autorisé à afficher la liste noire");
    }

    fs.readFile("blacklist.json", (err, data) => {
      if (err) {
        console.error(err);
        return message.channel.send("Erreur lors de la lecture du fichier de liste noire");
      }

      let blacklist = JSON.parse(data);

      let blacklistedUsers = [];
      blacklist.forEach((userId) => {
        let user = client.users.cache.get(userId);
        if (user) blacklistedUsers.push(user.tag);
      });

      if (blacklistedUsers.length === 0) {
        return message.channel.send("Aucun utilisateur n'est sur la liste noire");
      }

      message.channel.send(`Utilisateurs sur liste noire: ${blacklistedUsers.join(", ")}`);
    });
  },
};
