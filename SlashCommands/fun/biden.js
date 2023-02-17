const { MessageEmbed, CommandInteraction } = require("discord.js")
module.exports = {
name : "biden",
description: 'Biden Tweet',
  options: [
      {
          name: 'text',
          description: 'The Text To Tweet',
          type: 'STRING',
          required: true
      }
  ],


run : async (client, interaction, args) => {
const sentence = args.join(" ")

  let embed = new MessageEmbed()
    .setImage(`https://api.popcat.xyz/biden?text=${encodeURIComponent(sentence)}`)
    .setColor('#303136')
  interaction.followUp({ embeds: [embed] })
}
}