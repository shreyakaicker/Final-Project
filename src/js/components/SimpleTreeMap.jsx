// var a =[
//   {
//     "relevance": "0.971004",
//     "text": "........."
//   },
//   {
//     "relevance": "0.912719",
//     "text": "people"
//   },
//   {
//     "relevance": "0.813762",
//     "text": "article"
//   },
//   {
//     "relevance": "0.791053",
//     "text": "social media accounts"
//   },
//   {
//     "relevance": "0.787202",
//     "text": "best Vice article"
//   },
//   {
//     "relevance": "0.780231",
//     "text": "McLaughlin Manipulating people"
//   },
//   {
//     "relevance": "0.77678",
//     "text": "politically/culturally right-minded people"
//   },
//   {
//     "relevance": "0.773419",
//     "text": "people vice.Affirmative action"
//   },
//   {
//     "relevance": "0.769403",
//     "text": "tricks.This fucking article"
//   }
// ]




// var React = require('react');
// var {Treemap} = require('recharts');







// //Number("44")
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

// module.exports = SimpleTreemap;