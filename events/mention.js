const client = require("../index");

client.on("messageCreate", async message => {
    if (!message.content.includes(`<@${client.user.id}>`)){
        return
    }
    else{
        message.reply(`Mon prefix sur le serveur est : \`\`${client.config.prefix}\`\``)

    }
  })