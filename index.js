const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const token = require('./settings/config.json');
const prefix = require('./settings/config.json');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const {YouTubeAPIKey} = require('./settings/config.json');

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.youtube = new YouTube(YouTubeAPIKey);
bot.queue = new Map() 
bot.votes = new Map(); 
  
bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!!`)
    bot.user.setAvatar("https://i.imgur.com/m1cgEks.png")
    bot.user.setActivity("G-Times Best :3", {type: "LISTENING"})
  });

bot.on("message", async message => {

 
  if (!message.guild) return;
  if(message.author.bot) return undefined;
  if(message.channel.type === 'dm') return;
	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
  message.prefix = prefix;
  if(!message.content.startsWith(prefix)) return;

try{let ch = require(`./cmds/admin/${cmd}.js`)
    ch.run(bot, message, args, prefix)}catch(err){}
try{let ch = require(`./cmds/music/${cmd}.js`)
    ch.run(bot, message, args, prefix)}catch(err){}
try{let ch = require(`./cmds/general/${cmd}.js`)
    ch.run(bot, message, args, prefix)}catch(err){}

bot.handleVideo = async (video, message, vc, playlist= false) => {
    let queue = bot.queue.get(message.guild.id);
    let music = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if(!queue) {
        let queueConstruct = {
            textChannel: message.channel,
            voiceChannel: vc,
            connection: null,
            musics: [],
            volume: 50,
            playing: true
        };
        let voteConstruct = {
            votes: 0,
            voters: []
        };
        bot.queue.set(message.guild.id, queueConstruct);
        bot.votes.set(message.guild.id, voteConstruct)
        queueConstruct.musics.push(music);
    try{
        var connection = await vc.join();
        queueConstruct.connection = connection
        bot.play(message.guild, queueConstruct.musics[0]);
    }catch(err){
        bot.queue.delete(message.guild.id);
        message.channel.send(`Nu am putut să mă alătur canalului tău deoarece: ${err}`);
    }
    }else{
        queue.musics.push(music);
        if(playlist) return;
        else return message.channel.send(`🎵 **${music.title}** a fost adăugat în queue!`);
    }
    return;
}

bot.play = (guild, music) => {
    let queue = bot.queue.get(guild.id);
    let votes = bot.votes.get(guild.id);
    if(!music) {
        queue.voiceChannel.leave();
        bot.queue.delete(guild.id);
        bot.votes.delete(guild.id);
        return queue.textChannel.send(`🎵 Redarea muzicii s-a încheiat!`)
    }
    let dispatcher = queue.connection.playStream(ytdl(music.url))
        .on('end', () => {
            queue.musics.shift();
            votes.votes = 0;
            votes.voters = [];
            setTimeout(() => {
                bot.play(guild, queue.musics[0]);
            }, 250);
        })
        .on('error', err => console.error(err));
        dispatcher.setVolumeLogarithmic(queue.volume / 100);
        queue.textChannel.send(`🎵 **${music.title}** se ascultă acum!`)
}




});

bot.login(token);