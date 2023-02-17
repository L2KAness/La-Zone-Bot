const { MessageAttachment } = require('discord.js');
const qrc = require('qrcode');

module.exports = {
name: 'qrcode',
aliases: ["qr", "code"],
usage: " + link", 
description: "Create a QR code.",
run: async (client, message, args) => {
    const queue = args.slice(0).join(" ")
    if(!queue) return message.channel.send('Please provide a link!')

    let image = await qrc.toBuffer(queue)

    message.channel.send({ files: [new MessageAttachment(image, 'qrcode.png')] })
}
};