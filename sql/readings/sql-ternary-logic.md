# NULL And Ternary Logic In SQL

SQL uses **ternary logic**. This means that a conditional statement can evaluate
to `TRUE`, `FALSE`, or `NULL`. Whaaaa? That is strange.

How in the world do you get a conditional statement to return `NULL`? You
compare something to `NULL`, that's how!

Incidentally, `NULL` compared to anything (including `NULL`) is `NULL`, and
`NULL` is falsy, so `WHERE` clauses that compare to `NULL` will _always_ return
nothing. This is why you see `IS NULL` and `IS NOT NULL` in SQL queries instead
of `= NULL` or `!= NULL`.

## The interpolation problem

Consider now what happens when you try to interpolate something that might be
`NULL` into a where clause. A classic case of this would be excluding an
individual from a set.

```ruby
User.where('id != ?', user.id)
```

This works fine so long as the user is saved to the DB and has an `id`. If
they're not saved though, this will evaluate to `id != NULL` and return no
results. At the same time, you can't say `id IS NOT ?` because that will fail if
there _is_ an `id`.

You're darned if you do and darned if you don't!

## Rails magic

You might be wondering why you've never come across this problem before. There's
a reason for that, and its name is _magic_. Whenever you've used `nil` inside a
`where` before this, Rails just knew how to deal with it:

```ruby
User.where(email: nil)
```

This works just fine because Rails detects that `email` is being compared to
`NULL` and sets up the correct verbiage for SQL. The problem is arising now
because you want to negate the comparison, so you're using a **SQL fragment**.
This locks Rails into your pre-set SQL so it can't work its magic.

So how do you make this work? How do you bring back the magic?

You need the magic of `where`, but the power of `!`. You need
[`where.not`][where-not]!

```ruby
User.where.not(id: user.id)
```

Now Rails is free to do its `IS NOT` magic without your SQL fragment in the way.
This query will work as intended.

[where-not]: https://thoughtbot.com/blog/activerecords-wherenot
