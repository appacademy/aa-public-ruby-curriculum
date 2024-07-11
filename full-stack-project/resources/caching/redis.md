# Caching & Redis

## Queries can be slow

Caching (pronounced *cash-ing*) is about storing computed results so
they can be re-used without recomputing them.

Let's take an example. Here's my schema file; pretty simple
users/posts/comments example:

```ruby
# db/schema

ActiveRecord::Schema.define(:version => 20130913161413) do

  create_table "comments", :force => true do |t|
    t.text    "body",    :null => false
    t.integer "post_id", :null => false
    t.integer "user_id", :null => false
  end

  add_index "comments", ["post_id"], :name => "index_comments_on_post_id"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

create_table "posts", :force => true do |t|
    t.string  "title",   :null => false
    t.text    "body",    :null => false
    t.integer "user_id", :null => false
  end

  add_index "posts", ["user_id"], :name => "index_posts_on_user_id"

  create_table "users", :force => true do |t|
    t.string "username", :null => false
  end

  add_index "users", ["username"], :name => "index_users_on_username", :unique => true
end
```

Consider a query that computes the users whose posts have been
commented on by the greatest diversity of users:

```ruby
# app/models/user.rb
class User < ActiveRecord::Base
  def self.top_users
    connection.execute(<<-SQL).to_a
SELECT
  post_authors.id
FROM
  users post_authors
JOIN
  posts ON post_authors.id = posts.user_id
JOIN
  comments ON posts.id = comments.post_id
JOIN
  users comment_authors ON posts.user_id = comment_authors.id
GROUP BY
  post_authors.id
ORDER BY
  COUNT(DISTINCT(comment_authors.id))
LIMIT
  10
SQL
  end
end
```

And here's my seeds file:

```ruby
# db/seeds.rb
ActiveRecord::Base.logger = Logger.new(STDOUT)

NUM_USERS = 10_000
POSTS_PER_USER = 10
NUM_COMMENTS = 1_000_000

ActiveRecord::Base.transaction do
  puts "creating/importing users"
  users = []
  NUM_USERS.times do |i|
    users << ["user_#{i}"]
  end
  User.import(
    ["username"],
    users,
    :validate => false
  )

  puts "creating/importing posts"
  posts = []
  User.all.each do |u|
    POSTS_PER_USER.times do |i|
      posts << [
        "post_#{i}",
        "body body body",
        u.id
      ]
    end
  end
  posts = Post.import(
    ["title", "body", "user_id"],
    posts,
    :validate => false
  )

  puts "creating comments"
  user_ids = User.pluck(:id)
  post_ids = Post.pluck(:id)
  comments = []
  NUM_COMMENTS.times do |i|
    comments << [
      "body body body",
      post_ids.sample,
      user_ids.sample
    ]
  end

  puts "importing comments"
  Comment.import(
    ["body", "post_id", "user_id"],
    comments,
    :validate => false
  )
end
```

Note that I use the `activerecord-import` gem to speed up bulk inserts
(it makes one insert of all the data, rather than individually
inserting each row).

Okay, let's see how long it takes:

```
1.9.3-p448 :003 > User.top_users
   (3823.7ms)  SELECT
 post_authors.id
FROM
 users post_authors
JOIN
 posts ON post_authors.id = posts.user_id
JOIN
 comments ON posts.id = comments.post_id
JOIN
 users comment_authors ON posts.user_id = comment_authors.id
GROUP BY
 post_authors.id
ORDER BY
 COUNT(DISTINCT(comment_authors.id))
LIMIT
 10

 => [{"id"=>"11002"}, {"id"=>"11003"}, {"id"=>"11004"}, {"id"=>"11005"}, {"id"=>"11006"}, {"id"=>"11007"}, {"id"=>"11008"}, {"id"=>"11009"}, {"id"=>"11010"}, {"id"=>"11001"}]
```

Whoa, this query took almost four seconds. If a user of our website
had been waiting for this data, they probably would have gotten bored
and left.

## Setting up Redis

SQL databases are a kind of **data store**; a data store is any
program that will store data and later fetch it back for you.

SQL is designed to be flexible and allow general data-exploration
without requiring the user to write full-blown computer programs. But
for some uses, you don't need a full-blown database. In this case, we
may want to use another kind of data store.

One common alternative is a **key-value store**. A key-value store is
like a big, persistent hash map. You fetch/set values by key. Because
there are no "tables" in a key-value store, it is hard to write
complex queries like you can in SQL without making many requests to
the store. On the other hand, key-value stores are a great choice for
caching.

Let's set up Redis, which is the most popular key-value store. To do
this, let's go to Heroku, create an app and add the RedisToGo
add-on. RedisToGo is a service that will run a Redis server for you
(just like Postgres, Redis is a program that needs to be running and
listening for clients to connect).

Now we have to setup Rails to use Redis. Step one is to install the
`redis-rails` gem. Next, go to your `config/application.rb` file and
add these lines:

