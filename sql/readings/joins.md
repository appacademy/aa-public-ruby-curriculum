# Joins in Active Record

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

## ActiveRecord::Base::joins

When you were writing raw SQL, you learned that the `JOIN` clause was a powerful
tool that allowed you to combine rows from different tables to find information
about related data in these tables. For example, if you wanted to find all of
the comments made by a `User` with the `user_name` 'tamboer', you could make a
query like this:

```SQL
SELECT
  comments.*
FROM
  comments
JOIN
  users ON users.id = comments.author_id
WHERE
  users.user_name = 'tamboer';
```

To fire the exact same query using Active Record methods, you would write
`Comment.joins(:author).where(users: { user_name: 'tamboer' })`.

Let's break this line down. First, you start with the `Comment` model. This
already tells Active Record that the `FROM` clause of your query should use the
`comments` table. Then you call the `joins` method and pass in `:author` as an
argument.

  > **NOTE:** When you are using the `joins` method you do not pass in the name
  > of a table. Instead, you are passing in the name of an **association** that
  > has been defined. Since the association has already been defined with a
  > class name, foreign key, and primary key, Active Record can determine
  > exactly how to join your two tables together.

Finally, in your call to the `where` method you pass a hash of `{ users: {
user_name: 'tamboer' } }`. You've seen simpler uses of `where` in which you just
pass a key-value pair, with the key referencing a column name and the value
being the value you want to match. When you pass a nested hash like this, the
outermost key is the name of a table and the innermost hash has a key that is a
column name in that table. When you join two tables together, you want to be
specific about which table the column names you are matching come from. You
could also replace your original call to `where` with `where("users.user_name =
'tamboer'")`. It's important to note that, even though you used the name of the
association in your call to `joins`, you still use the real name of the table
when you are referencing one of its columns.

### More complex `joins`

If you want to join more than one table to another, the syntax for the
`ActiveRecord::Base::joins` method doesn't get much more complicated. If you
have a `through` association defined on a model, it's as simple as just using
the name of the association.

`User.joins(:post_feedback)` generates this query

```SQL
SELECT
  users.*
FROM
  users
JOIN
  posts ON posts.author_id = users.id
JOIN
  comments ON comments.post_id = posts.id
```

The `post_feedback` association has already been set up to go from the `users`
table, through the `posts` table, to the `comments` table. If you didn't have
this `through` association defined for you, you could write `User.joins(posts:
:comments)`. Check out the [Active Record Guides on joins][joins] for more info
on this syntax!

You can also call the `joins` method on an `ActiveRecord::Relation` object. For
example:

```ruby
post = Post.find(1)
post.comments.joins(:author)
# The line above generates the query
# SELECT comments.* 
#   FROM comments 
#   JOIN users ON users.id = comments.author_id 
#  WHERE comments.post_id = 1
```

The `WHERE comments.post_id = 1` portion of that query came from the fact that
you used the `comments` association on a post with an `id` of 1. This filtering
remains even when you add a call to `joins` afterwards. Gotta love laziness and
stacking!

## Using `select` with `joins`

If you don't add a call to `select` to your call to `joins`, you'll only have
access to columns from the primary table in your query.

```ruby
users = User.joins(:posts)
users[0].user_name # => 'ruggeri'
users[0].title # => undefined method 'title' for User object
```

This is because the select statement was defaulted to `users.*`. If you wanted
the `User` objects you got back from your query to have access to attributes
from the `posts` table, you would have to say that explicitly:

```ruby
users = User.joins(:posts).select("users.*, posts.*")
users[0].user_name # => "ruggeri"
users[0].title # => "First post!"
```

If you just examine the `User` object, you won't see the `title` attribute:

```ruby
users[0]
=> id: 1,
 user_name: "ruggeri",
 first_name: "Ned",
 last_name: "Ruggeri",
 created_at: Tue, 03 Apr 2018 14:39:57 UTC +00:00,
 updated_at: Tue, 03 Apr 2018 14:39:57 UTC +00:00>
```

