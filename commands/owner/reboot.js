// reboot the bot (owner only)

const client = require("../../index");
const Discord = require('discord.js')

module.exports = {
    name: "reboot",
    aliases: ["restart"],
    category: "owner",
    description: "Reboot the bot (owner only)",
    usage: "reboot",
    anesOnly: true,
    run: async (client, message, args) => {

        try {
            await message.channel.send("Rebooting...");
            process.exit();
        } catch (e) {
            message.channel.send(`ERROR: ${e.message}`);
        }
    }
}