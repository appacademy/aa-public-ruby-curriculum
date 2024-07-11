# Active Relation

## Queries are lazy

Querying methods like `group`, `having`, `includes`, `joins`, `select`, and
`where` return an object of type `ActiveRecord::Relation`. The `Relation` object
looks a lot like an `Array`; like an `Array`, you can iterate through it or
index into it.

There is one major difference from an `Array`: the contents of `Relation` are
not fetched until needed. This is called _laziness_.

```ruby
users = User.where('likes_dogs = ?', true) # no fetch yet!

# performs fetch here
users.each { |user| puts "Hello #{user.name}" }
# does not perform fetch; result is "cached"
users.each { |user| puts "Hello #{user.name}" }
```

The `Relation` is not evaluated (i.e., a database query is not fired) until the
results are needed. In this example, on the first line where `users` is
assigned, the result is not yet needed. Only when you call `each` the first time
do you actually need the results, forcing the query.

### Caching

After the query is run, the results are _cached_ by `Relation`; they are stored
for later re-use. Subsequent calls to `each` will not fire a new query; they
will instead use the prior result. This is an advantage because you can re-use
the result without constantly hitting the database over and over again.

This can sometimes result in unexpected behavior, however. First, note that when
accessing a relation (e.g., `user1.posts`), a `Relation` object is returned. The
relation is itself cached inside the model object (e.g., `user1`) so that future
invocations of the association will not hit the DB.

```ruby
# Fires a query; `posts` relation stored in `user1`.
p user1.posts
# => []
p user1.posts.object_id
# => 70232180387400

Post.create!(
  user_id: user1.id, # THIS LINE IS KEY, BECAUSE IT TIES THE POST TO THE USER IN THE DATABASE
  title: 'Title',
  body: 'Body body body'
)

# Does not fire a query; uses cached `posts` relation, which itself
# has cached the results.
p user1.posts
# => []
p user1.posts.object_id
# => 70232180387400
```

Here `user1.posts` fires a query the first time. The second time, `user1.posts`
uses the prior result. The cached result, however, is out of date; in between
the first time you called `user1.posts` and the second time, you added a new
`Post` for the user. This is not reflected in the `user1.posts` variable.

This behavior can be surprising, but it actually is not a common issue. You can
always force an association to be reloaded (ignoring any cached value) by
calling `user1.posts(true)`. You may also call `user1.reload` to throw away all
cached association relations. This is seldom necessary, however.

## Laziness and stacking queries

Caching results makes sense: it saves DB queries. But why is laziness a good
thing?

Laziness allows you to build complex queries. Here's an example:

```ruby
georges = User.where('first_name = ?', 'George')
georges.where_values_hash
# => {first_name: 'George'}

george_harrisons = georges.where('last_name = ?', 'Harrison')
george_harrisons.where_values_hash
# => {first_name: 'George', last_name: 'Harrison'}

p george_harrisons
```

In this somewhat silly example, you call `where` twice. The first call to
`where` returns a `Relation` which knows to filter by `first_name` (the
condition is stored in the `where_values_hash` attribute). Next, you call
`where` on this `Relation`; this produces a new `Relation` object which will
know to filter by both `first_name` and `last_name` (you can see that
`where_values_hash` was extended).

Note that the additional `where` created a new `Relation`; the original
`georges` is not changed.

The `Relation` returned by the first `where` is never evaluated. Instead, you
build a second `Relation` from it. Here laziness helps you; it lets you build up
a query by chaining query methods, none of which are executed until the chain is
finished being built and evaluated.

Just like `where` has a `where_values_hash` attribute, there are similar
(private) accessors for `includes_values`, `joins_values`, etc. You won't ever
access the attributes directly, but you can see how `Relation` builds up the
query by storing each of the conditions. When the `Relation` needs to be
evaluated, Active Record looks at each of these values to build the SQL to
execute.

## Forcing evaluation

If you wish to force the evaluation of a `Relation`, you may call `load`. This
will force evaluation if it hasn't been done already. Using `to_a` will return
an _actual_ array.

Some other methods, like `count` will also force the evaluation of a query.

### Count vs. Length vs. Size

While all three of these methods will return the number of records in the
evaluated query, they do so in slightly different ways. When you call `count` on
a relation, you will execute a SQL query (`SELECT COUNT(*) FROM ...`). Calling
`length`, on the other hand, will load the entire collection into memory,
convert it to an array, and then call `Array#length` on it. If used incorrectly,
this could be an incredibly expensive operation (imagine if you have millions of
users and call `User.all.length`).

If all you care about is returning the number of records--and nothing else--use
`count` because it allows you to avoid loading the collection into memory.
However, if you are going to load the collection into memory anyway, you should
use `length` because you can avoid having to do another query altogether (since
the collection will be cached in memory). `size` combines the two methods: if
the collection is already loaded, it will count the elements without making a
new query; if the collection is not already loaded, it will execute an
additional query.

## References

* [Active Record Relation][relation]
* [Active Record Query Methods][query-methods]
* [Count vs. Length vs. Size][count]

[relation]: http://api.rubyonrails.org/classes/ActiveRecord/Relation.html
[query-methods]: http://api.rubyonrails.org/classes/ActiveRecord/QueryMethods.html
[count]: https://mensfeld.pl/2014/09/activerecord-count-vs-length-vs-size-and-what-will-happen-if-you-use-it-the-way-you-shouldnt/
