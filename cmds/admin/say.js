const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
if(!args[0]) return message.reply("Scrie ba ceva ce naiba, nu am timp toata ziua...")
    if(!message.guild.member(message.author.id).hasPermission("MANAGE_MESSAGES")) return message.reply("Nu aveți permisiunea necesară pentru a folosi această comandă!");
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
  
      }

module.exports.help = {
  name: "say"
}