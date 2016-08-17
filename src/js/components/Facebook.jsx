var React = require('react');

var $ = require("jquery");

var FacebookStats = require('./FacebookStats');
var CustomShapeBarChart = require('./CustomShapeBarChart');

var Facebook = React.createClass({
    
    render: function() {
       
      
        return (
            <div>
                <h1>Facebook</h1>
                <FacebookStats/>
                <CustomShapeBarChart/>
            </div>
        );
    }
});

module.exports = Facebook;   