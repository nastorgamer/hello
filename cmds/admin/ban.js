const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  if(args[0] == "help") {
    let helpembxd = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("** Ban Command Help **")
    .addField("Ban Command", `Folosire: tp!ban <@user> <motiv>` + "\n")
    .addField("Permisiunea necesară", "`BAN_MEMBERS`")
    .setTimestamp()
    .setFooter(`© ${bot.user.username}`, bot.user.avatarURL)

    message.channel.send(helpembxd);
    return;
  } 

  let xdemb = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle(`Ban command`)
  .addField("Descriere:", "Banează un membru de pe server" + "\n")
  .addField("Folosire", `tp!ban <@user> <motiv>` + "\n")
  .addField("Exemplu", `tp!ban @Aurelian Farsă` + "\n")
  .addField("Permisiunea necesară", "`BAN_MEMBERS`")
  .setTimestamp()
  .setFooter(`© ${bot.user.username}`, bot.user.avatarURL)

  if(!message.guild.member(message.author.id).hasPermission("BAN_MEMBERS")) return message.reply("Nu aveți permisiunea pentru a folosi această comandă!" + "\n" + "Permisiunea necesară: `BAN_MEMBERS`")
        let member = message.mentions.members.first()
if(member.id === message.author.id) return message.reply("nu te poti bana de unul singur...")
        if(!member) return message.channel.send(xdemb)
        if(!member.bannable)
        return message.reply("Nu am permisiunea necesară pentru a face asta!");
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "Niciun motiv";
        await member.ban(reason)
          .catch(error => message.reply(`Scuze ${message.author} nu îi pot da ban deoarece : ${error}`));

          let embed = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("** BAN **")
          .addField("User", `${member.user.tag}` + "\n")
          .addField("Moderator", `${message.author.tag}` + '\n')
          .addField("Motiv", `${reason}` + "\n")
          .addField("Când", message.createdAt)
          .setFooter(`© ${bot.user.username}`, bot.user.avatarURL)

        message.channel.send(embed);
}

  
  module.exports.help = {
  name: "ban",
  description: 'Ban member',
  usage: 'ban <@user> <Reason>'
}