```ruby
if ENV["REDISTOGO_URL"]
  config = RedisDemoApp::Application.config
  uri = URI.parse(ENV["REDISTOGO_URL"])

  config.cache_store = [
    :redis_store, {
      :host => uri.host,
      :port => uri.port,
      :password => uri.password,
      :namespace => "cache"
    }
  ]
end
```

When you add the RedisToGo add-on, Heroku will setup the
`REDISTOGO_URL` environment variable. We then set
`config.cache_store`, telling it to use a Redis store, and where on
the internet it can find the server.

To use Redis locally, you'll need the environment variable to have
been set. You can do this using Figaro. Run `heroku config` to get
your URL.

## Using Redis

Okay, great! The way to access the Redis store is to use
`Rails.cache`. You can find [documentation here][rails-cache-docs].

What is `Rails.cache` and how does it relate to Redis? Just like there
are many SQL implementations (Postgres, MySQL, Oracle, etc.), there
are many kinds of key-value stores (memcache is the older, primary
Redis alternative). Just as ActiveRecord abstracts away the difference
between the various SQL DB implementations, `Rails.cache` is a common
interface for interacting with various key-value stores.

Okay, let's start using the cache.

```
1.9.3-p448 :013 > Rails.cache.read("top-users")
 => nil
1.9.3-p448 :014 > Rails.cache.write("top-users"
, "GIZMO")
 => "OK"
1.9.3-p448 :015 > Rails.cache.read("top-users")
 => "GIZMO"
```

Okay, we looked up the key `"top-users"` and then later set something
to this value. Later reads were able to capture the value.

Let's update our model code:

```ruby
class User < ActiveRecord::Base
  def self.top_users
    Rails.cache.fetch("top-users") do
      force_top_users
    end
  end

  def self.force_top_users
    # long query here...
  end
end
```

Here we use the `#fetch` method; this checks the store to see if the
value has been previously computed. Only if it has not do we run the
block; in that case, we store the value for later re-use.

The key idea here is that the query executed in the block takes ~4sec,
but looking up the pre-calculated value in Redis is almost
instantaneous:

```
1.9.3-p448 :004 > User.top_users
   (3856.7ms)  SELECT
 post_authors.id
FROM
 users post_authors
JOIN
 posts ON post_authors.id = posts.user_id
JOIN
 comments ON posts.id = comments.post_id
JOIN
 users comment_authors ON posts.user_id = comment_authors.id
GROUP BY
 post_authors.id
ORDER BY
 COUNT(DISTINCT(comment_authors.id))
LIMIT
 10

 => [{"id"=>"11002"}, {"id"=>"11003"}, {"id"=>"11004"}, {"id"=>"11005"}, {"id"=>"11006"}, {"id"=>"11007"}, {"id"=>"11008"}, {"id"=>"11009"}, {"id"=>"11010"}, {"id"=>"11001"}]
1.9.3-p448 :005 > User.top_users
 => [{"id"=>"11002"}, {"id"=>"11003"}, {"id"=>"11004"}, {"id"=>"11005"}, {"id"=>"11006"}, {"id"=>"11007"}, {"id"=>"11008"}, {"id"=>"11009"}, {"id"=>"11010"}, {"id"=>"11001"}]
```

Notice how the first time I called `User.top_users`, I hit the DB, but
the second time I used the cached result. Cool!

One more note: this isn't just about SQL. For any calculation that
takes a long time, we can store the result for later re-use.

[rails-cache-docs]: http://api.rubyonrails.org/classes/ActiveSupport/Cache/Store.html

## Fresh and Stale

We're storing the top users in Redis so that we can quickly fetch
them, but as new users join, more posts are made, more comments are
made, the list of top users will change. That means that the
previously calculated result will go out of date.

We call the stored value a **cache entry**. The cache entry is
**fresh** when it is up-to-date and **stale** when it no longer
represents the current value.

Oftentimes it's okay that a result be a little stale, so long as it is
not **too** stale. For instance, maybe if a cache entry of top users
is >24hrs old, we shouldn't use it any more. When we store the entry,
we can tell Rails that it **expires** at a certain time, at which
point it is considered stale and can no longer be re-used:

```
[8] pry(main)> def cache_fetch
[8] pry(main)*   Rails.cache.fetch("key", :expires_in => 10.seconds) do
[8] pry(main)*     puts "recalculating!"
[8] pry(main)*     "val"
[8] pry(main)*   end
[8] pry(main)* end
=> nil
[9] pry(main)> cache_fetch
recalculating!
=> "val"
[10] pry(main)> cache_fetch
=> "val"
[11] pry(main)> sleep(10)
=> 10
[12] pry(main)> cache_fetch
recalculating!
=> "val"
```

Notice that after ten seconds the result is no longer considered
fresh, so instead of using the stale entry, `Rails.cache` recalculates
the value instead.

## References

* [Redis][redis]
* [Rails.cache][rails-cache-docs]

[redis]: http://redis.io/
