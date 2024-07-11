var React = require("react");
var Link = require("react-router").Link;

var TweetStore = require("../stores/TweetStore.js");
var TweetApi = require('../utils/TweetApi');

var TweetIndex = React.createClass({

  getInitialState: function () {
    return { tweets: [] };
  },

  componentDidMount: function () {
    this.listener = TweetStore.addListener(this.updateTweets);
    TweetApi.fetchTweets();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  updateTweets: function () {
    this.setState({ tweets: TweetStore.all() });
  },

  tweets: function () {
    return this.state.tweets.map(function (tweet) {
      return (
        <article key={ tweet.id }>
          <img src={tweet.image_url}/>
          <h4>{ tweet.body }</h4>
          <p>{"- " + tweet.author_name }</p>
        </article>
      );
    });
  },

  render: function () {

    return (
      <section className="tweets">
        <Link to="/new">New Tweet</Link>
        {this.props.children}
        { this.tweets() }
      </section>
    );
  }

});


module.exports = TweetIndex;
