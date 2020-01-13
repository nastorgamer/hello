module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    if (!queue) return message.channel.send('⚠ Nu se cântă muzică.')
    
    if (!args[0]) return message.channel.send(`🎵 Current Volume: **${queue.volume}/100**`);
    if (isNaN(args[0])) return message.reply(`introduceți doar un volum între 0 și 100!`, `tp!volume <volume>`);
    if (args[0] < 0 || args[0] > 100) return message.reply(`introduceți doar un volum între 0 și 100!`, `tp!volume <volume>`);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return message.channel.send(`🎵 Volumul a fost acum setat la **${queue.volume}/100**`);
};

module.exports.help = {
    name: 'volume',
    aliases: ['vol']
};