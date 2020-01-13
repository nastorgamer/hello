const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if(args[0] == "help"){
    message.reply(`Folosire: tp!unmute <user>`);
    return;
  }
  
  let xdemb = new Discord.RichEmbed()
  .setColor("#00ff00")
  .setTitle(`** UNMUTE **`)
  .addField("Descriere:", "Dau unmute celui care mute" + "\n")
  .addField("Folosire", `tp!unmute <@user>` + "\n")
  .addField("Exemplu", 'tp!unmute @Aurelian')
  .addField("Permisiunea necesară", "`MANAGE_MESSAGE`")
  .setTimestamp()
  .setFooter(`© ${bot.user.username}`, bot.user.avatarURL)
  
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nu aveți permisiunea necesară pentru a folosi această comandă" + "Permisiunea necesară: `MANAGE_MESSAGE`");
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send(xdemb);
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(" îmi pare rău, dar nu îi pot da mute!");

  let role = message.guild.roles.find(`name`, "【🔇】➛ Muted_By_TS");
  if(!role || !tomute.roles.has(role.id)) return message.reply("Acel user nu are mute")
  await tomute.removeRole(role);
    message.channel.send(`<@${tomute.id}> a primit unmuted!`);

}

module.exports.help = {
  name: "unmute"
}
