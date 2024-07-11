# Heredocs

We know how to format SQL code in a `.sql` file, but what if we mix SQL into our
Ruby code? The answer is to use a **heredoc** to write multi-line strings with
ease:

```ruby
query = <<-SQL
SELECT
  *
FROM
  posts
JOIN
  comments ON comments.post_id = posts.id
SQL

db.execute(query)
```

This replaces `<<-SQL` with the text on the next line, up to the closing `SQL`.
We could use any string for the start and end of a heredoc; `SQL` is just the
convention when we are embedding SQL code.

A heredoc produces a string just like quotes do, and it will return into the
place where the opening statement is. For example, this works as well:

```ruby
db.execute(<<-SQL, post_id)
SELECT
  *
FROM
  posts
JOIN
  comments ON comments.post_id = posts.id
WHERE
  posts.id = ?
SQL
```

Notice the use of the `?` interpolation mark; the Ruby variable `post_id` will
be inserted into the query at the `?`.

It is also possible to pass variables to a query using key-value pairs.

```ruby
db.execute(<<-SQL, post_id: post_id)
SELECT
  *
FROM
  posts
JOIN
  comments ON comments.post_id = posts.id
WHERE
  posts.id = :post_id
SQL
```

In this case, the corresponding value is inserted into the query in place of the
symbol `:post_id`.

What's the difference between using a `?` versus a key-value pair? Values bound
to the `?` are done so positionally. So the first argument passed to a heredoc
corresponds to the first `?` in your SQL query code.

On the other hand, in key-value pairs the key acts as the placeholder for its
corresponding value variable. As a result, the order of key-value pair arguments
doesn't matter.

If you use a `?` or key-value pair to pass in variables to a SQL query, SQLite3
will help protect against SQL injection attempts by escaping potentially
malicious code for you.

## References

* [More on heredocs][heredocs]

[heredocs]: https://makandracards.com/makandra/1675-using-heredoc-for-prettier-ruby-code
