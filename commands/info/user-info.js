const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: "userinfo",
  description: "utilisateur",
  cooldowns: 3000,
  aliases: ["ui"],
  botpermissions: ["EMBED_LINKS"],

  run: async (client, message, args) => {    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!user) return message.reply('Utilisateur invalide')
    const roles = user.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1)
    let oldStr = `303136`
    let hex = newStr = oldStr.substring(1);
    if (oldStr == '#000000') oldStr = '#4B0082';
    let bot = user.user.bot ? "<:discord:1073581921071796234> \`Bot\`" : "<:member:1073597695052234812> \`Humain\`";

    const devices = user.presence?.clientStatus || {};
    const description = () => {
      const entries = Object.entries(devices)
      .map(
        (value, index) => 
        `${value[0][0].toUpperCase()}${value[0].slice(1)}`
        )
      .join(" | ");
      const appareil = entries ? `\n[${Object.entries(devices).length}] **Appareil(s):** \`${entries}\`` : ""
      return `${appareil}`;
    };

    async function getUserBannerUrl(userId) {
      const user = await client.api.users(userId).get();
      return user.banner ? `https://cdn.discordapp.com/banners/${userId}/${user.banner}.${user.banner.startsWith("a_") ? "gif" : "png"}?size=4096` : null;
  }
  
      let mentionedUser = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
   
      const bannerUrl = await getUserBannerUrl(mentionedUser.id,({dynamic: true,  size: 4096 }));

      const banner = bannerUrl ? ` | [**Lien de la bannière**](${bannerUrl})` : ``;

    const status = {
      "online": '<:online:1073602303891882004> \`En Ligne\`',
       "idle": '🌙 Inactif',
       "dnd": '<:npd:1073602300792295475> \`Ne pas déranger\`',
       "offline": '<:offline:1073602302730047598> \`Hors-ligne\`'
     }


         
        var permissions = [];

    if(user.permissions.has("KICK_MEMBERS")){
     permissions.push("Kick Members");
 }
 
 if(user.permissions.has("BAN_MEMBERS")){
     permissions.push("Ban Members");
 }
 
 if(user.permissions.has("ADMINISTRATOR")){
     permissions.push("Administrator");
 }

 if(user.permissions.has("MANAGE_MESSAGES")){
     permissions.push("Manage Messages");
 }
 
 if(user.permissions.has("MANAGE_CHANNELS")){
     permissions.push("Manage Channels");
 }
 
 if(user.permissions.has("MENTION_EVERYONE")){
     permissions.push("Mention Everyone");
 }

 if(user.permissions.has("MANAGE_NICKNAMES")){
     permissions.push("Manage Nicknames");
 }

 if(user.permissions.has("MANAGE_ROLES")){
     permissions.push("Manage Roles");
 }

 if(user.permissions.has("MANAGE_WEBHOOKS")){
     permissions.push("Manage Webhooks");
 }

 if(user.permissions.has("MANAGE_EMOJIS_AND_STICKERS")){
     permissions.push("Manage Emojis");
 }

let compte = user.user.bot ? "du bot" : `de l'utilisateur` 
const pseudo = user.user.displayName ? `(${user.user.displayName})` : "";

    const permission = permissions.join(', ') ? `**Permissions:** ${permissions.join(', ')}` : "\n";

    const Reponse = new MessageEmbed()
    .setAuthor({ name: `Information sur ${user.user.username}`, iconURL: `${user.user.displayAvatarURL({ dynamic: true, size: 1024 })}`})
    .setThumbnail(user.user.displayAvatarURL({ size: 2048, dynamic: true}))
    .setImage(bannerUrl)
    .setColor(`${oldStr}`)
    .addFields(
      {
        name: `<:info:1073597692233658448> **Information ${compte}:**`, 
        value: `**Nom:** \`${
          user.user.username
        }\`${pseudo}\n**Tag:** \`${
          user.user.discriminator
        }\`\n**Mention:**<@${
          user.user.id
        }>\n**Identifiant ${compte}:** \`${
          user.user.id
        }\`\n**Type de compte:** ${
          bot
        }\n**Liens:** [**Lien de l'avatar**](${user.user.displayAvatarURL({ size: 2048, dynamic: true})})${banner}\n**Création du compte:** 
<t:${Math.floor(user.user.createdTimestamp / 1000)}:D> <t:${Math.floor(user.user.createdTimestamp / 1000)}:R>\n**Statut:** ${
          status[user.presence?.status] || "<:offline:1073602302730047598> Hors-ligne"
        }${description()}\n` 
      },
      {
        name: `<:info:1073597692233658448> **Information ${compte} sur le serveur**`,
        value: `**Membre du Serveur depuis:** 
<t:${Math.floor(user.joinedTimestamp / 1000)}:D> <t:${Math.floor(user.joinedTimestamp / 1000)}:R>\n**Rôle le plus haut:** ${
          user.roles.highest
        }\n**Couleur du rôle:** [${
          user.roles.highest.hexColor}](https://www.color-hex.com/color/${hex
          })\n`},{
          name: `[${user.roles.cache.size - 1}] **Rôle(s):**`,
    value: `${roles.length == 0 ? "Rien" : roles.length < 10 ? roles.join('') : roles.length > 10 ? trimArray(roles) : roles
         }\n\n${permission}\n\n`
     })    
    .setTimestamp()   
        .setFooter({ text: `Userinfo`})

        const row = new MessageActionRow()
        
                .addComponents(
                    new MessageButton()
                        .setLabel('Avatar')
                        .setStyle('LINK')
                        .setURL(user.user.displayAvatarURL({ size: 2048, dynamic: true }))
                       )
                       if(bannerUrl) { row.addComponents(
                        new MessageButton()
                        .setLabel('Bannière')
                        .setStyle('LINK')
                        .setURL(`${bannerUrl}`)
                       )}

    message.reply({ embeds: [Reponse], components: [row] });
    
    function trimArray(arr, maxLen = 10){
        if(arr.length > maxLen){
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(` **${len} autres...**`);
        }
        return arr;
    }
  }
}
