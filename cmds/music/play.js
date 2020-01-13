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

        return message.channel.send(`🎵 **${playlist.title}** ha fost adăugat în queue`);
    } else {

        try {
            var video = await bot.youtube.getVideo(url);
        } catch (err) {
            if (err) undefined;
            try {
                var vid = await bot.youtube.searchVideos(searchString, 1);
                var video = await bot.youtube.getVideoByID(vid[0].id);
            } catch (err) {
                console.error(err);
                return message.reply(`nu se pot găsi videoclipuri cu argumentul \`${searchString}\`, tp!play <music/url>`)

            }
        }
        return bot.handleVideo(video, message, VC);
    }
};

module.exports.help = {
    name: 'play'
};