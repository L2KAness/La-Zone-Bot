const { Client, ContextMenuInteraction, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;

module.exports = {
name: "help",
description: "Afficher toutes les commandes",
/**
 * @param {Client} client
 * @param {ContextMenuInteraction} interaction
 * @param {String[]} args
 */
run: async (client, interaction, args) => {
  const roleColor =
  interaction.guild.me.displayHexColor === "#000000"
      ? "#ffffff"
      : interaction.guild.me.displayHexColor;

  if (!args[0]) {
    let categories = [];

    readdirSync("./SlashCommands/").forEach((dir) => {
      const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );

      const cmds = commands.map((command) => {
        let file = require(`../../SlashCommands/${dir}/${command}`);

        if (!file.name) return "No command name.";

        let name = file.name.replace(".js", "");
        let description = file.description;

        return `\`${name}\` : ${description} \n`;
      });

      let data = new Object();

      data = {
        name: dir.toUpperCase(),
        value: cmds.length === 0 ? "In progress." : cmds.join(" "),
      };

      categories.push(data);
    });

    const embed = new MessageEmbed()
      .setTitle("📬 Need help? Here are all of my slash commands:")
      .addFields(categories)
      .setDescription(
        `Utilisez \`/help\` suivi d'un nom de commande slash pour obtenir plus d'informations supplémentaires sur une commande slash. Par exemple : \`/help invite.\``
      )
      .setFooter(
        `Requested by ${interaction.user.tag}`,
      )
      .setTimestamp()
      .setColor("#303136");
    return interaction.followUp({ embeds: [embed] });
  } else {
    const command =
      client.commands.get(args[0].toLowerCase()) ||
      client.commands.find(
        (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
      );

    if (!command) {
      const embed = new MessageEmbed()
        .setTitle(
          `Invalid command! Use \`/help\` for all of my slash commands!`
        )
        .setColor("303136");
      return interaction.followUp({ embeds: [embed] });
    }

    const embed = new MessageEmbed()
      .setTitle("Slash command Details:")
      .addField("PREFIX:", `\`/\``)
      .addField(
        "COMMAND:",
        command.name ? `\`${command.name}\`` : "No name for this slash command."
      )
      .addField(
        "ALIASES:",
        command.aliases
          ? `\`${command.aliases.join("` `")}\``
          : "No aliases for this slash command."
      )
      .addField(
        "USAGE:",
        command.usage
          ? `\`/${command.name} ${command.usage}\``
          : `\`/${command.name}\``
      )
      .addField(
        "DESCRIPTION:",
        command.description
          ? command.description
          : "No description for this slash command."
      )
      .setFooter(
          `Requested by ${interaction.user.tag}`,
        )
      .setTimestamp()
      .setColor(roleColor);
    return interaction.followUp({ embeds: [embed] });
  }
},
};