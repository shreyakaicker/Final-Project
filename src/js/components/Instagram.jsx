var React = require('react');
var $ = require("jquery");

var StraightAnglePieChart = require('./StraightAnglePieChart');

var Instagram = React.createClass({
    
    render: function() {
       
      
      
        return (
            <div>
                <h1>Instagram</h1>
                <StraightAnglePieChart/>
            </div>
        );
        
    }
});


module.exports = Instagram;   