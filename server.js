var express = require('express');

var functions = require('./functions.js');
var app = express();

app.use('/files', express.static(__dirname + '/src'));

app.get('/facebookStats/:facebookName', function(req, res) {
    var facebookName = req.params.facebookName;
    
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
        console.log('wtf');
        console.log(err);
        res.status(500).send(err.stack);
      })
});


app.get('/twitterStats/:twitterName', function(req, res) {
    var twitterName = req.params.twitterName;
    console.log(twitterName);
    functions
      .getTwitterClient(twitterName)
      .then(function(commentsText) {
        console.log("Received comments");
        return functions.textAnalyzer(commentsText);
      })
      .then(function(stats) {
        console.log("Received stats");
        console.log(stats)
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

