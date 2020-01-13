const hastebin = require('hastebin-gen');
const Discord = require("discord.js")
module.exports.run = async (bot, message, args) => {

    function checkServer(message) {
        if (typeof  message.channel.guild == 'undefined') {
          return false;
        } else {
          return true;
        }
      }
      
    if (!checkServer(message)){
        return;
    } // check if in server
    var bans;
    message.guild.fetchBans()
     .then(function(bans) {
       if (bans.size == 0) {
         message.channel.send("Nimeni nu a fost banat încă :white_check_mark:");
       } else {
         var res = "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ꧁ Membri serverului care au ban ^^ ꧂ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n";
         bans.forEach(function (user) {
          res += '\n • ' + user.tag + " (" + user.id + ")";
        })
        hastebin(res).then(r => {
            let embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle("** BANS **")
            .addField(`Pentru a afla cine are ban`, `[CLICK AICI](${r})`)
            .setTimestamp()
            .setFooter(`© ${bot.user.username}`, bot.user.avatarURL)
            message.channel.send(embed);

        })
       }
     })
     .catch(console.error);
}