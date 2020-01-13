module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    let votes = bot.votes.get(message.guild.id);
    if (!message.member.voiceChannel) return message.reply("Vă rugăm să vă alăturați unui canal voice pentru a rula această comandă!", `tp!skip`);
    if (!queue) return message.channel.send('⚠ Nu se cântă muzică.');

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        if (votes.voters.includes(message.author.id)) return message.channel.send(`⚠ ${message.author}, ai votat deja! **${votes.votes}/3** voturi`, `tp!skip`);

        votes.votes++
        votes.voters.push(message.author.id);
        message.channel.send(`🎵 ${message.author}, ai votat să se dea skip! **${votes.votes}/3** voturi`);

        if (votes.votes > 3) return queue.connection.dispatcher.end();
    } else return queue.connection.dispatcher.end();
    
};

module.exports.help = {
    name: 'skip',
    aliases: ['s']
};