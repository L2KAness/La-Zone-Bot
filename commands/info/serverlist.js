const Discord = require("discord.js");

module.exports = {
    name: "serverlist",
    description: 'Permet de voir la liste des serveurs où est présent le bot',
    aliases: ["svl", "svlist"],
  run: async (client, message, args) => {
      let i0 = 0;
      let i1 = 10;
      let page = 1;

      let description =
        `Nombre total de serveurs joints - ${client.guilds.cache.size}\n\n` +
        client.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Member \ ID - ${r.id}`)
          .slice(0, 10)
          .join("\n\n");

      let embed = new Discord.MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL({dynamic : true}))
        .setFooter(`Page - ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
        .setDescription(description);

      let msg = await message.channel.send({embeds: [embed]});

      await msg.react("⬅");
      await msg.react("➡");
      await msg.react("❌");

      const filter = (reaction, user) => user.id === message.author.id && !user.bot
      const collector = msg.createReactionCollector(
        { filter }
      );

      collector.on("collect", async (reaction, user) => {
        if (reaction._emoji.name === "⬅") {

          i0 = i0 - 10;
          i1 = i1 - 10;
          page = page - 1;

          if (i0 + 1 < 0) {
            console.log(i0)
            return msg.delete();
          }
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `Nombre total de serveurs joints - ${client.guilds.cache.size}\n\n` +
            client.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map(
                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Member \ ID - ${r.id}`)
              .slice(i0, i1)
              .join("\n\n");

          embed
            .setFooter(
              `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
            )
            .setDescription(description);


          msg.edit({embeds: [embed]});
        }

        if (reaction._emoji.name === "➡") {

          i0 = i0 + 10;
          i1 = i1 + 10;
          page = page + 1;

          if (i1 > client.guilds.cache.size + 10) {
            return msg.delete();
          }
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `Nombre total de serveurs joints - ${client.guilds.cache.size}\n\n` +
            client.guilds.cache
              .sort((a, b) => b.memberCount - a.memberCount)
              .map(r => r)
              .map(
                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Member \ ID - ${r.id}`)
              .slice(i0, i1)
              .join("\n\n");
          embed
            .setFooter(
              `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
            )
            .setDescription(description);
          msg.edit({embeds: [embed]});
        }

        if (reaction._emoji.name === "❌") {
          return msg.delete();
        }
        await reaction.users.remove(message.author.id);
      });
  }
};