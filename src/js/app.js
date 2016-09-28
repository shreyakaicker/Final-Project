var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Recharts = require('recharts');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require('./components/App');


var FacebookStats = require('./components/FacebookStats');
var TwitterStats = require('./components/TwitterStats');
var InstagramStats = require("./components/InstagramStats");
var StatsParent = require('./components/StatsParent');
var FacebookStats = require('./components/FacebookStats');
var TwitterStats = require('./components/TwitterStats')
/*
Rendering a router will output the right component tree based on the current URL.
Nested routes' components will be passed down to the parent as `this.props.children`

If the URL is /, then <App/> will be rendered, and this.props.children will be <Search/> (this is the IndexRoute)
If the URL is /user/ziad-saab then <App/> will be rendered, and this.props.children will be <User/>
The <User/> instance will be passed a prop called `params`. It will be an object with `{username: 'ziad-saab'}`
*/
var routes = (
    <Router history={ReactRouter.browserHistory}>
        <Route path="/">
            <IndexRoute component={App}/>
            <Route component={StatsParent}>
                <Route path="facebook/:facebookId" component={FacebookStats} />
                <Route path="twitter/:twitterName" component={TwitterStats} />
                <Route path="instagram/:instagramName" component={InstagramStats} />
            </Route>
     </Route>
    </Router>
);






ReactDOM.render(routes, document.getElementById('app'));
