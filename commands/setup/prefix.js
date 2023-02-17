const fs = require("fs");

module.exports = {
  name: "prefix",
  description: "Change le préfixe du bot",
  usage: "&prefix <nouveau préfixe>",
  ownerOnly: true,
  run: async (client, message, args) => {
    if (!args[0]) return message.reply("Veuillez spécifier un nouveau préfixe.");

    // Mettre à jour le préfixe dans le fichier config.json
    let config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
    config.prefix = args[0];
    fs.writeFileSync("./config.json", JSON.stringify(config));

    message.reply(`Le préfixe a été mis à jour : ${args[0]}`);
  },
};
