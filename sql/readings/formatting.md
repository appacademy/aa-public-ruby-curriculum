# Formatting SQL Code

## SQL Conventions

Different programmers use different SQL conventions, but in preparation for
ActiveRecord and Rails, which have their own conventions, you should:

* Always name SQL tables **snake\_case** and **pluralized** (e.g.,
  `musical_instruments`, `favorite_cats`).
* If a `musician` belongs to a `band`, your `musicians` table will need to store
  a foreign key that refers to the `id` column in the `bands` table.  The
  foreign key column should be named `band_id`.
* Always have a column named `id`, and use it as the primary key for a table.

You must not write SQL all on a single line. It will be impossible to
read:

```sql
SELECT * FROM table_one LEFT OUTER table_two ON table_one.column_one = 
table_two.column_x WHERE (table_one.column_three > table_two.column_y ...
```

Here's an example of some well formatted SQL code:

```sql
SELECT
  table_two.column_one,
  table_two.column_two,
  table_two.column_three
FROM
  table_one
LEFT OUTER JOIN
  table_two ON table_one.column_one = table_two.column_x
WHERE
  (table_one.column_three > table_two.column_y
    AND another_condition IS NULL)
GROUP BY
  table_two.column_four
ORDER BY
  table_two.column_four
```

Notice that each component of the SQL statement starts with the
keyword aligned left. The body of each component is indented two
spaces. Complex `WHERE` clauses are parenthesized and indented two
spaces on the following line.

## Subqueries

Life gets complicated when you make subqueries. Here's how I do it:

```sql
SELECT
  bands.*
FROM
  bands
JOIN (
  SELECT
    albums.*
  FROM
    albums
  WHERE
    album.type = "POP"
  GROUP BY
    album.band_id
  HAVING
    COUNT(*) > 3
  ) AS pop_group_albums ON bands.id = pop_group_albums.band_id
WHERE
  band.leader_id IN (
    SELECT
      musicians.id
    FROM
      musicians
    WHERE
      musicians.birth_yr > 1940
  )
```

I put the leading paren on the prior line, indent the query two
spaces, and close with a trailing paren at the start of a new line. I
put the `ON` of a `JOIN` right after the closing paren.

## References

* Based on the style guide [How I Write SQL][how-i-write-sql].

[how-i-write-sql]: http://www.craigkerstiens.com/2012/11/17/how-i-write-sql
