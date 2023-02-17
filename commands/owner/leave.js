module.exports = {
    name: "leaveserver",
    description: "Quitte un serveur Discord en utilisant son ID.",
    usage: "<ID du serveur>",
    aliases: [],
    anesOnly: true,
    run: async (client, message, args) => {
      let serverID = args[0];
      let server = client.guilds.cache.get(serverID);
      if (!server) return message.reply("Aucun serveur trouvé avec cet ID.");
      server.leave();
      message.reply(`Le bot a quitté le serveur ${server.name}.`);
    },
  };
  