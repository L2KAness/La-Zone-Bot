const {
    Client,
    Message,
    MessageEmbed,
    MessageAttachment,
  } = require("discord.js");
  const backup = require("discord-backup");
  backup.setStorageFolder(__dirname + "/backups");
  
  module.exports = {
    name: "backup",
    description: 'Permet de faire une sauvegarde du serveur',
    aliases: ["serverbackup"],
    ownerOnly: true,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
  
    async run(client, message, args) {
      //if(message.author.id !== "742307938042904636") return message.channel.send(new MessageEmbed()
      //.setTitle("Backup Bot")
      //.setDescription(`You cannot use this command. <@${message.author.id}>`)
      //.setColor("RANDOM"))
  
      const command = args[0];
      if (!message.member.permissions.has("ADMINISTRATOR"))
        return message.reply("Whut");
      switch (command) {
        case "create":
          {
            backup
              .create(message.guild)
              .then((backupId) => {
                return message.channel.send(
                  `A backup was created! here is the I.D \`${backupId.id}\` I hope you know how to use it! :wink:`
                );
              })
              .catch((err) => {
                console.log(err.message);
                message.author.send(err.message);
              });
          }
          break;
        case "load":
          {
            const backupID = args[1];
            backup
              .fetch(backupID)
              .then(() => {
                message.channel.send(
                  "WARNING! All server channels, roles and etc will be cleared. Do you want to continue? type `yes` if so, otherwise type `no`"
                );
  
                const collector = message.channel.createMessageCollector(
                  (m) =>
                    m.author.id === message.author.id &&
                    ["yes", "no"].includes(m.content),
                  {
                    time: 600000,
                    max: 1,
                  }
                );
                collector.on("collect", (m) => {
                  const yes = m.content === "yes";
                  collector.stop();
                  if (yes) {
                    backup
                      .load(backupID, message.guild)
                      .then(() => {
                        return message.channel.send(
                          "Backup has been loaded successfully."
                        );
                      })
                      .catch((err) => {
                        console.log(err.message);
                        message.reply(err.message);
                      });
                  } else {
                    message.channel.send("Backup has been cancelled.");
                    return;
                  }
                });
                collector.on("end", (collected, reason) => {
                  if (reason === "time") {
                    message.channel.send("You ran out of time!");
                    return;
                  }
                });
              })
              .catch((err) => {
                message.reply(`An error has occured! ${err.message}`);
              });
          }
          break;
        case "info":
          {
            let backupID = args[1];
            if (!backupID) {
              return message.channel.send({
                embeds: [
                  new MessageEmbed()
                    .setTitle("Backup Bot")
                    .setDescription(
                      `Invalid backupID please confirm your ID \`${
                        backupID || "None"
                      }\``
                    ),
                ],
              });
            }
            backup
              .fetch(backupID)
              .then((backupInfo) => {
                const date = new Date(backupInfo.data.createdTimestamp);
                const yyyy = date.getFullYear().toString(),
                  mm = (date.getMonth() + 1).toString(),
                  dd = date.getDate().toString();
                const formatedDate = `${yyyy}/${mm[1] ? mm : "0" + mm[0]}/${
                  dd[1] ? dd : "0" + dd[0]
                }`;
  
                const embed = new MessageEmbed()
                  .setTitle("Backup Information")
                  .addField("Backup ID", backupInfo.id, false)
                  .addField("Server ID", backupInfo.data.guildID, false)
                  .addField("Backup Size", `${backupInfo.size} kb`, false)
                  .addField(`Created at`, formatedDate, false)
                  .setColor("BLACK");
                message.channel.send({
                  embeds: [embed],
                });
              })
              .catch(() => {
                return message.channel.send({
                  embeds: [
                    new MessageEmbed()
                      .setTitle("Backup Bot")
                      .setDescription(
                        `:x: That backupID was not found in the folder! <@${message.author.id}>`
                      ),
                  ],
                });
              });
          }
          break;
        case "list":
          {
            backup.list().then((backup) => {
              message.channel.send(`${backup}\n`);
            });
          }
          break;
        default:
          message.reply("Invalid command usage");
          break;
      }
    },
  };
  