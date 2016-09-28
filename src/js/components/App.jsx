var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var App = React.createClass({
     _handleFacebookGo: function() {
        browserHistory.push('/facebook/' + this.refs.input.value);
    },
    
    _handleTwitterGo: function() {
        browserHistory.push('/twitter/' + this.refs.input.value);
    },
     _handleInstagramGo: function() {
        browserHistory.push('/instagram/' + this.refs.input.value);
    },
    
    render: function() {
        return (
            <div>
            <div className="blur">rrr</div>
                <div className="main-app">
                    <header className="main-header">
                    </header>
                    
                    <span className="title">
                        <Link to="/"><h1>crowdfeel</h1></Link>
                        <p>Analyze social media comments with <a href="http://www.ibm.com/watson">Watson</a> natural language processing.</p>
                        
                    </span>

                    <main className="main-content">
                    <div>
                    <input ref="input" type="text"placeholder="wwww.facebook.com/"/>
                                <br/><br/>
                                
                                    <div className="buttons">
                                        
                         
                                    <div className="facebook button-small" onClick={this._handleFacebookGo}>
                                      <i id="icon" className="fa fa-facebook"> </i>
                                    </div>
                                    
                                    
                                    <div className="insta button-small" onClick={this._handleInstagramGo} >
                                      <i id="icon" className="fa fa-instagram"></i>
                                    </div>
                                    
                                    <div className="twitter button-small" onClick={this._handleTwitterGo}>
                                      <i id="icon" className="fa fa-twitter"></i>
                                    </div>
                            </div>
                    </div>
                    </main>
                 </div>
            </div>
        );
    }
});

module.exports = App;



