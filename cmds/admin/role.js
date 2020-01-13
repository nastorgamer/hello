const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    
    if(!args[0]) {
        let embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("**ROLE **")
        .addField("role add", "tp!role add @user @role")
        .addField("role remove", "tp!role remove @user @role")
        message.channel.send(embed)
    }
    if(args[0] == "add") {
            //Pay attention in order to assign a role of a user, the bot needs to be above that role, that means you can't assign an equal or highest role than bot's role
            let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
            
            if(!message.member.hasPermission("MANAGE_ROLES")){
                message.channel.send("Nu aveți permisiunile pentru a utiliza această comandă!");
            }
        
            else{
        
                if(!rMember) 
                    return message.channel.send("Nu am gasit pe nimeni! `tp!role add @user @role`");
        
                    const gRole = message.mentions.roles.first() || message.guild.roles.find(r=> r.name === args [3])
                if(!gRole) 
                    return message.channel.send("Nu am putut găsi acest rol. `tp!role add @user @role`");
        
        
                if(rMember.roles.has(gRole.id)) 
                    return message.channel.send("Are deja acest rol.");
        
                else{
                    rMember.addRole(gRole.id).catch(console.error);
                    
                    try{
                        rMember.send(`Felicitări, vi s-a dat rolul **${gRole.name}**`);
                        message.channel.send(`Utilizatorul ${rMember} are un nou role **${gRole.name}**`);
                    }
                    catch(e){
                        console.log(e.stack);
                        message.channel.send(`Felicitări pentru <@${rMember.id}>, li s-a dat rolul **${gRole.name}.**`)
                    }
                }
            }
    }

    if(args[0] == "remove") {
        let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

        if(!message.member.hasPermission("MANAGE_ROLES")){
            message.channel.send("Nu aveți permisiunile pentru a utiliza această comandă!");
        }
        
        else{
    
            if(!rMember) 
                return message.channel.send("Nu l-am putut găsi pe acel utilizator, yo.");
            
            
                const gRole = message.mentions.roles.first() || message.guild.roles.find(r=> r.name === args [3])
            if(!gRole) 
                return message.channel.send("Nu am putut găsi acest rol.");
    
            if(!rMember.roles.has(gRole.id)) 
                return message.reply("Nu are acest rol.");
            
            else{
                rMember.removeRole(gRole.id).catch(console.error);
                
                try{
                    rMember.send(`Scuze, ai pierdut **${gRole.name}** role`);
                    message.channel.send(`Utilizatorul ${rMember} a pierdut **${gRole.name}** role`);
                }
                catch(e){
                    console.log(e.stack);
                    message.channel.send(`RIP la <@${rMember.id}>, Am eliminat **${gRole.name}** de la el/ea.`)
                }
            }
        }
    }
    }