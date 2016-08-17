var Facebook = require('fb-id');
var FB = require('fb');
    
var facebook = new Facebook();

FB.setAccessToken('EAAQbyD3MbJEBAEfy7RzMEnBqIU10FDk9hEzY6ZAvl4DPIBfZBXcpyPEPws45lxyF3KCFsFeYudUs1wErLohourjgaZBrheu58rz6zjJZAt3ABYRrMdQraMsjXokPDWOzMp4oxfWHFslOLgl2FzirYmhD2bPF4lIZD');
var watson = require('./node_modules/watson-developer-cloud');
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');

var alchemy_language = new AlchemyLanguageV1({
  api_key: '8eaa3d8e5a39f7886118f7c0234d89f0db5265e8'
});
var tone_analyzer = watson.tone_analyzer({
  username: '72d24057-eb60-493d-8a8d-4e55a214e052',
  password: '7SJR251LLFcv',
  version: 'v3',
  version_date: '2016-05-19'
});

function fbApi(param) {
    return new Promise(function(resolve, reject) {
        FB.api(param, function(res) {
            if (!res || res.error) {
                reject(res.error || new Error('Something bad happened!'));
            }
            else {
                resolve(res);
            }
        });
    });
}

// FB.api('100575810307679_290533207978604/comments', function (res) {
//     if(!res || res.error) {
//         console.log(!res ? 'error occurred' : res.error);
//         return;
//     }
//     console.log(res);
// });



//this is to get page id from URL


function getIdFromFacebookName (facebookName) {
    return new Promise(function(resolve, reject) {
        facebook.getId('http://facebook.com/' + facebookName, function(id) {
            resolve(id);
        });
    });
    
}

//res.data.message is the post titles


function getAllPostsForId(fbId, callback) {
    return fbApi(fbId + '/posts?limit=100').then(
        function(res) {

            var data = res.data;
            return data;
        }
    );
}


function getAllComments(postId) {
    
    return fbApi(postId + '/comments?limit=100')
        .then(function(comments) {
            return comments.data
                    .map(comment => comment.message) // this is an arrow function
                    .join('.');
        });
}



function getComments(facebookName) {
    
    return getIdFromFacebookName(facebookName)
        .then(function(id) {
            return getAllPostsForId(id);
        })
        .then(function(posts) {
            var commentPromises = posts.map(function(post) {
                return getAllComments(post.id);
            });
            
            return Promise.all(commentPromises);
        })
        .then(function(comments) {
            return comments
                    .filter(comment => !!comment)
                    .join(' ');
        });
}

getComments('vice').then(function(commentsText) {
    

alchemy_language.sentiment({text: commentsText}, function (err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});


    // tone_analyzer.tone({ text: commentsText }, function(err, tone) {
    //     if (err)
    //     console.log(err);
        
    //     else
    //     console.log(JSON.stringify(tone.document_tone, null, 2));
    // });
}).catch(function(err) {
    console.log(err.stack);
});


// // getIdFromURL('http://www.facebook.com/vice', function(err, res) {
// //     console.log(res);
// // })

// facebook.getId('https://www.facebook.com/vice', function(id) {
// // console.log(id)
    
// });