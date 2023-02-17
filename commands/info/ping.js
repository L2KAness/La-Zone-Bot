const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    description: 'Permets de voir le ping du bot',
    aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.send(`${client.ws.ping} ws ping`);
    },
};
