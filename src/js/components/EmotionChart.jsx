var {RadialBarChart, RadialBar, Legend} = require('recharts');
var React = require('react');
var $ = window.$ = require('jquery');

var style = {
  	top: 0,
  	left: 350,
  	lineHeight: '24px'
  };

var EmotionChart = React.createClass({
	render () {
	    
	    var data = [
      {name: 'Anger', val: (Math.round(+this.props.data.anger*100)), fill: '#ff0000' },
      {name: 'Disgust', val: (Math.round(+this.props.data.disgust*100)), fill: '#00ff00' },
      {name: 'Fear', val: (Math.round(+this.props.data.fear*100)), fill: '#BAC1C1'},
      {name: 'Joy', val: (Math.round(+this.props.data.joy*100)), fill: '#ff99e6' },
      {name: 'Sadness', val: (Math.round(+this.props.data.sadness*100)), fill: '#0066ff' }
];

  	return (
    	<RadialBarChart width={700} height={500} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={data}>
        <RadialBar minAngle={15} label background clockWise={true} dataKey='val'/>
        <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
        </RadialBarChart>
    );
  }
})

module.exports = EmotionChart;