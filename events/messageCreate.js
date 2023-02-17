const {Client, Message, MessageEmbed} = require('discord.js')
const { owners } = require("../config.json");
const { aness } = require("../config.json");
const db = require("quick.db");
const client = require("../index");

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;

    if (command.ownerOnly && !owners.includes(message.author.id) && !(await db.fetch(`owner_${message.author.id}`))) {
        const ownerOnly = new MessageEmbed()
            .setColor("FF0000")
            .setDescription("**Vous n'êtes pas le __owner__ !**");
        return message.channel.send({ embeds: [ownerOnly] });
    }

    if (command.anesOnly && !aness.includes(message.author.id)) {
        const anesOnly = new MessageEmbed()
            .setColor("FF0000")
            .setDescription("**Vous n'êtes pas le __owner__ !**");
        return message.channel.send({ embeds: [anesOnly] });
    }



if (command.staffOnly && !(await db.fetch(`staff_${message.author.id}`))) {
  const staffOnly = new MessageEmbed()
    .setColor("FF0000")
    .setDescription("**Vous n'êtes pas un membre du personnel !**");
  return message.channel.send(staffOnly);
}


    await command.run(client, message, args);
});
