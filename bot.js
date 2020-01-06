var discord = require('discord.js')
var bot = new discord.Client()
var https = require('https')


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

                    msg.reply("bruh");

                }
                else {
                    msg.reply("bruh");
                }
                break;



            case "rs":
            case "recent":              //%recent %rs
                if  (args.includes("-gatari")) {
                   // msg.reply("Looking for most recent gatari play for " + args[args.length - 1]);

                    https.get('https://api.gatari.pw/users/get?u=' + args[args.length - 1], (response2) => {
                        let body = '';
                        response2.on("data", (data) => {body += data;})
	                    response2.on("end", () => {
                            let json = JSON.parse(body);
                            username = json.users[0].username;
                            uid = json.users[0].id;

                            https.get('https://api.gatari.pw/user/scores/recent?id=' + uid + '&l=1&mode=0&f=1', (response) => {
                                let body = "";
                                response.on("data", (data) => {body += data;})
                                response.on("end", () => {
                                let json = JSON.parse(body);
                                msg.channel.send(new discord.RichEmbed()
                                    .setAuthor('Most recent gatari play for ' + username, 'https://a.gatari.pw/' + uid, 'https://osu.gatari.pw/u/' + uid)
                                    .setTitle(json.scores[0].beatmap.song_name)
                                    .setURL('https://osu.gatari.pw/b/' + json.scores[0].beatmap.beatmap_id)
                                    .addField('Score:', json.scores[0].score, true)
                                    .addField('Accuracy:', json.scores[0].accuracy.toFixed(2),true)
                                    .addField('Rank:', ':regional_indicator_' + json.scores[0].ranking.toLowerCase() + ':', true)
                                    .addField('Max Combo:', json.scores[0].max_combo, true)        //TODO: Show combo out of map max; will need to make api call for beatmap stats
                                    .addField('300/100/50/Misses', json.scores[0].count_300 + '/' + json.scores[0].count_100 + '/' + json.scores[0].count_50 + '/' + json.scores[0].count_miss, true)
                                    .addField('Performance Points:', json.scores[0].pp + "pp", true)
                                    );
                                })
		                    })
                        })
                    
                    })


                }
        }
    }
  })



bot.login('YOUR_TOKEN_HERE');
