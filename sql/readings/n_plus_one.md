## N+1 Queries

This reading refers heavily to the [Joins Demo][joins-demo]. Please clone the
repo and follow along in the Rails console as you read.  

[joins-demo]: https://github.com/appacademy/practice-for-ch-sql-joins-demo

## Schema overview

Familiarize yourself with the schema for this project:

```ruby
# db/schema.rb
ActiveRecord::Schema[7.0].define(version: 2022_05_13_155927) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text "body", null: false
    t.bigint "author_id", null: false
    t.bigint "post_id", null: false
    t.bigint "parent_comment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string "title", null: false
    t.text "body", null: false
    t.bigint "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "user_name", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
```

## The N+1 queries problem

Let's write some code to get the number of comments per `Post` by a `User`:

```ruby
# app/models/user.rb
class User < ApplicationRecord
  # ...

  def n_plus_one_post_comment_counts
    posts = self.posts
    # SELECT *
    #   FROM posts
    #  WHERE posts.author_id = ?
    #
    # where `?` gets replaced with `user.id`

    post_comment_counts = {}
    posts.each do |post|
      # This query gets performed once for each post. Each db query has 
      # overhead, so this is very wasteful if there are a lot of `Post`s for the
      # `User`.
      post_comment_counts[post] = post.comments.length
      # SELECT *
      #   FROM comments
      #  WHERE comments.post_id = ?
      #
      # where `?` gets replaced with `post.id`
    end

    post_comment_counts
  end
end
```

