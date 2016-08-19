// var watsonFacebookData = {
//   "document_tone": {
//     "tone_categories": [
//       {
//         "tones": [
//           {
//             "score": 0.17689,
//             "tone_id": "anger",
//             "tone_name": "Anger"
//           },
//           {
//             "score": 0.05194,
//             "tone_id": "disgust",
//             "tone_name": "Disgust"
//           },
//           {
//             "score": 0.192321,
//             "tone_id": "fear",
//             "tone_name": "Fear"
//           },
//           {
//             "score": 0.30386,
//             "tone_id": "joy",
//             "tone_name": "Joy"
//           },
//           {
//             "score": 0.528891,
//             "tone_id": "sadness",
//             "tone_name": "Sadness"
//           }
//         ],
//         "category_id": "emotion_tone",
//         "category_name": "Emotion Tone"
//       },
//       {
//         "tones": [
//           {
//             "score": 0,
//             "tone_id": "analytical",
//             "tone_name": "Analytical"
//           },
//           {
//             "score": 0,
//             "tone_id": "confident",
//             "tone_name": "Confident"
//           },
//           {
//             "score": 0,
//             "tone_id": "tentative",
//             "tone_name": "Tentative"
//           }
//         ],
//         "category_id": "language_tone",
//         "category_name": "Language Tone"
//       },
//       {
//         "tones": [
//           {
//             "score": 0.011,
//             "tone_id": "openness_big5",
//             "tone_name": "Openness"
//           },
//           {
//             "score": 0,
//             "tone_id": "conscientiousness_big5",
//             "tone_name": "Conscientiousness"
//           },
//           {
//             "score": 0.916,
//             "tone_id": "extraversion_big5",
//             "tone_name": "Extraversion"
//           },
//           {
//             "score": 0.011,
//             "tone_id": "agreeableness_big5",
//             "tone_name": "Agreeableness"
//           },
//           {
//             "score": 0.997,
//             "tone_id": "emotional_range_big5",
//             "tone_name": "Emotional Range"
//           }
//         ],
//         "category_id": "social_tone",
//         "category_name": "Social Tone"
//       }
//     ]
//   }
// }


// var emotionTone = watsonFacebookData.document_tone.tone_categories[0].tones;
// var languageTone = watsonFacebookData.document_tone.tone_categories[1].tones;
// var socialTone = watsonFacebookData.document_tone.tone_categories[2].tones;

var {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = require('recharts');
var React = require('react');
var $ = window.$ = require('jquery');

// var data = emotionTone;
    
var FacebookStats = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var that = this;
    $.getJSON('/facebookStats/' + this.props.params.facebookId)
      .then(function(response) {
        that.setState({stats: response});
      })
      .catch(function(err) {
        console.log(err);
      })
  },
	render: function() {
	  
	  var stats = this.state.stats;
	  
  	return (
  	  this.state.stats ?
    	<div>
    	  <h2>Keywords</h2>
    	  <BarChart width={600} height={300} data={this.state.stats.keywords}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="text"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="relevance" fill="#8884d8" />
        </BarChart>
    	</div>
      :
      <div>loading data</div>
    );
  }
})


module.exports = FacebookStats;