var express = require('express');
var functions = require('./functions.js');
var app = express();

app.use('/files', express.static(__dirname + '/src'));

app.get('/facebookStats/:facebookId', function(req, res) {
    var facebookName = req.params.facebookId;
    
    functions
      .getComments(facebookName)
      .then(function(commentsText) {
        console.log("Received comments");
        return functions.textAnalyzer(commentsText);
      })
      .then(function(stats) {
        
        console.log("Received stats");
        res.send(stats);
      })
      .catch(function(err) {
       
        console.log(err);
        res.status(500).send(err.stack);
      })
});

app.get('/instagramStats/:instagramName', function(req, res) {
  
  var instagramName = req.params.instagramName;
  
  functions.getInsta(instagramName).then(function(commentsText) {
        console.log("Received comments");
        return functions.textAnalyzer(commentsText);
      })
      .then(function(stats) {
        res.send(stats);
      })
      .catch(function(err) {
        
        console.log(err);
        res.status(500).send(err.stack);
      });
});


app.get('/twitterStats/:twitterName', function(req, res) {
    var twitterName = req.params.twitterName;
    
    functions
      .getComments(twitterName)
      .then(function(commentsText) {
        console.log("Received comments");
        return functions.textAnalyzer(commentsText);
      })
      .then(function(stats) {
        
        console.log("Received stats");
        res.send(stats);
      })
      .catch(function(err) {
        console.log('wtf');
        console.log(err);
        res.status(500).send(err.stack);
      })
});

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

app.listen(process.env.PORT || 8080, function() {
  console.log('Server started');
});

