const { MessageEmbed } = require('discord.js')
const db = require("quick.db");
module.exports = {
  name: 'report',
  description: 'Report a bug',
  run: async(client, message, args) => {
    const logsChannelID = db.get("logs_" + message.guild.id);
    const channel = client.channels.cache.get(logsChannelID);
    const query = args.join(" ");
    if(!query[0]) return message.reply("Veuillez nous préciser le bug que vous avez rencontré.");
    const embed = new MessageEmbed()
    .setTitle("Nouveau bug signalé !")
    .setColor("#303136")
    .setThumbnail(message.author.displayAvatarURL())
    .addFields(
      {name: 'Author', value: `${message.author.tag}`},
      {name: 'ID', value: `${message.author.id}`},
      {name: 'Guild', value: `${message.guild.name}`},
      {name: 'Bug', value: `${query}`}
      )
      message.reply({content: 'Merci de nous avoir signalé ce problème !'});
      channel.send({embeds: [embed]});
      
  }
}