module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    
    if (queue && queue.playing) {
        queue.playing = false;
        queue.connection.dispatcher.pause();
        return message.channel.send(`🎵 Muzica a fost întreruptă acum`);
    }

    return message.channel.send('⚠ Nu se cântă muzică.')
    
};

module.exports.help = {
    name: 'pause'
};