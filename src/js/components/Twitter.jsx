// var React = require('react');
// var $ = require("jquery");
// var SimpleLineChart = require('./SimpleLineChart');


// var Twitter = React.createClass({
    
//     render: function() {
       
      
//         return( 
//         <div>    
//         <h1>Twitter</h1>
        
//         <SimpleLineChart />
//         </div>
//         )
//     }
// });

// module.exports = Twitter;   
var React = require('react');
var browserHistory = require('react-router').browserHistory;

var Twitter = React.createClass({
    _handleGo: function() {
        browserHistory.push('/twitter/' + this.refs.twitterInput.value);
    },
    render: function() {
       
      
        return (
            <div>
                <h1>Twitter</h1>
                Enter your twitter ID: <input ref="twitterInput" type="text"/>
                <button onClick={this._handleGo}>GO</button>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Twitter;   