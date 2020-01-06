const https = require('https');
var HTMLParser = require('node-html-parser');

function getBadgeCount(userID, callback) {

    https.get('https://osu.ppy.sh/users/' + userID, (res) => {
        let body = "";
        res.on('data', (data) => {body = body + data;})
        res.on('end', () => {
            body = HTMLParser.parse(body, {script: true});      //Parses HTML of osu profile, includes script data (important)
            body =  body.querySelector('#json-user');           //Selects the json-user script, which holds all the important json
            if (body == null) {
                callback(new Error("Could not find an object of id #json-user for " + userID));
            }
            else {
                body = JSON.parse(body.innerHTML);              //Parses json from the json-user script. Its like the osu api get_user query but with more details
                callback(null, body.badges.length);                
            }
        })
    });
}

//example restricted user https://osu.ppy.sh/users/10699812

getBadgeCount(10699812, (err, res) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(res);
})
