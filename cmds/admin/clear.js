const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  if(args[0] == "help"){
    let helpembxd = new Discord.RichEmbed()
    .setColor("#00ff00")
    .setTitle("** Clean Command Help **")
    .addField("Clear command", `Folosire: tp!clear <cantitate>` + "\n")
    .addField("Exemplu", `tp!clear 25` + "\n")
    .addField("Permisiunea necesară", "`MANAGE_MESSAGES")
    .setTimestamp()
    .setFooter(`© ${bot.user.username}`, bot.user.avatarURL)

    message.channel.send(helpembxd);
    return;
  } 

  message.delete()

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nu aveți permisiunea necesară pentru a folosi această comandă!");
  if(!args[0]) return message.channel.send("Vă rugăm să introduceți un număr de mesaje pentru a șterge! `Folosire: tp!clear <cantitate>`");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`**__Am șters ${args[0]} mesaje.__**`).then(msg => msg.delete(2000)) ;
});


}


  
  module.exports.help = {
  name: "clear"
}