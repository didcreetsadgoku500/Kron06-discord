
 const axios = require('axios');
 const cheerio = require('cheerio');

var badgedUsers = [];

function getBadgeCount(userID, callback) {
 axios('https://osu.ppy.sh/users/' + userID)
 .then(response => {
    let html = response.data;

    var badgecount = (html.match(/profile-badges/g) || []).length;
    if (badgecount != 0) {
      badgedUsers.push([userID, badgecount]);
    }
    
    callback(userID, badgecount); 
  })
  }

for (var i = 10000; i < 15000000; i++)
{
  //var j = 10505107
  getBadgeCount(i.toString(), function (responseID, responseCount){
      console.log("UserID " + responseID + " has " + responseCount + " badges");


  })

}
