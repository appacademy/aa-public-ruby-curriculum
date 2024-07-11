var React = require("react");
var ReactDOM = require("react-dom");

var ReactRouter = require("react-router");
var IndexRoute = ReactRouter.IndexRoute;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;

var TweetIndex = require("./components/TweetIndex.jsx");
var TweetForm = require("./components/TweetForm.jsx");


var App = React.createClass({
  render: function () {
    return(
      <div>
        <h1>Welcome to Tweetstagram!</h1>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={TweetIndex}/>
    <Route path="new" component={TweetForm}/>
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router history={hashHistory}>
      {routes}
    </Router>,
    document.getElementById("root")
  );
});
