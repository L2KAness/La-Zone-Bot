const client = require("../index");
const db = require("quick.db");
const Discord = require('discord.js')
const fs = require("fs");
client.on("guildMemberAdd", member => {
  const bienChannelID = db.get("bien_" + member.guild.id);
  const rolesMember = db.get("rolemember_" + member.guild.id);

  client.channels.cache.get(bienChannelID).send({content: `Bienuvenue ${member} !\n> Nous somme désormais ${member.guild.memberCount}.`})
  member.roles.add(rolesMember)
})
  
  client.on("guildMemberRemove", member => {
    const logsChannelID = db.get("logs_" + member.guild.id);
    const embedleave = new Discord.MessageEmbed()
    .setColor('#303136')
    .setDescription(`**Ce membre a quitter ${member}\nNous somme désormais ${member.guild.memberCount}.**`)
    client.channels.cache.get(logsChannelID).send({embeds: [embedleave]});
  })
  
  client.on("guildMemberBoost", member => {
  
    const supp = new Discord.MessageEmbed()
    .setTitle(`**Merci du boost** !`)
    .setColor("#303136")
    .setDescription(`**Merci de ton boost ${member} !**`)
    .setImage(`https://media.discordapp.net/attachments/897595945531867146/906185101933686794/5fc1f8cf89ea4cfa8bbc77eb1ba2ce31.jpeg?width=1202&height=676`)
    message.channel.send({ embeds: [supp] })
  })
  
  
  client.on("guildMemberAdd", (member) => {
    fs.readFile("blacklist.json", (err, data) => {
      if (err) throw err;
      let blacklist = JSON.parse(data);
      if (blacklist.includes(member.id)) {
        member.ban();
        console.log(`Membre banni de la blacklist ${member.user.tag}`);
      }
    });
  });
  