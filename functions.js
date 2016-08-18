var Facebook = require('fb-id');
var FB = require('fb');
var Twitter = require('twitter');
    
var facebook = new Facebook();

FB.setAccessToken('EAAQbyD3MbJEBAEfy7RzMEnBqIU10FDk9hEzY6ZAvl4DPIBfZBXcpyPEPws45lxyF3KCFsFeYudUs1wErLohourjgaZBrheu58rz6zjJZAt3ABYRrMdQraMsjXokPDWOzMp4oxfWHFslOLgl2FzirYmhD2bPF4lIZD');
var watson = require('./node_modules/watson-developer-cloud');
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');

var client = new Twitter({
  consumer_key: 'nnnfjlzfNMlkkh5JejBEGkghg',
  consumer_secret: 'JvhBmn3MyNERay3RKQbaB2ppXmUaaDVpdEQlbFiWIiKbMnCDtU',
  access_token_key: '27434545-4TBqFKB7U0WfXE9d8cdQ9OoTYyEBMCr0R9KvyKkTm',
  access_token_secret: 'qvIaSDiTHjFCEI8LlixWRsFNsFz3f13KYWhPHj5j9QlA3'
});

var alchemy_language = new AlchemyLanguageV1({
  api_key: '8eaa3d8e5a39f7886118f7c0234d89f0db5265e8'
});
var tone_analyzer = watson.tone_analyzer({
  username: '72d24057-eb60-493d-8a8d-4e55a214e052',
  password: '7SJR251LLFcv',
  version: 'v3',
  version_date: '2016-05-19'
});


function getTwitter(name) {
client.get('/search/tweets.json?q=%40@'+name+'&count=2/', function(error, tweets, response, callback) {
  var tweetArray= tweets.statuses;
  var tweetList = tweetArray.map(function (tweets) {
    return tweets.text;
  });
  return tweetList;
});
}


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


function getIdFromFacebookName (facebookName) {
    return new Promise(function(resolve, reject) {
        facebook.getId('http://facebook.com/' + facebookName, function(id) {
            resolve(id);
        });
    });
    
}

//res.data.message is the post titles


function getAllPostsForId(fbId, callback) {
    return fbApi(fbId + '/posts?limit=10').then(
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

function textAnalyzer(commentsText) {
  if (commentsText.length === 0) {
    return Promise.reject(new Error('commentsText required'));
  }
  
  var entities = new Promise(function(resolve, reject) {
    alchemy_language.entities({text: commentsText}, function (err, response) {
      if (err) {
        console.log(err.stack);
        reject(err);
      }
      else {
        console.log('received entities');
        resolve({type: 'entities', value: response.entities});
      }
    });
  });
  
  var sentiment = new Promise(function(resolve, reject) {
    alchemy_language.sentiment({text: commentsText}, function (err, response) {
      if (err) {
        console.log(err.stack);
        reject(err);
      }
      else {
        console.log('received sentiment');
        resolve({type: 'sentiment', value: response.docSentiment});
      }
    });
  });
  
  var keywords = new Promise(function(resolve, reject) {
    alchemy_language.keywords({text: commentsText}, function (err, response) {
      if (err) {
        console.log(err.stack);
        reject(err);
      }
      else {
        console.log('received keywords');
        resolve({type: 'keywords', value: response.keywords});
      }
    });
  });
  
  var tones = new Promise(function(resolve, reject) {
    tone_analyzer.tone({ text: commentsText },
      function(err, response) {
        if (err) {
          console.log(err.stack);
          reject(err);
        }
        else {
          console.log('received tones');
          resolve({type: 'tones', value: response.document_tone});
        }
    });
  });
  
  return Promise.all([entities, sentiment, keywords, tones]).then(
    function(responses) {
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
    textAnalyzer: textAnalyzer
};