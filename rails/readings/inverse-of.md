# `inverse_of`

By now you know how to apply several different configuration options to your
`belongs_to` and `has_many` associations: `primary_key`, `foreign_key`,
`class_name`, `dependent`, `through`, and so on. In this reading, you will learn
how and why to apply the `inverse_of` option.

## The issue

You typically expect your associations to be _bi-directional_, with Rails
recognizing that corresponding `has_many` and `belongs_to` associations are two
sides of the same association. So, e.g., if you have the following associations:

```rb
class User < ApplicationRecord
  has_many :posts
end

class Post < ApplicationRecord
  belongs_to :user
end
```

then you can do this:

```rb
[1] pry(main)> user = User.first
  User Load (0.4ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT $1  [["LIMIT", 1]]
=> #<User:0x0000000106135400 id: 1, username: "baggins">
[2] pry(main)> post = user.posts.first
  Post Load (41.9ms)  SELECT "posts".* FROM "posts" WHERE "posts"."user_id" = $1 ORDER BY "posts"."id" ASC LIMIT $2  [["user_id", 1], ["LIMIT", 1]]
=> #<Post:0x0000000106275158 id: 1, user_id: 1, title: "First Post", body: "Here it is.">
[3] pry(main)> user.object_id == post.user.object_id
=> true
```

This is as you would expect: Rails recognizes that `post.user_id` points to the
already-loaded `user`. As a result, when you check the `object_id`s of `user`
and `post.user`, they are the same, i.e., both point to the same `User`
instance.

This works because Rails is able to recognize that `user.posts` and `post.user`
are _inverse_ associations. There are a couple situations, however, that will
prevent Rails from automatically inferring an inverse relationship.

E.g., consider what would happen if you have the following model associations:

```rb
class User < ApplicationRecord
  has_many :comments, foreign_key: :author_id
end

class Comment < ApplicationRecord
  belongs_to :author, class_name: :User
end
```

Executing the same code for comments as you did for posts produces some
surprising results:

```rb
[1] pry(main)> user = User.first
  User Load (0.4ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT $1  [["LIMIT", 1]]
=> #<User:0x000000010e10cfe8 id: 1, username: "baggins">
[2] pry(main)> comment = user.comments.first
  Comment Load (1.1ms)  SELECT "comments".* FROM "comments" WHERE "comments"."author_id" = $1 ORDER BY "comments"."id" ASC LIMIT $2  [["author_id", 1], ["LIMIT", 1]]
=> #<Comment:0x000000010e24d998 id: 1, author_id: 1, post_id: 1, title: "First Comment", body: "I'm actually commenting!">
[3] pry(main)> user.object_id == comment.author.object_id
  User Load (0.2ms)  SELECT "users".* FROM "users" WHERE "users"."id" = $1 LIMIT $2  [["id", 1], ["LIMIT", 1]]
=> false
```

Because the `User` `comments` association has a `foreign_key` option set, Rails
is not able to recognize that `user.comments` and `comment.author` are inverse
associations. Consequently, when you check for the `object_id` of
`comment.author`, Rails doesn't realize that the corresponding `User` is already
loaded. It instead queries the database to load the `author`, which creates a
new `User` instance with a different `object_id` than `user`. This wastes
memory, creates unnecessary database queries, and can even produce unexpected
results.

For instance, consider what happens if you change `user`'s `username` from
`baggins` to `peter_jackson` but do not immediately save the change to the
database:

```rb
[1] pry(main)> user = User.first
  User Load (1.5ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT $1  [["LIMIT", 1]]
=> #<User:0x000000010b977988 id: 1, username: "baggins", number: nil>
[2] pry(main)> user.username = "peter_jackson"
=> "peter_jackson"
```

`post` will correctly register the change:

```rb
[3] pry(main)> post = user.posts.first
  Post Load (42.6ms)  SELECT "posts".* FROM "posts" WHERE "posts"."user_id" = $1 ORDER BY "posts"."id" ASC LIMIT $2  [["user_id", 1], ["LIMIT", 1]]
=> #<Post:0x000000010bcaf420 id: 1, user_id: 1, title: "First Post", body: "Here it is.">
[4] pry(main)> post.user.username
=> "peter_jackson"
```

`comment`, however, will not acknowledge the change (because it doesn't know
about `user` and so must load its information from the database):

```rb
[5] pry(main)> comment = user.comments.first
  Comment Load (48.2ms)  SELECT "comments".* FROM "comments" WHERE "comments"."author_id" = $1 ORDER BY "comments"."id" ASC LIMIT $2  [["author_id", 1], ["LIMIT", 1]]
=> #<Comment:0x000000010ba8dfe8 id: 1, author_id: 1, post_id: 1, title: "First Comment", body: "I'm actually commenting!">
[6] pry(main)> comment.author.username
  User Load (0.2ms)  SELECT "users".* FROM "users" WHERE "users"."id" = $1 LIMIT $2  [["id", 1], ["LIMIT", 1]]
=> "baggins"
```

Now `user` and `comment.author` purportedly point to the same `User`, but they
will return different `username`s!

## The solution: Establish bi-directional associations with `inverse_of`

