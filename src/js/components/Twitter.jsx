var React = require('react');
var $ = require("jquery");
var SimpleLineChart = require('./SimpleLineChart');


var Twitter = React.createClass({
    
    render: function() {
       
      
        return( 
        <div>    
        <h1>Twitter</h1>
        <SimpleLineChart />
        </div>
        )
    }
});

module.exports = Twitter;   