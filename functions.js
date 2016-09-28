var Facebook = require('fb-id');
var FB = require('fb');
var Twitter = require('twitter');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var clientID = '228096155.ce8fc56.b2a18da0ffc74e7183ec36a564863ccb';
var facebook = new Facebook();
FB.setAccessToken('EAAQbyD3MbJEBAIzEELV2xWwLH9eZBSZCMA9oZCUJnTLLkBXAk6frGqG0isxx6YKcOT5Qso32ZAMn97FbAOZA9GmZBsCCtSqdRopPnAFfWi7LY62BM7ov2jumMSAO3UeXP4vKBe8I0NO4XUZBmdGR3IY7cTWLWPxV0EZD');
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
var client = new Twitter({
  consumer_key: '7iZ0jn13kYpW48r8cwxG3dE0g',
  consumer_secret: 'efw7SC6f26jtZfXUph1Mn8a6SX44LKGDOxU4vyWA6OroF4aXCj',
  access_token_key: '768579440607531008-r53PMGpx9eL7q7Tk3w9a3WVmp81nmoE',
  access_token_secret: 'ffI2lSz187wuMqsL77CEmd9o1FmKiZdKxBdb8d8v0g54J'
});

var alchemy_language = new AlchemyLanguageV1({
  api_key: '004a3ba67d001665a5b0c6b6322e29b2513a039c'
});


var accessToken = '228096155.1677ed0.03091262d940445497e7c35d1c98ca94';
var InstagramAPI = require('instagram-api');
var instagramAPI = new InstagramAPI(accessToken);

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

var accessToken = '228096155.1677ed0.03091262d940445497e7c35d1c98ca94';
var InstagramAPI = require('instagram-api');
var instagramAPI = new InstagramAPI(accessToken);
var express = require('express');
var watson = require('watson-developer-cloud');
var request = require("request");


function getInsta(instaName) {

  return new Promise(function(resolve, reject) {
    request('https://api.instagram.com/v1/users/search?q=' + instaName + '&access_token=' + clientID, function(err, results, body) { 
      if (err) {
        reject(err);
      }
      
      else  {
      body = JSON.parse(body);
      var id = body.data[0].id;
      return instagramAPI.userMedia(id).then(function(results) {
        var ids = results.data.map(function(post) {
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
          resolve(together);
  
          })
          .catch(function(err) {
            reject(err);
          });
  
      });
    }});
  });
}

//test
// getInsta('julianbinder');

function getTwitterClient(param) {

  return new Promise(function(resolve, reject) {
    client.get('/search/tweets.json?q=%40@' + param + '&count=10/', function(error, tweets, response) {
      if (!response || error) {
        reject(error || new Error('Something bad happened!'));
      }
      else {
        var tweetArray = tweets.statuses;
        var tweetList = tweetArray.map(function(tweets) {
          return tweets.text;
        }).join('.');
        resolve(tweetList);
      }

    });
  });
}


function getIdFromFacebookName(facebookName) {
  return new Promise(function(resolve, reject) {
    facebook.getId('http://facebook.com/' + facebookName, function(id) {
      resolve(id);
    });
  });

}

//res.data.message is the post titles


function getAllPostsForId(fbId, callback) {
  return fbApi(fbId + '/posts?limit=5').then(
    function(res) {

      var data = res.data;
      return data;
    }
  );
}


function getAllComments(postId) {

  return fbApi(postId + '/comments?limit=5')
    .then(function(comments) {
      return comments.data
        .map(comment => comment.message) // this is an arrow function
        .join('.');
    });
}

// function getTwitter(name) {
// client.get('/search/tweets.json?q=%40@'+name+'&count=2/', function(error, tweets, response, callback {
//   var tweetArray= tweets.statuses;
//   var tweetList = tweetArray.map(function (tweets) {
//     return tweets.text;
//   });
//   return tweetList.join('.');
// });
// }


// function getTwitter(name) {
// return client.get('/search/tweets.json?q=%40@'+name+'&count=2/').then(function (err, tweets, res) {
//   var tweetArray= tweets.statuses;
//   return tweetArray;

// }).then(function(array){
//     var tweetList = array.map(function (tweets) {
//     return tweets.text;

//   } ) 


//   return tweetList.join('.');
// });
// }


function getComments(facebookName) {

  return fbApi(facebookName + '/posts?limit=10&fields=comments.limit(10)')
    .then(
      function(posts) {
        return posts.data.map(
          function(post) {
            return post.comments ? post.comments.data
              .map(function(comment) {return comment.message})
              .join(' ')
              :
              '';
          }
        )
        .join('.');
      }
    );
}

function textAnalyzer(commentsText) {
  if (commentsText.length === 0) {
    return Promise.reject(new Error('commentsText required'));
  }
  var entities = new Promise(function(resolve, reject) {
    alchemy_language.entities({
      text: commentsText
    }, function(err, response) {
      if (err) {
        console.log(err.stack);
        reject(err);
      }
      else {
        var limitedEntities = response.entities.slice(0,9);
        var entitiesOne = limitedEntities.map(function (ele) {
          return {
            text: ele.text,
            type: ele.type,
            relevance: Number(ele.relevance)*100,
          }
        });
        console.log(response.entities)
        console.log('received entities');
        resolve({
          type: 'entities',
          value: entitiesOne
        });
      }
    })
  });

  var sentiment = new Promise(function(resolve, reject) {
    alchemy_language.sentiment({
      text: commentsText
    }, function(err, response) {
      if (err) {
        console.log('sentiment error', err);
        reject(err);
      }
      else {
        console.log('received sentiment');
        resolve({
          type: 'sentiment',
          value: response.docSentiment
        });
      }
    });
  });

  var keywords = new Promise(function(resolve, reject) {
    alchemy_language.keywords({
      text: commentsText
    }, function(err, response) {
      if (err) {
        console.log('keywords error', err);
        reject(err);
      }
      else {
        var keyword = response.keywords.filter(function(ele) {
            return   ele.text.length < 35; 
          }
          );
        var keywordfinal = keyword.slice(0,9);
        
        resolve({
          type: 'keywords',
          value: keywordfinal 
        });
      }
    });
  });

  var tones = new Promise(function(resolve, reject) {
  alchemy_language.emotion({
        text: commentsText
      },
      function(err, response) {
        if (err) {
          console.log('tones error', err);
          reject(err);
        }
        else {
          resolve({
            type: 'tones',
            value: response.docEmotions
          });
        }
      })
  });

  return Promise.all([entities, sentiment, keywords, tones]).then(
    function(responses) {
      console.log('Promises.all call', responses);
      var responsesObj = responses.reduce(function(acc, item) {
        acc[item.type] = item.value;
        return acc;
      }, {});
      return responsesObj;
    }
  );


}

module.exports = {
  fbApi: fbApi,
  getIdFromFacebookName: getIdFromFacebookName,
  getAllPostsForId: getAllPostsForId,
  getComments: getComments,
  getAllComments: getAllComments,
  textAnalyzer: textAnalyzer,
  getTwitterClient: getTwitterClient,
  getInsta: getInsta
};

// alchemy_language.entities({text: "Obama, john doe, Salvador Dali, Niagra Falls"}, function (err, res) {
//   console.log(res)
// } )
// textAnalyzer({text:"Obama, john doe, Salvador Dali, Niagra Falls" })