Fortunately, Rails makes it relatively easy to avoid this latter scenario. In
situations where Rails cannot infer the correct inverse association, you can
simply specify the inverse by using the `inverse_of` option on the `has_many` /
`has_one` side of the association:

```rb
class User < ApplicationRecord
  has_many :comments, foreign_key: :author_id, inverse_of: :author
end

class Comment < ApplicationRecord
  belongs_to :author, class_name: :User
end
```

Now when you run the comment scenario, you get the expected results:

```rb
[1] pry(main)> user = User.first
  User Load (0.4ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT $1  [["LIMIT", 1]]
=> #<User:0x00000001097bd130 id: 1, username: "baggins">
[2] pry(main)> comment = user.comments.first
  Comment Load (0.5ms)  SELECT "comments".* FROM "comments" WHERE "comments"."author_id" = $1 ORDER BY "comments"."id" ASC LIMIT $2  [["author_id", 2], ["LIMIT", 1]]
=> #<Comment:0x000000010988e280 id: 1, author_id: 1, post_id: 1, title: "First Comment", body: "I'm actually commenting!">
[3] pry(main)> user.object_id == comment.author.object_id
=> true
```

Success!

### When does Rails need help setting inverses?

> Note: The situations in which Rails can and will automatically assign an
> association's inverse differ by version. If you are working with legacy code,
> be sure to check the rules for your specific version.

When will Rails be unable to infer an inverse? As mentioned above, Rails cannot
establish the inverse of any association that has the `foreign_key` option set.
In other words, if either part of a bi-directional association includes a
`foreign_key` option, add an `inverse_of` option to the `has_many` / `has_one`
association.

A `through` option will also prevent Rails from automatically setting an
inverse. The lack of an inverse in this situation, however, produces a somewhat
different problem. In this case, you should check whether or not the `through`
references a join table (as opposed to, e.g., nested `has_many` associations).
If it does, then you should add `inverse_of` to the `belongs_to` association on
the join model, like this:

```rb
class Like < ApplicationRecord
  belongs_to :user, inverse_of: :likes
  belongs_to :post, inverse_of: :likes
end

class User < ApplicationRecord
  has_many :posts
  has_many :likes
  has_many :liked_posts, through: :likes, source: :post # i.e., posts that the user has liked
end

class Post < ApplicationRecord
  belongs_to :user
  has_many :likes
  has_many :likers, through: :likes, source: :user
end
```

This is necessary to ensure that if you, e.g., create a post through the
`liked_posts` association--i.e., essentially creating and liking a post at the
same time--that saving the newly created post to the database will also create
the intervening `Like` joining the user to the liked post:

```rb
[1] pry(main)> user = User.first
  User Load (0.6ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT $1  [["LIMIT", 1]]
=> #<User:0x00000001074ce700 id: 1, username: "baggins", number: nil>
[2] pry(main)> post = user.liked_posts.new title: "Creating a Liked Post!", user: user
=> #<Post:0x00000001077e7270 id: nil, user_id: 1, title: "Creating a Liked Post!", body: nil>
[3] pry(main)> post.save!
  TRANSACTION (0.2ms)  BEGIN
  User Load (3.9ms)  SELECT "users".* FROM "users" WHERE "users"."id" = $1 LIMIT $2  [["id", 1], ["LIMIT", 1]]
  Post Create (1.5ms)  INSERT INTO "posts" ("user_id", "title", "body") VALUES ($1, $2, $3) RETURNING "id"  [["user_id", 1], ["title", "Creating a Liked Post!"], ["body", nil]]
  Like Create (1.5ms)  INSERT INTO "likes" ("liker_id", "post_id", "created_at", "updated_at") VALUES ($1, $2, $3, $4) RETURNING "id"  [["liker_id", 1], ["post_id", 4], ["created_at", "2022-07-18 16:07:39.820757"], ["updated_at", "2022-07-18 16:07:39.820757"]]
  TRANSACTION (23.3ms)  COMMIT
=> true
```

> Note: The reason you add `inverse_of` to the `belongs_to` association in this
> scenario and not when you have a `foreign_key` option has to do with how Rails
> sets and uses inverses behind the scenes. Don't worry about that now, just
> learn the pattern. If you want more information on the issue that can arise
> for join tables without `inverse_of`, see [here][Setting Inverses].

The final area that can create issues with automatic `inverse_of` assignment are
associations with scopes. You can read more about those situations
[here][bi-directional-guide].

Of course, it is also always possible that an unusual model or association name
will stump Rails and keep it from finding the correct inverse. If you are ever
in doubt as to Rails's ability to find the correct inverse, just be explicit and
add the `inverse_of` option.

## References

* [Rails guide to bi-directional associations][bi-directional-guide]
* [Setting Inverses]

## What you have learned

In this reading, you learned why you should apply an explicit `inverse_of`
option to

* any `has_many` / `has_one` association where the `has_many` or its
corresponding `belongs_to` contains a `foreign_key` option
* any `belongs_to` on a join model that is used in a `has_many :through`
  association

Finally, if you are ever in doubt as to whether or not you need to apply an
`inverse_of` option, go ahead and apply it.

[bi-directional-guide]: https://guides.rubyonrails.org/association_basics.html#bi-directional-associations
[Setting Inverses]: https://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html#module-ActiveRecord::Associations::ClassMethods-label-Setting+Inverses
