var {BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = require('recharts');
var React = require('react');
var $ = window.$ = require('jquery');

var thumb =  '';

var SentimentThermometer = React.createClass({

getInitialState: function() {
	
	return {};
	
},
	
	
render: function() {
		return (
		this.props.data.type === "positive" ?
	
	<div className="sentiment">
	<img src="http://www.clker.com/cliparts/e/N/K/a/E/m/green-thumbs-up-hi.png"/>
	</div>	
 :
 
	<div className="sentiment">
		<img src="http://www.clipartbest.com/cliparts/jcx/gzG/jcxgzGkcE.png"/>
	</div>	
	)
 
  }
})

module.exports = SentimentThermometer;


// { type: 'sentiment',
//   value: { score: '-0.234906', type: 'negative' } },
   
   
		// min={-100}
		// 		max={100}
		// 		width={20}
		// 		height={300}
		// 		backgroundColor={'grey'}
		// 		fillColor={'red'}
		// 		current={Math.round(+this.props.score * 100)}