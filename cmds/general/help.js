const Discord = require("discord.js")

module.exports.run = async (bot, message, args, prefix) => {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("** HELP **")
    .setAuthor("Developer: `Aurelian#0845`")
    .setDescription(`Prefix: **${prefix}**` + "\n" + "Version: `1.0.1`")
    .addField("**Admin", "`ban` `bans` `clear` `kick` `mute` `role` `say` `tempmute` `unmute`")
    .addField("**Music**", "`pause` `play` `queue` `resume` `search` `skip` `stop` `volume`")
    .setTimestamp()
    .setFooter(`© ${bot.user.username}`, bot.user.avatarURL)
    message.channel.send(embed)
}

module.exports.help = {
    name: "help"
}