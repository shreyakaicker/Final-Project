var {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = require('recharts');
var React = require('react');

var data = [
      {name: 'Anger', val: 0.8},
      {name: 'Disgust', val: 0.05},
      {name: 'Fear', val: 0.5},
      {name: 'Joy', val: 0.87},
      {name: 'Sadness', val: 1.0}
];
var FacebookStats = React.createClass({
	render: function() {
  	return (
    	<BarChart width={600} height={300} data={data}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="val" fill="#8884d8" />
      </BarChart>
    );
  }
})

module.exports = FacebookStats;