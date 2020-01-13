const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if(args[0] == "help"){
    message.reply(`Folosire: tp!mute <user>`);
    return;
  }
  
  let xdemb = new Discord.RichEmbed()
  .setColor("#00ff00")
  .setTitle(`** TEMPMUTE **`)
  .addField("Descriere:", "Dau mute permanent celui care incalca regulamentul" + "\n")
  .addField("Folosire", `tp!mute <@user>` + "\n")
  .addField("Exemplu", 'tp!mute @Aurelian')
  .addField("Permisiunea necesară", "`MANAGE_MESSAGE`")
  .setTimestamp()
  .setFooter(`© ${bot.user.username}`, bot.user.avatarURL)
  
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nu aveți permisiunea necesară pentru a folosi această comandă" + "Permisiunea necesară: `MANAGE_MESSAGE`");
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send(xdemb);
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(" îmi pare rău, dar nu îi pot da mute!");

  let muterole = message.guild.roles.find(`name`, "【🔇】➛ Muted_By_TS");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "【🔇】➛ Muted_By_TS",
        color: "#010101",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role


  let muteembed = new Discord.RichEmbed()
  .setDescription(`Mute executat de ${message.author}`)
  .setColor("RANDOM")
  .addField("Muted User", tomute)
  .addField("Muted in", message.channel)
  .addField("Cand", message.createdAt)
  .setFooter(`© ${bot.user.username}`, bot.user.avatarURL)
  message.channel.send(muteembed);

  await(tomute.addRole(muterole.id));

}

module.exports.help = {
  name: "tempmute"
}