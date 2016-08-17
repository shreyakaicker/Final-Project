var watson = require('./node_modules/watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: '72d24057-eb60-493d-8a8d-4e55a214e052',
  password: '7SJR251LLFcv',
  version: 'v3',
  version_date: '2016-05-19'
});


tone_analyzer.tone({ text: 'My life would suck without you.' },
  function(err, tone) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(tone, null, 2));
});


