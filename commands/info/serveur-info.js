const { Discord, MessageEmbed } = require('discord.js');
const moment = require('moment')

module.exports = {
  
  name: "serverinfo",
  category: "🔰 Information",
  permissions: ["SEND_MESSAGES"],
  aliases: ["serverinfo", "server"],
  usage: "serverinfo",
  description: "Affiche des informations sur un serveur",  

  run: async (client, message, args) => {
    try {
      

    const channels = message.guild.channels.cache;
    message.guild.owner = await message.guild.fetchOwner().then(m => m.user).catch(() => { })
    let guild = message.guild;
    let embed = new MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL())

      .setColor(`#303136`)
      .addFields(
        {
          name: `<:owner:1073581925278679050> **Owner**`,
          value: `${message.guild.owner}\n\`${message.guild.owner.tag}\``,
          inline: true
        },
        {
          name: `<:setting:1073581926562144337> **Server ID**`,
          value: `${message.guild.id}`,
          inline: true
        },
        {
          name: `📅 **Created On**`,
          value: `${moment.utc(message.guild.createdAt).format('LLLL')}`,
          inline: true
        }
      )
      .addFields(
        {
          name: `<:discord:1073581921071796234> **Total des membres**`,
          value: `**${message.guild.memberCount}** members`,
          inline: true
        },
        {
          name: `<:home:1073581923936514118> ** Salon**`,
          value: `**${channels.filter(channel => channel.type === 'GUILD_TEXT').size}** text | **${channels.filter(channel => channel.type === 'GUILD_VOICE').size}** voice`,
          inline: true
        },
        {
            name: `<a:boost:1073580977059811369> **Boost**`,
            value: `**${message.guild.premiumSubscriptionCount}** boost`,
            inline: true
          }
      )

    message.channel.send({ embeds: [embed] })

          } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.reply({embeds: [new MessageEmbed()
            .setColor("RED")
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
        ]});
    }
  }
}