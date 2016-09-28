var {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = require('recharts');
var React = require('react');
var $ = window.$ = require('jquery');
var EmotionChart = require('./EmotionChart');
var SentimentThermometer = require('./SentimentThermometer');
var SimpleCloud = require("./SimpleCloud");
var EntitiesTable= require("./EntitiesTable");
var Loader = require ("./Loader");
//var data = emotionTone;
    
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
          	
          	 <div id="title">
          	     <p id="sentimenttop">keywords</p><p id="keywordtop">feelings</p><p id="feelingtop">sentiment</p><p id="entitiestop">entities</p>
          	  </div>
          	
              	  <SimpleCloud keywords={stats.keywords}/> 
              	  <EmotionChart className="circle" data={stats.tones}/>

        	  
              <BarChart className="barchart" width={600} height={300} data={stats.entities}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="text"/>
              <YAxis />
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip />
              <Legend />
              <Bar dataKey="relevance" fill="#8884d8" />
               <Bar dataKey="type" fill="#8884d8" />
            </BarChart>
       <SentimentThermometer data={stats.sentiment}/>
        	</div>
      :
      <div className="loader"> <Loader/> </div>
    );
  }
})


module.exports = FacebookStats;

// {<EntitiesTable data= {stats.entites}/>}
    // <SentimentThermometer/>

