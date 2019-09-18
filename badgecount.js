 const axios = require('axios');
 const cheerio = require('cheerio');


 axios('https://osu.ppy.sh/users/kron05')
 .then(response => {
    let html = response.data;
   // console.log(response.data);
    let $ = cheerio.load(response.data);
    let badges = $('div[class="profile-badges__badge"]');
 //  let shelfText = $('h2[class="shelf-title"]');
    console.log($);
  })
  .catch(console.error);