const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
  if(args[0] == "help"){
    let helpembxd = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("** Kick Command Help **")
    .addField("Kick Command", `Folosire: tp!kick <@user> <motiv>` + "\n")
    .addField("Permisiunea necesară", "`KICK_MEMBERS`")
    .setTimestamp()
    .setFooter(`© ${bot.user.username}`, bot.user.avatarURL)

    message.channel.send(helpembxd);
    return;
  } 

  let xdemb = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle(`Kick command`)
  .addField("Descriere:", "Da kick la member" + "\n")
  .addField("Folosire", `tp!kick <@user> <motiv>` + "\n")
  .addField("Exemplu", `tp!kick @Aurelian Farsă` + "\n")
  .addField("Permisiunea necesară", "`KICK_MEMBERS`")
  .setTimestamp()
  .setFooter(`© ${bot.user.username}`, bot.user.avatarURL)


        if(!message.guild.member(message.author.id).hasPermission("KICK_MEMBERS")) return message.rpely("Nu aveți permisiunea necesară pentru a folosi această comandă!" + "\n" + "Permisiunea necesară: `KICK_MEMBERS`")
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
if(member.id === message.author.id) return message.reply("nu te poti bana de unul singur...")
        if(!member) return message.channel.send(xdemb)

        if(!member.kickable) 
          return message.reply("Nu am permisiunea necesară pentru a face asta!")
        
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "Niciun motiv"
        
        await member.kick(reason)
          .catch(error => message.reply(`Scuze ${message.author}, dar nu i-am putut da kick deoarece : ${error}`)), message.react("🚫");

          let embed = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("**KICK**")
          .addField("User", `${member.user.tag}` + "\n")
          .addField("Moderator", `${message.author.tag}` + '\n')
          .addField("Motiv:", `${reason}` + "\n")
          .addField("Când", message.createdAt)
          .setFooter(`© ${bot.user.username}`, bot.user.avatarURL)
        message.channel.send(embed);
      }

  
  module.exports.help = {
  name: "kick",
  description: 'Kick member',
  usage: 'kick <@user> <Reason>'
}
