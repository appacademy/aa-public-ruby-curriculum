# Reddit On Rails (Bonus)

* [Project Demo]
* [Actual Reddit]

[Project Demo]: https://aa-reddit-app.herokuapp.com/
[Actual Reddit]: https://www.reddit.com

## Bonus I: Votes

A major feature of Reddit is the ability to upvote/downvote posts and comments.
Write a `Vote` model which allows users to vote on posts or comments. Because
a `Vote` can be for one of two kinds of things, you'll want to use a polymorphic
association for this.

Write a `Vote` model with a `value` attribute, which should be either `+1` or
`-1`. Add a polymorphic association `Vote#votable`. Also add `votes`
associations to both `Post` and `Comment`.

On the `SubsController#show` page, add up/downvote buttons for each post; add
up/downvote buttons for each comment on the `PostsController#show` page. Add the
appropriate `upvote` and `downvote` custom member routes for POST requests to
`posts` and `comments`, e.g., `/posts/123/upvote` and `/comments/123/downvote`.

Finally, sort the posts on the `SubsController#show` page by score; likewise,
sort each level of comments by score.

## Bonus II: Scopes

How did you sort the posts and comments by score? Did you use a Ruby method like
`sort` or `sort_by`? That will work, but that kind of calculation is exactly
what databases do well. It will accordingly be more efficient to have the
database return the posts and comments already sorted by score instead of
sorting by score in Ruby with a Ruby method. You can do this by using [scopes]
on the appropriate `has_many` associations.

Before implementing this bonus, refresh a few post- and comment-heavy pages
several times. Look at your server log to see how many times you are hitting the
database for each refresh, and how long each page takes on average. This is your
baseline that you are trying to improve.

### Sorting results

Scopes provide a way of customizing a query. You define scope blocks using the
`-> {}` syntax immediately after the name of your association, like this:

```rb
has_many :posts, -> { ... }, dependent: :destroy
```

Inside the `{ }`s, you can use any of the normal Active Record [querying
methods]: `where`, `includes`, `joins`, `select`, `group`, `order`, and so on.
For example, the following scope block:

```rb
class Sub < ApplicationRecord
  has_many :posts, -> { where(author: User.first) }, dependent: :destroy
end
```

will cause `Sub#posts` to return only the posts authored by the first `User`.

The query you need is a bit more complicated. Essentially, you want to construct
a query that will return the posts sorted by the sum of the values stored for
each post on the `votes` table. Here are a few things to keep in mind as you
think about how to construct your query:

* You will need to join the `posts` table to the `votes` table, but consider
  carefully what kind of `join` you want. What are your options, and how will
  the results differ with each?

* Posts that have no votes will have a score of `NULL`, which PostgreSQL
  considers to be larger than any non-`NULL` value. So if you sort in descending
  order, the posts with no votes will all appear first. In other words, posts
  with an effective score of 0 will appear ahead of those with higher scores. To
  address this issue, consider using [`COALESCE`].

* If you get this error:

  ```text
  Dangerous query method (method whose arguments are used as raw SQL) called with non-attribute argument(s)
  ```

  you are likely passing a potentially unsafe SQL string to your database to
  run. Rails is concerned that the string may leave you open to a SQL injection
  attack. If you are sure your string is safe to run--if it does not incorporate
  any user input, you are probably good!--you can eliminate this error by
  wrapping the string with [`Arel.sql()`]. (`Arel.sql()` essentially tells Rails
  that you know what you are doing; Rails will accordingly stop worrying about
  the string and just run it.)

Once you get your scope working for posts, add a similar scope to
`Post#comments`.

### Counting votes

You probably have a method for counting a `votable`'s vote score that involves
summing the values of the `votable`'s votes. This method also likely results in
several queries to your database. This is wasteful, especially since your
`has_many` associations now have the database perform that exact calculation.
Once you've done a calculation, there's no reason to keep querying the database
to calculate it again.

The challenge is how to capture the vote score that the associations calculate.
After all, you don't have (and don't need to have) an extra `votes` column on
your `posts` or `comments` table. But there's no reason you can't store the
information in a local variable...

To achieve this, you need PostgreSQL to store the calculated value in a named
column that will be returned as part of the result. (Hint: use `AS`.) That named
column will not show up if you examine the returned `posts`/`comments` because
it is not part of their models. But it is there. So, e.g., if you name the
column `num_votes` then you should be able to do this:

```rb
[1] pry(main)> comment = Post.first.comments.first
  # ... SQL Query hidden :) ...
=> #<Comment:0x00000001108fe290
 id: 1,
 body: "Not me...",
 parent_comment_id: nil,
 post_id: 1,
 author_id: 1,
 created_at: Thu, 30 Jun 2022 17:54:32.426599000 UTC +00:00,
 updated_at: Thu, 30 Jun 2022 17:54:32.426599000 UTC +00:00>
[2] pry(main)> comment.num_votes
=> 2
```

Once you get this set up correctly, you can return this value from your method
that counts votes, no further database querying needed!

A couple caveats:

1. It is likely that your vote-counting method will be called at times from a
   post/comment that has not been generated from your `has_many` scopes. You
   need to account for that case.

2. Trying to access `post.num_votes` if `num_votes` is not defined will crash
   your program. You may accordingly find [this method][defined?] helpful.

When you finish, refresh the same pages that you did at the beginning of this
bonus and check the server logs. How do the database hits and average time
compare?

## Ideas for future enhancements

* Use the [Friendly ID][friendly-id] gem to use human readable names in urls for
  posts and subs.
* Use the [kaminari] gem to paginate posts on the `SubsController#show` page.
* Enable users to subscribe to specific `subs` and only see `posts` from those
  `subs` on the `index` page.
* Enable users to search for any `sub`, including ones they aren't subscribed
  to.
* Have the user `show` page display all of a user's `posts`, `comments`, and the
  total number of `votes` they've received from other people for their `posts`
  and `comments`.
* Add lots of seeds with [Faker][faker].
* Style your Reddit app! Try to make it look as much like actual Reddit as you
  can.

[querying methods]: https://guides.rubyonrails.org/active_record_querying.html#retrieving-objects-from-the-database
[scopes]: https://guides.rubyonrails.org/association_basics.html#scopes-for-has-many
[`COALESCE`]: https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-COALESCE-NVL-IFNULL
[`Arel.sql()`]: https://api.rubyonrails.org/classes/Arel.html
[defined?]: https://ruby-doc.org/docs/keywords/1.9/Object.html#method-i-defined-3F
[faker]: https://github.com/stympy/faker
[kaminari]: https://github.com/amatsuda/kaminari
[friendly-id]: https://github.com/norman/friendly_id
