var Facebook = require('fb-id');
var FB = require('fb'),
    fb = new FB.Facebook(options);
    var options = FB.options();
    
var facebook = new Facebook();

FB.setAccessToken('EAAQbyD3MbJEBAEfy7RzMEnBqIU10FDk9hEzY6ZAvl4DPIBfZBXcpyPEPws45lxyF3KCFsFeYudUs1wErLohourjgaZBrheu58rz6zjJZAt3ABYRrMdQraMsjXokPDWOzMp4oxfWHFslOLgl2FzirYmhD2bPF4lIZD');


// FB.api('100575810307679_290533207978604/comments', function (res) {
//     if(!res || res.error) {
//         console.log(!res ? 'error occurred' : res.error);
//         return;
//     }
//     console.log(res);
// });



//this is to get page id from URL
// facebook.getId('https://www.facebook.com/mcnallydev?_rdr=p', function(id) {
//   console.log(id);
// });

//res.data.message is the post titles


function getAllPostsForId(fbId, callback) {
    FB.api(fbId + '/posts', function(res) {
        if (!res || res.err) {
            callback(res.err || new Error('something bad happened'));
        }
        else {
            var data = res.data;
            _getMorePosts(res.paging.next, data, function(err, res) {
                callback(err, res);
            });
        }
    });
}

function _getMorePosts(url, data, callback) {
    FB.api(url.replace('https://graph.facebook.com/v2.7/', ''), function(res) {
        if (!res || res.err) {
            callback(res.err || new Error('something bad happened'));
        }
        else {
            if (res.data && res.data.length) {
                data = data.concat(res.data);
                _getMorePosts(res.paging.next, data, callback);
            }
            else {
                callback(null, data);
            }
        }
    });
}


function getAllComments(postId, pageId, callback) {
    FB.api(pageId+"_"+postId, function(res) {
        
        
    });
    
}


getAllPostsForId('414281382004935', function(err, res) {
    if (err) {
        console.log(err)
    }
    else {
        
        
    }
    
});
