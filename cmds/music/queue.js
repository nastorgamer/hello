const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    if (!queue) return message.channel.send('⚠ Nu se cântă muzică.')

    let embed = new discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(bot.user.avatarURL)
        .setDescription(`**-=- Music Queue -=-**\n${queue.musics.map(music => 
            `**-** ${music.title}`).join('\n')}\n\n🎵 **În prezent se ascultă** ${queue.musics[0].title}`);

    message.channel.send(embed);

};

module.exports.help = {
    name: 'queue',
    aliases: ['q']
}