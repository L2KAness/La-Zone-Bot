const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "clear",
  description: 'Permet de supprimer un nombre de message',
  aliases: ["delete"],
  permissions: ["MANAGE_MESSAGES"],

  run: async (client, message, args, cmd) => {
       if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(
      new MessageEmbed()
      .setDescription("<a:no:856635811088826408> Umm... you do not have permission to use this command - `\MANAGE_MESSAGES\`")
      .setColor("303136")
    )

  try {

      let amount = Number(args[0], 10) || parseInt(args[0]);
      if (isNaN(amount) || !Number.isInteger(amount))
        return message.channel.send({
            content:  "Please enter a number of messages to purge."
        }
          
        )
      if (!amount || amount < 2 || amount > 100)
        return message.channel.send({
            content: "Please enter a number of message between 2 and 100."
        }
          
        );
      if (!args[1]) {
        try {
          await message.delete();
          await message.channel.bulkDelete(amount).then(async (m) => {
            let embed = new MessageEmbed()
              .setColor("0x#303136")
              .setDescription(
                `✅  Cleared **${m.size}**/**${amount}** messages!`
              );

            message.channel
              .send({embeds: [embed]})
              .then((msg) => msg.delete({ timeout: 1 }));
          });
        } catch (e) {
          message.channel.send({
              content: `You can only delete the messages which are not older than 14 days!`
          }
            
          );
        
        }
      } else {
        return message.channel.send(`An error occoured.`);
      }
    } catch (error) {
      console.log(error);
      message.channel.send(`An error occurred: \`${error}\``);
    }
  },
};