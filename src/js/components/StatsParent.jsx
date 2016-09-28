var React = require('react');
var Link = require('react-router').Link;


var StatsParent = React.createClass({
    
    render: function() {
        return (
            <div>
                <div className="statstitle">
                    <Link to="/"><h2 id="topcrowdfeel">crowdfeel</h2></Link>
                </div>
                    
                <div className="statsthings">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = StatsParent;