// var React = require('react');
// var $ = require('jquery');
// var {Treemap} = require('recharts');

// var data = [
//           {
//           name: 'ayyy', size: .7
//           },
//           {
//             name: 'hello', size: .9
//           },
//           {
//           name: 'jello', size: .5
//           },
//           {
//           name: 'julian', size: .2
//           },
//           {
//             name: 'binder', size: .4
//           },
//           {
//             name: 'allo', size: .8
//           }
//         ];

   
// var COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

// var CustomizedContent = React.createClass({
//   render() {
//     const { root, depth, x, y, width, height, index, payload, colors, rank, name } = this.props;

//     return (
//       <g>
//         <rect
//           x={x}
//           y={y}
//           width={width}
//           height={height}
//           style={{
//             fill: depth < 2 ? colors[Math.floor(index / root.children.length * 6)] : 'none',
//             stroke: '#fff',
//             strokeWidth: 2 / (depth + 1e-10),
//             strokeOpacity: 1 / (depth + 1e-10),
//           }}
//         />
//         {
//           depth === 1 ?
//           <text
//             x={x + width / 2}
//             y={y + height / 2 + 7}
//             textAnchor="middle"
//             fill="#fff"
//             fontSize={14}
//           >
//             {name}
//           </text>
//           : null
//         }
//         {
//           depth === 1 ?
//           <text
//             x={x + 4}
//             y={y + 18}
//             fill="#fff"
//             fontSize={16}
//             fillOpacity={0.9}
//           >
//             {index + 1}
//           </text>
//           : null
//         }
//       </g>
//     );
//   }
// });

// var SimpleTreemap = React.createClass({
// 	render () {
//   	return (
//     	<Treemap
//       	width={400}
//         height={200}
//         data={data}
//         dataKey="size"
//         ratio={4/3}
//         stroke="#fff"
//         fill="#8884d8"
//         content={<CustomizedContent colors={COLORS}/>}
//       />
//     );
//   }
// })



// var TwitterStats = React.createClass({
//   getInitialState: function() {
//     return {};
//   },
//   componentDidMount: function() {
//     var that = this;
//     $.getJSON('/twitterStats/' + this.props.params.twitterName)
//       .then(function(response) {
//         that.setState({stats: response});
//       })
//       .catch(function(err) {
//         console.log(err);
//       })
//   },
// 	render: function() {
	  
// 	  var stats = this.state.stats;
	  
//   	return (
//   	  this.state.stats ?
//     	<div>
//     	  <h2>Keywords</h2>
//     	 <Treemap
//       	width={400}
//         height={200}
//         data={this.state.stats.keywords}
//         dataKey="size"
//         ratio={4/3}
//         stroke="#fff"
//         fill="#8884d8"
//         content={<CustomizedContent colors={COLORS}/>}
//       />
//     	</div>
//       :
//       <div>loading data</div>
//     );
//   }
// })

// module.exports = TwitterStats;



var {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = require('recharts');
var React = require('react');
var $ = window.$ = require('jquery');

// var data = emotionTone;
    
var TwitterStats = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var that = this;
    $.getJSON('/twitterStats/' + this.props.params.twitterName)
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


module.exports = TwitterStats;

