var React = require('react');
var $ = require("jquery");

var FacebookStats = require('./FacebookStats');


var Facebook = React.createClass({
    
    render: function() {
       
      
        return (
            <div>
                <h1>Facebook</h1>
                <FacebookStats/>
            </div>
        );
    }
});

module.exports = Facebook;   