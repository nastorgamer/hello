const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    let VC = message.member.voiceChannel;
    if(!VC) return message.reply("vă rugăm să vă alăturați unui canal voice!", "tp!play <music/url>")

    let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    let pl = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/

    let searchString = args.join(' ');
    if (!url || !searchString) return message.reply("vă rugăm să introduceți un nume de muzică sau un URL!", "tp!play <music/url>")

    let perms = VC.permissionsFor(message.client.user);
    if (!perms.has('CONNECT')) return message.reply("Nu am permisiuni pentru a mă conecta la canale voice!", `tp!play <music/url>`)
    if (!perms.has('SPEAK')) return message.reply("Nu am permisiunile de a vorbi într-un canal voice!" , "tp!play <music/url>")


    if (url.match(pl)) {
        let playlist = await bot.youtube.getPlaylist(url);
        let videos = await playlist.getVideos();

        for (const vid of Object.values(videos)) {
            let video = await bot.youtube.getVideoByID(vid.id)
            await bot.handleVideo(video, message, VC, true)
        }

        return message.channel.send(`🎵 **${playlist.title}** a fost adăugat în queue.`);
    } else {

        try {
            var video = await bot.youtube.getVideo(url);
        } catch (err) {
            if (err) undefined;
            try {
                var videos = await bot.youtube.searchVideos(searchString, 10);
                let index = 0;

                let embed = new discord.RichEmbed()
                    .setColor('RANDOM')
                    .setThumbnail(bot.user.avatarURL)
                    .setDescription(`**-=- Music Searches -=-**\n${videos.map(video => 
                        `**${++index} -** ${video.title}`).join('\n')}\n\n🎵 Selectați o muzică de la **1** la **10** în **10 seconds**`);

                message.channel.send(embed);

                try {
                    var response = await message.channel.awaitMessages(msg => msg.content > 0 && msg.content < 11, {
                        maxMatches: 1,
                        time: 10000,
                        errors: ['time']
                    });
                } catch (err) {
                    if (err) undefined
                    return message.channel.send('⚠ Ați depășit timpul de selecție de 10 secunde', `tp!search <music>`);
                }
                const videoIndex = parseInt(response.first().content);
                var video = await bot.youtube.getVideoByID(videos[videoIndex - 1].id);
            } catch (err) {
                console.error(err);
                return message.reply(`nu se pot găsi videoclipuri cu argumentul \`${searchString}\``, `tp!play <nusic/url>`)
            }
        }
        return bot.handleVideo(video, message, VC);
    }
};

module.exports.help = {
    name: 'search'
};