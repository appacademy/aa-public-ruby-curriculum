const APIUtil = require('./api_util');
class InfiniteTweets {
  constructor(el) {
    this.$el = $(el);
    this.lastCreatedAt = null;

    this.$el.on('click', '.fetch-more', this.fetchTweets.bind(this));
    this.$el.on('insert-tweet', this.insertTweet.bind(this));
  }

  fetchTweets(event) {
    event.preventDefault();

    const infiniteTweets = this;
    const data = {};
    if (this.lastCreatedAt) data.max_created_at = this.lastCreatedAt;

    APIUtil.fetchTweets(data).then((data) => {
      infiniteTweets.insertTweets(data);

      if (data.length < 20) {
        infiniteTweets.$el
          .find('.fetch-more')
          .replaceWith('<b>No more tweets!</b>');
      }

      if (data.length > 0) {
        infiniteTweets.lastCreatedAt = data[data.length - 1].created_at;
      }
    });
  }

  insertTweet(event, data) {
    this.$el.find('ul.tweets').prepend(this.tweetElement(data));

    if (!this.lastCreatedAt) {
      this.lastCreatedAt = data.created_at;
    }
  }

  insertTweets(data) {
    this.$el.find('ul.tweets').append(data.map(this.tweetElement));
  }

  tweetElement(tweet) {
    const mentions = tweet.mentions.map(mention =>
      `<li class='tweetee'>
        <a href='/users/${mention.user.id}'>@${mention.user.username}</a>
      </li>`)
      .join('');

    const elementString = `
    <div class='tweet'>
      <h3 class='tweeter'>
        <a href='/users/${tweet.user.id}'>
          @${tweet.user.username}
        </a>
      </h3>
      
      <p>${tweet.content}</p>
      
      <ul>Mentions
        ${mentions}
      </ul>
    </div>`

    return $(elementString);
  }

}

module.exports = InfiniteTweets;
