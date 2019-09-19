
 const axios = require('axios');
 //const cheerio = require('cheerio');

var badgedUsers = [];

function getBadgeCount(userID, callback) {
 axios('https://osu.ppy.sh/users/' + userID)
 .then(response => {
    let html = response.data;

    var badgecount = (html.match(/profile-badges/g) || []).length;
    if (badgecount != 0) {
     // console.log(userID + " has " + badgecount + " badges");
      badgedUsers.push([userID, badgecount]);
    }
    
    callback(userID, badgecount); 
  })
  }

for (var i = 10505107; i <= 10505107; i++)   //okay look right now if you run this you just get rate limited for 20 minutes, put a scheduler on it LMAO
{
  //var j = 10505107
  getBadgeCount(i.toString(), function (responseID, responseCount){
      console.log("UserID " + responseID + " has " + responseCount + " badges");
      console.log(badgedUsers);


  })

}
