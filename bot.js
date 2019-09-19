var discord = require('discord.js')
var bot = new discord.Client()

var prefix = "%"

bot.on('message', msg => {
    if (msg.content.startsWith(prefix)) {
        var args = msg.content.substr(1);
        var args = args.split(' ')
        switch(args[0]) {
            case "bws":             //%bws
                if (!isNaN(args[1])) {      //IF first argument of command is a number (a rank)
                    msg.channel.send(new discord.RichEmbed()
                        .setTitle('**Rank: ' + args[1] + '**')
                        .addField('Steve\'s formula: ', (args[1]**(0.9921**(args[2] * (parseInt(args[2], 10) + 1) / 2))), false) //rank^(0.99^(badges*(badges+1)/2)) 
                        );

                    
                    
                    ;   //IF its not a number (a username)
                } else if (isNaN(args[1])) {



                }
                else {
                    msg.reply("Dawg u fucked up lmao");
                }
                break;


        }
    }
  })



bot.login('YOUR_TOKEN_HERE');