At first sight, this code looks fine. The problem lies with the total number of
queries executed. The above code executes 1 query (to find the user's posts) +
"N" queries (one per post to find the comments) for N+1 queries in total.

This is inefficient. Consider if a user had 10,000 posts: you'd make 10,000
queries for comments. You will next see a way to perform one query to grab all
the comments instead of N queries. Even though you will receive the same number
of total `comments` rows, doing all the work in one query is much more
efficient. Each query to the database has some fixed overhead associated with
it, so batching up work into one query is a major efficiency win.

### Solution to the N+1 queries problem

The solution to this problem is to fetch all the `Comment`s for all the `Post`s
in one go rather than fetching them one-by-one for each `Post`.

Active Record lets you specify associations to prefetch: just use the `includes`
method. If you use `includes` to prefetch data (e.g., `posts =
user.posts.includes(:comments)`), a subsequent call to access the association
(e.g., `posts[0].comments`) won't fire another DB query; it'll simply use the
prefetched data.

Revisiting the above case, you could rewrite `post_comment_counts` to use _eager
loading_:

```ruby
# app/model/user.rb
class User < ApplicationRecord
  # ...

  def includes_post_comment_counts
    # `includes` *prefetches the association* `comments`, so it doesn't need to
    # be queried later. `includes` does not change the type of the object
    # returned (in this example, `Post`s); it only prefetches extra data.
    posts = self.posts.includes(:comments)
    # Makes two queries:
    # SELECT *
    #   FROM posts
    #  WHERE post.author_id = ?
    #
    # where `?` is replaced with `user.id`.
    #
    # ...and...
    #
    # SELECT *
    #   FROM comments
    #  WHERE comments.post_id IN ?
    #
    # where `?` is replaced with `self.posts.map(&:id)`, the `Array` of `Post`
    # ids.

    post_comment_counts = {}
    posts.each do |post|
      # doesn't fire a query, since already prefetched the association; way
      # better than N+1
      #
      # N.B.: if you write `post.comments.count`, Active Record will try to be
      # super-smart and run a `SELECT COUNT(*) FROM comments WHERE
      # comments.post_id = ?` query. This is because Active Record understands
      # `#count`. But you already fetched the comments and don't want to go back
      # to the DB, so you can avoid this behavior by calling `Array#length`.
      post_comment_counts[post] = post.comments.length
    end

    post_comment_counts
  end
end
```

The above code will execute just **2** queries as opposed to **N+1** queries.
When there are many posts, this is a major win.

Normally you should wait until you see performance problems before returning to
optimize code ("premature optimization is the root of all evil"). N+1 queries,
however, are so egregious that you should avoid them from the beginning.
Consider N+1 queries an error; they are never the right solution.

### Complex includes

You can eagerly load as many associations as you like:

```ruby
comments = user.comments.includes(:post, :parent_comment)
```

Then both the `post` and `parent_comment` associations are eagerly loaded.
Neither `comments[0].post` nor `comments[0].parent_comment` will hit the DB;
they've been prefetched.

You can also do "nested" prefetches:

```ruby
posts = user.posts.includes(comments: [:author, :parent_comment])
first_post = posts[0]
```

This not only prefetches `first_post.comments`, it also will prefetch
`first_post.comments[0]` and even `first_post.comments[0].author` and
`first_post.comments[0].parent_comment`.

### `strict_loading`

As of Rails 6.1, you can test your methods for N+1 queries using
`strict_loading`. `strict_loading` will throw an error if you try to access an
association that has not been eagerly loaded. For instance, running

```rb
User.strict_loading.first.n_plus_one_post_comment_counts
```

will produce the following error:

```rb
ActiveRecord::StrictLoadingViolationError: `User` is marked for strict_loading. The Post association named `:posts` cannot be lazily loaded.
```

`User.strict_loading.first.includes_post_comment_counts`, however, will run
without problem.

`strict_loading` can be enabled for a record, an association, a model, or even a
whole application. While it is useful for testing and protecting against N+1
queries, be wary of applying it indiscriminately. Although lazy loading is
clearly not desirable in cases of N+1 queries, in many other situations it will
represent the more efficient approach. There is a reason, after all, that lazy
loading is the default behavior in Rails.

## Joining Tables

Here's how you can use `joins` to solve your N + 1 problem.

You've seen how to eagerly load associated objects to dodge the N+1 queries
problem, but you may run into another problem: `includes` returns **lots** of
data. E.g., `user.posts.includes(:comments)` will return every `Comment` on
every `Post` that the `User` has written. This may be many, many comments. If,
for instance, all you want to do is count the comments per post, loading all of
these comments is wasteful since the `Comment`s themselves are useless for your
query.

In this case, you're doing too much in Ruby: you want to push some of the
counting work to SQL so that the database does it and you receive just `Post`
objects with associated comment counts. This is another major use of `joins`:

```ruby
# app/models/user.rb
class User
  # ...

  def joins_post_comment_counts
    # You use `includes` when you need to prefetch an association and use those
    # associated records. If you only want to *aggregate* the associated records
    # somehow, `includes` is wasteful because all the associated records are
    # pulled down into the app.
    #
    # For instance, if a `User` has posts with many, many comments, you would
    # pull down every single comment. This may be more rows than your Rails app
    # can handle. And you don't actually care about all the individual rows, you
    # just want the count of how many there are.
    #
    # When you want to do an "aggregation" like summing the number of records
    # (and don't care about the individual records), you want to use `joins`.

    posts_with_counts = self
      .posts
      .select("posts.*, COUNT(*) AS comments_count") # more in a sec
      .joins(:comments)
      .group("posts.id") # "comments.post_id" would be equivalent
    # in SQL:
    #   SELECT posts.*, COUNT(*) AS comments_count
    #     FROM posts
    #    JOINS comments
    #       ON comments.post_id = posts.id
    #    WHERE posts.author_id = #{self.id}
    # GROUP BY posts.id
    #
    # As you've seen before, using `joins` does not change the type of object
    # returned: this returns an `Array` of `Post` objects.
    #
    # But you do want some extra data about the `Post`: how many comments were
    # left on it. You can use `select` to pick up some "bonus fields" and give 
    # you access to extra data.
    #
    # Here, you want to have the database count the comments per post and store
    # this in a column named `comments_count`. The magic is that Active Record
    # will give you access to this column by dynamically adding a new method to
    # the returned `Post` objects; you can call `#comments_count` and it will
    # access the value of this column:

    posts_with_counts.map do |post|
      # `#comments_count` will access the column you `select`ed in the query.
      [post.title, post.comments_count]
    end
  end
end
```

### OUTER JOINs

By default, `joins` performs an `INNER JOIN`. In the previous example, you will
not receive any posts with zero comments because there will be no comment row to
join the post against.

If you want to include posts with zero comments, you need to do an outer join.
You can do this like so:

```ruby
posts_with_counts = self
  .posts
  .select('posts.*, COUNT(comments.id) AS comments_count')
  .left_outer_joins(:comments)
  .group('posts.id') # "comments.post_id" would be equivalent
```

## For Further Reading

* [Rails Guide to Eager Loading Associations][ror-eager-loading]
* [Comparing `includes`, `preload`, and `eager_load`][comparison]
* [Summary of Differences in Prefetching Options][summary]

[ror-eager-loading]: https://guides.rubyonrails.org/active_record_querying.html#eager-loading-associations
[comparison]: http://blog.arkency.com/2013/12/rails4-preloading/
[summary]: https://dev.to/delbetu/join-vs-includes-vs-eager-load-vs-preload-36l3
