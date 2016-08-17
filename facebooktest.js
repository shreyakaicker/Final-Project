var FB = require('fb'),
    fb = new FB.Facebook(options);

     var options = FB.options();
     
     var Facebook = require('fb-id');
var facebook = new Facebook();



// FB.api('oauth/access_token', {
//     client_id: '1156446751059089',
//     client_secret: 'J5S3GilRP5kmJPoMx3NUoqi8g4M',
//     grant_type: 'client_credentials'
// }, function (res) {
//     if(!res || res.error) {
//         console.log(!res ? 'error occurred' : res.error);
//         return;
//     }

//     var accessToken =  FB.setAccessToken('access_token');
// });


// FB.api('oauth/access_token', {
//     client_id: '1156446751059089',
//     client_secret: 'e6dfcb812be6371db470956d5c3fc52e',
//     grant_type: 'fb_exchange_token',
//     fb_exchange_token: 'EAAQbyD3MbJEBAIzEELV2xWwLH9eZBSZCMA9oZCUJnTLLkBXAk6frGqG0isxx6YKcOT5Qso32ZAMn97FbAOZA9GmZBsCCtSqdRopPnAFfWi7LY62BM7ov2jumMSAO3UeXP4vKBe8I0NO4XUZBmdGR3IY7cTWLWPxV0EZD'
// }, function (res) {
//     if(!res || res.error) {
//         console.log(!res ? 'error occurred' : res.error);
//         return;
//     }

//     var accessToken = res.access_token;
//     var expires = res.expires ? res.expires : 0;
// });

FB.setAccessToken('EAAQbyD3MbJEBAEfy7RzMEnBqIU10FDk9hEzY6ZAvl4DPIBfZBXcpyPEPws45lxyF3KCFsFeYudUs1wErLohourjgaZBrheu58rz6zjJZAt3ABYRrMdQraMsjXokPDWOzMp4oxfWHFslOLgl2FzirYmhD2bPF4lIZD');

// FB.api('590', function (res) {
//   if(!res || res.error) {
//   console.log(!res ? 'error occurred' : res.error);
//   return;
//   }
//   console.log(res.id);
//   console.log(res.name);

// });

function getThePosts(url) {

facebook.getId(url, function(id) {
    
    if(!id || id.error) {
  console.log(!id ? 'error occurred' : id.error);
  return;
  }
  
  else {
      
  FB.api('/'+id+'/posts', function (res) {
      
  if(!res || res.error) {
  console.log(!res ? 'error occurred' : res.error);
  return;
  }
  
  else {
      
      console.log(res);
  }
  
//   console.log(res.id);
//   console.log(res.name);
})}
});
}


getThePosts("https://www.facebook.com/vicenews");

//   if(!res || res.error) {
//   console.log(!res ? 'error occurred' : res.error);
//   return;
//   }
//   console.log(res.id);
//   console.log(res.name);

// });