This is because the `inspect` method for `User` objects only shows attributes
that are column names from the `users` table. But if you use the `#attributes`
method, you can see all of the attributes that your `User` has access to:

```ruby
users[0].attributes
=>{"id"=>1,
   "user_name"=>"ruggeri",
   "first_name"=>"Ned",
   "last_name"=>"Ruggeri",
   "created_at"=>Tue, 03 Apr 2018 14:39:57 UTC +00:00,
   "updated_at"=>Tue, 03 Apr 2018 14:39:57 UTC +00:00,
   "title"=>"First post!",
   "body"=>"First posting is fun!",
   "author_id"=>1}
```

You can also alias attributes in a call to `select`. This is especially useful
if you have columns from two different tables with the same name. Consider
`created_at` as a trivial example:

```ruby
Post.create!(author_id: 1, title: "Who loves active record?", body: "If you like active record say yeah!")
users = User.joins(:posts).select("users.*, posts.created_at as post_creation_time")

users[0].attributes
=> {"id"=>1,
 "user_name"=>"ruggeri",
 "first_name"=>"Ned",
 "last_name"=>"Ruggeri",
 "created_at"=>Tue, 03 Apr 2018 14:39:57 UTC +00:00,
 "updated_at"=>Tue, 03 Apr 2018 14:39:57 UTC +00:00,
 "post_creation_time"=>"2018-04-03 14:39:57.563795"}

 users[1].attributes
 {"id"=>1,
 "user_name"=>"ruggeri",
 "first_name"=>"Ned",
 "last_name"=>"Ruggeri",
 "created_at"=>Tue, 03 Apr 2018 14:39:57 UTC +00:00,
 "updated_at"=>Tue, 03 Apr 2018 14:39:57 UTC +00:00,
 "post_creation_time"=>"2018-04-03 20:04:13.596728"}
```

First, note that you have an attribute called `"post_creation_time"` that you
can now access on your `User` objects because that's what you gave as an alias
in your call to `select`. Second, note that `users[0]` and `users[1]` both have
the attributes of your `ruggeri` user, but they have different values for
`post_creation_time`. Don't forget that if you're joining the `users` table to
the `posts` table, it is possible to have two rows that refer to the same user
with different posts. In raw SQL, the resulting table from selecting `*` and
joining `users` to `posts` would look something like this:

<table>
  <tr>
    <td>id</td>
    <td>user_name</td>
    <td>first_name</td>
    <td>last_name</td>
    <td>created_at</td>
    <td>updated_at</td>
    <td>id</td>
    <td>title</td>
    <td>body</td>
    <td>author_id</td>
    <td>created_at</td>
    <td>updated_at</td>
  </tr>
  <tr>
    <td>1</td>
    <td>ruggeri</td>
    <td>Ned</td>
    <td>Ruggeri</td>
    <td>2018-04-03 14:39:57.486206</td>
    <td>2018-04-03 14:39:57.486206</td>
    <td>1</td>
    <td>First post!</td>
    <td>First posting is fun!</td>
    <td>1</td>
    <td>2018-04-03 14:39:57.563795</td>
    <td>2018-04-03 14:39:57.563795</td>
  </tr>
  <tr>
    <td>1</td>
    <td>ruggeri</td>
    <td>Ned</td>
    <td>Ruggeri</td>
    <td>2018-04-03 14:39:57.486206</td>
    <td>2018-04-03 14:39:57.486206</td>
    <td>2</td>
    <td>Who loves active record?</td>
    <td>If you like active record say yeah!</td>
    <td>1</td>
    <td>2018-04-03 20:04:13.596728</td>
    <td>2018-04-03 20:04:13.596728</td>
  </tr>
</table>

The first row becomes the first element in your `ActiveRecord::Relation` object;
the second row becomes the second element in your object.

Check out the [Active Record Guides on joins][joins] for more info!

[joins]: http://guides.rubyonrails.org/active_record_querying.html#joining-tables
