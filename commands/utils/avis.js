const { MessageEmbed } = require('discord.js')
const db = require("quick.db");
module.exports = {
  name: 'avis',
  description: 'Donnez un avis !',
  run: async(client, message, args) => {
    const avisChannelID = db.get("avis_" + message.guild.id);
    const channel = client.channels.cache.get(avisChannelID);
    const query = args.join(" ");
    if(!query[0]) return message.reply("Please give a valid feedback (text)");
    const embed = new MessageEmbed()
    .setTitle("UN NOUVEAU AVIS !")
    .setColor("303136")
    .addFields(
      {name: 'De :', value: `${message.author.tag}`, inline: true},
      {name: 'Pour :', value: `${message.guild.name}`, inline: true},
      {name: 'Avis :', value: `${query}`, inline: true}
      )
      message.reply({content: 'Merci d\'avoir poseter un avis !'});
      channel.send({embeds: [embed]});
      
  }
}