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
      });
});

app.listen(process.env.PORT || 8080, function() {
  console.log('Server started');
});

