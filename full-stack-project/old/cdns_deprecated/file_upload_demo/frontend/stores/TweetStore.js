var Store = require('flux/utils').Store;
var appDispatcher = require('../dispatcher');
var TweetStore = new Store(appDispatcher);
var TweetConstants = require('../constants/TweetConstants');

_tweets = [];

TweetStore.all = function () {
  return _tweets.slice();
};

TweetStore.find = function (id) {
  var returnTweet;
  _tweets.forEach(function (tweet) {
    if (tweet.id === id) returnTweet = tweet;
  });
  return returnTweet;
};

TweetStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case TweetConstants.RECEIVE_ALL:
      _tweets = payload.tweets;
      this.__emitChange();
      break;
    case TweetConstants.RECEIVE_NEW:
      _tweets.push(payload.tweet);
      this.__emitChange();
      break;
  }
};

module.exports = TweetStore;
