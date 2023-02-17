const { Client } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "staff",
    aliases: [],
    description: "Add or remove members as staff members",
    usage: "staff add|remove|list @user",

    run: async (client, message, args) => {
      const subcommand = args[0];
      const target = message.mentions.users.first();
      const roles = db.get("rolestaff_" + message.member.guild.id);
      if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.reply("Vous n'avez pas les permissions nécessaires pour exécuter cette commande.");

      if (subcommand === "add") {
        if (!target) return message.reply("Veuillez mentionner un utilisateur pour l'ajouter en tant que membre du personnel");
        await db.set(`staff_${target.id}`, true);
        message.channel.send(`${target.tag} a été ajouté en tant que membre du personnel`);
        message.guild.members.cache.get(target.id).roles.add(roles);
      } else if (subcommand === "remove") {
        if (!target) return message.reply("Veuillez mentionner un utilisateur pour le retirer en tant que membre du personnel");
        await db.delete(`staff_${target.id}`);
        message.channel.send(`${target.tag} a été retiré en tant que membre du personnel`);
        message.guild.members.cache.get(target.id).roles.remove(roles);
      } else if (subcommand === "list") {
        const staff = [];
        const staffs = await db.all();
        for (const staff of staffs) {
          if (staff && staff.key && staff.key.startsWith("staff_")) {
            const user = await client.users.fetch(staff.key.replace("staff_", ""));
            staff.push(user.tag);
          }
        }
        if (staff.length > 0) {
          message.channel.send(`Membres du personnel : ${staff.join(", ")}`);
        } else {
          message.channel.send("Aucun membre du personnel trouvé");
        }
      } else {
        message.reply("Veuillez spécifier une sous-commande valide : add, remove ou list");
      }
    }    
};
