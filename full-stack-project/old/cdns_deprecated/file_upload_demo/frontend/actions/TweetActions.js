var appDispatcher = require('../dispatcher');
var TweetConstants = require('../constants/TweetConstants');
var TweetActions = {
  receiveTweets: function (tweets) {
    appDispatcher.dispatch({
      actionType: TweetConstants.RECEIVE_ALL,
      tweets: tweets
    });
  }
};

module.exports = TweetActions;
