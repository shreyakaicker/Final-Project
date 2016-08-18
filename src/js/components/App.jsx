var React = require('react');
var Link = require('react-router').Link;


var App = React.createClass({
    render: function() {
        return (
            <div className="main-app">
                <header className="main-header">
                    <h1><Link to="/">Project</Link></h1>
                </header>
                <Link to="/facebook">FACEBOOK</Link>
                <p> </p>
                <Link to="/twitter">TWITTER</Link>
                
                <main className="main-content">
                    {this.props.children}
                </main>
            </div>
        );
    }
});

module.exports = App;

