# SQL

```ruby
# Posts table:

  id |   title   |     body    |  user_id
  ---------------------------------------
  1  |  'XXXX'   |   'xyz...'  |    3
  2  |  'XXXX'   |   'xyz...'  |    5
  3  |  'XXXX'   |   'xyz...'  |    7
  4  |  'XXXX'   |   'xyz...'  |    10
  5  |  'XXXX'   |   'xyz...'  |    2
  6  |  'XXXX'   |   'xyz...'  |    5
```

Fill in the blanks: The `user_id` column is a ________________ column that refers to the ____________ table.</p>
- [ ] `primary key`, `posts`</answer>
- [ ] `primary key`, `users`</answer>
- [ ] `foreign key`, `posts`</answer>
- [ ] `foreign key`, `users`</answer>

<details><summary>Answer:</summary>

`foreign key`, `users`</details>
<details><summary>Explanation:</summary>

The `user_id` column refers to the `id` from the `User` table for the user linked to that post. Since `user_id` is from a "foreign" table, we call it a `foreign_key`.</details>

```ruby
# Posts table:

  id |   title   |     body    |  user_id
  ---------------------------------------
  1  |  'XXXX'   |   'xyz...'  |    3
  2  |  'XXXX'   |   'xyz...'  |    5
  3  |  'XXXX'   |   'xyz...'  |    7

# Let's grab all of the rows from the posts table for posts belonging to user 3.
# What you want looks something like this:

  id |   title   |     body    |  user_id
  ---------------------------------------
  1  |  'XXXX'   |   'xyz...'  |    3


# The query would look something like this:
  SELECT
    ___________
  FROM
    ___________
  WHERE
    ___________
```

Which of the following would correctly fill in the respective blanks in the above query to fetch the desired result?</p>
- [ ] `*`, `posts`, `id = 3`</answer>
- [ ] `*`, `posts`, `user_id = 3`</answer>
- [ ] `user_id`, `posts`, `user_id = 3`</answer>
- [ ] `3`, `posts`, `id = 3`</answer>

<details><summary>Answer:</summary>

`*`, `posts`, `user_id = 3`</details>
<details><summary>Explanation:</summary>

You want all the information about the `posts` that belong to the user with the `id` of 3, so you'll query the `posts` table for `*`--i.e., all the available info--`WHERE` the `user_id` is 3!</details>

```ruby
# Let's create a new table for users. 

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  height_in_inches INTEGER
);

INSERT INTO
  users (name, height_in_inches)
VALUES
  ('Santa Claus', 72.5);
```

Why will the above code throw an error?</p>
- [ ] `VARCHAR(255)` is not a valid datatype</answer>
- [ ] The `INSERT INTO` block does not specify an id</answer>
- [ ] 72.5 is not a valid integer</answer>
- [ ] The code will not throw an error</answer>

<details><summary>Answer:</summary>

The `INSERT INTO` block does not specify an id</details>
<details><summary>Explanation:</summary>

The primary key cannot be null, so the insertion block needs to specify an `id`. To make the primary key auto-populating in PostgreSQL, you could use `SERIAL` instead of `INTEGER` when creating the table: `id SERIAL PRIMARY KEY`. In that case--i.e., with an auto-populating `id`--the insertion code would run without error. (The float would simply be rounded into an integer.) Note that other SQL implementations could handle this code differently. Sqlite3, e.g., automatically auto-populates the `id` field and so would run the above code as is without throwing any errors.</details>
