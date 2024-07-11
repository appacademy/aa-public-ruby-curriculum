# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  email      :string           not null
#  created_at :datetime
#  updated_at :datetime
#  country_id :integer          not null
#

class User < ActiveRecord::Base
  belongs_to(
    :country,
    class_name: "Country",
    foreign_key: :country_id,
    primary_key: :id
  )

  has_many(
    :tweets,
    class_name: "Tweet",
    foreign_key: :author_id,
    primary_key: :id
  )

  def self.usernames_and_tweet_counts_n_plus_one_version
    tweet_counts = {}

    User.all.each do |user|
      tweet_counts[user.name] = user.tweets.length
    end

    tweet_counts
  end

  def self.usernames_and_tweet_counts_two_queries_version
    tweet_counts = {}

    User.includes(:tweets).all.each do |user|
      tweet_counts[user.name] = user.tweets.length
    end

    tweet_counts
  end

  def self.usernames_and_tweet_counts
    tweet_counts = {}

    users = User
      .select("users.*, COUNT(tweets.id) AS tweet_count")
      .joins(:tweets)
      .group(:id)

    users.each do |user|
      tweet_counts[user.name] = user.tweet_count
    end

    tweet_counts

  end

end
