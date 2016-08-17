var accessToken = '228096155.1677ed0.03091262d940445497e7c35d1c98ca94';
var InstagramAPI = require('instagram-api');
var instagramAPI = new InstagramAPI(accessToken);
var express = require('express');
var watson = require('./watson-developer-cloud');
var request = require("request");
var tone_analyzer = watson.tone_analyzer({
    username: '72d24057-eb60-493d-8a8d-4e55a214e052',
    password: '7SJR251LLFcv',
    version: 'v3',
    version_date: '2016-05-19'
});





//authorazation redirect: https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=code



// instagramAPI.userSelf().then(function(result) {

//     console.log(result.data);
// } );

// instagramAPI.userSelf().then(function(result) {
//     console.log(result.data); // user info
//     console.log(result.limit); // api limit
//     console.log(result.remaining) // api request remaining
// }, function(err){
// 	console.log(err); // error info
// });

// function getUserId(username){
    
// request('https://api.instagram.com/v1/users/search?q='+username+'&access_token='+accessToken, function (err,res) {
    
//     if (err) {
        
//         console.log(err) ;
//         }
//             else {
//                 console.log(res.body);
//             }
//         }
//   );

   
//   }

// getUserId('vice');


instagramAPI.userSelfMedia().then(function(result) {

    var ids = result.data.map(function(post) {
        return post.id;
    });
    var promises = ids.map(function(id) {
        return instagramAPI.mediaComments(id);
    });

    Promise.all(promises)
        .then(function(allData) {
            var together = [];
            allData.forEach(function(ele) {

                together = together.concat(ele.data.map(function(datas) {
                    return (datas.text);
                }));
            });

            together = together.join('.');


            tone_analyzer.tone({
                    text: together
                },
                function(err, tone) {
                    if (err)
                        console.log(err);
                    else
                        console.log(JSON.stringify(tone.document_tone, null, 2));
                });

        });

});
