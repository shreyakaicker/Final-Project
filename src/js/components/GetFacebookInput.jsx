var React = require('react');
var getComments = require('./fbfunc.js');
var FacebookStats = require('./FacebookStats');
var CustomShapeBarChart = require('./CustomShapeBarChart');

var Facebook = React.createClass({
    render: function() {
       
      
        return (
            <div>
            <p>Enter a GitHub username:</p>
            <input type="text" ref="userInput" />
            </div>
        );
    }
});

module.exports = Facebook;   