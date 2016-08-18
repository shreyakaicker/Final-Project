var {PropTypes} = require('react');
var React = require('react');
var {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = require('recharts');



var watsonFacebookData = {
  "document_tone": {
    "tone_categories": [
      {
        "tones": [
          {
            "score": 0.17689,
            "tone_id": "anger",
            "tone_name": "Anger"
          },
          {
            "score": 0.05194,
            "tone_id": "disgust",
            "tone_name": "Disgust"
          },
          {
            "score": 0.192321,
            "tone_id": "fear",
            "tone_name": "Fear"
          },
          {
            "score": 0.30386,
            "tone_id": "joy",
            "tone_name": "Joy"
          },
          {
            "score": 0.528891,
            "tone_id": "sadness",
            "tone_name": "Sadness"
          }
        ],
        "category_id": "emotion_tone",
        "category_name": "Emotion Tone"
      },
      {
        "tones": [
          {
            "score": 0,
            "tone_id": "analytical",
            "tone_name": "Analytical"
          },
          {
            "score": 0,
            "tone_id": "confident",
            "tone_name": "Confident"
          },
          {
            "score": 0,
            "tone_id": "tentative",
            "tone_name": "Tentative"
          }
        ],
        "category_id": "language_tone",
        "category_name": "Language Tone"
      },
      {
        "tones": [
          {
            "score": 0.011,
            "tone_id": "openness_big5",
            "tone_name": "Openness"
          },
          {
            "score": 0,
            "tone_id": "conscientiousness_big5",
            "tone_name": "Conscientiousness"
          },
          {
            "score": 0.916,
            "tone_id": "extraversion_big5",
            "tone_name": "Extraversion"
          },
          {
            "score": 0.011,
            "tone_id": "agreeableness_big5",
            "tone_name": "Agreeableness"
          },
          {
            "score": 0.997,
            "tone_id": "emotional_range_big5",
            "tone_name": "Emotional Range"
          }
        ],
        "category_id": "social_tone",
        "category_name": "Social Tone"
      }
    ]
  }
}


var emotionTone = watsonFacebookData.document_tone.tone_categories[0].tones;
var languageTone = watsonFacebookData.document_tone.tone_categories[1].tones;
var socialTone = watsonFacebookData.document_tone.tone_categories[2].tones;

// [ { score: 0.17689, tone_id: 'anger', tone_name: 'Anger' },
//   { score: 0.05194, tone_id: 'disgust', tone_name: 'Disgust' },
//   { score: 0.192321, tone_id: 'fear', tone_name: 'Fear' },
//   { score: 0.30386, tone_id: 'joy', tone_name: 'Joy' },
//   { score: 0.528891, tone_id: 'sadness', tone_name: 'Sadness' } ]
var data = emotionTone;
console.log(data);


var getPath = (x, y, width, height) => {
  return `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;
};

var TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill}/>;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

var CustomShapeBarChart = React.createClass({
	render () {
  	return (
    	<BarChart width={600} height={300} data={data}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="tone_name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Bar dataKey="score" fill="#8884d8" shape={<TriangleBar/>} label/>
      </BarChart>
    );
  }
})

module.exports = CustomShapeBarChart;
