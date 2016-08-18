var React = require('react');
var browserHistory = require('react-router').browserHistory;

var Facebook = React.createClass({
    _handleGo: function() {
        browserHistory.push('/facebook/' + this.refs.fbInput.value);
    },
    render: function() {
       
      
        return (
            <div>
                <h1>Facebook</h1>
                Enter your facebook ID: <input ref="fbInput" type="text"/>
                <button onClick={this._handleGo}>GO</button>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Facebook;   