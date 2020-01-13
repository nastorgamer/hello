module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    
    if (queue && !queue.playing) {
        queue.playing = true;
        queue.connection.dispatcher.resume();
        return message.channel.send(`🎵 Muzica a fost reluată acum`);
    }

    return message.channe.send('⚠ Nu se cântă muzică.')
    
};

module.exports.help = {
    name: 'resume'
};