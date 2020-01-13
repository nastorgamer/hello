module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    if (!message.member.voiceChannel) return message.reply(`vă rugăm să vă alăturați unui canal voice pentru a rula această comandă!`, `k!stop`);
    if (!queue) return message.channel.send('⚠ Nu se cântă muzică.');

    queue.musics = [];
    queue.connection.dispatcher.end();

};

module.exports.help = {
    name: 'stop'
};