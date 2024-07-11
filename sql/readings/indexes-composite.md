# Indexing Deep Dive

In a previous reading, you learned how indexing can help speed up your queries
in large datasets. Indexes increase the time required to write to a table,
however, so you only want to add them in cases where the read-time benefit
outweighs the increased write time. You should accordingly apply indexes to
columns--such as foreign keys--that are accessed frequently. `unique` database
constraints also require an indexed column. You can even create composite
indexes across multiple columns, which is helpful for creating scoped
uniqueness, i.e., for assuring that one column is unique with respect to
another column.

This reading uses the Active Record [`explain`] method to illustrate how
PostgreSQL utilizes the various types of indexes when querying. By the end, you
should have a good feel for how to set up and combine single-column and
composite indexes for best performance with PostgreSQL.

## Baseline

The examples in this reading use a version of the database from the `movie_buff`
practices. (You can modify that database to replicate the examples and try your
own tests.) The database has an `actors` table, a `movies` table, and a
`castings` table that `join`s the other two. The following examples focus on the
`castings` table, which has around 15,000 rows.

Here is the relevant info from the schema:

```rb
create_table "castings", force: :cascade do |t|
    t.bigint "actor_id", null: false
    t.bigint "movie_id", null: false
end
```

For a baseline, there are no indexes on the `castings` table. Running a simple
composite query--`Casting.where(movie: 249, actor: 2).explain`--then yields the
following result:

```rb
[1] pry(main)> Casting.where(movie: 249, actor: 2).explain
  Casting Load (4.8ms)  SELECT "castings".* FROM "castings" WHERE "castings"."movie_id" = $1 AND "castings"."actor_id" = $2  [["movie_id", 249], ["actor_id", 2]]
=> EXPLAIN for: SELECT "castings".* FROM "castings" WHERE "castings"."movie_id" = $1 AND "castings"."actor_id" = $2 [["movie_id", 249], ["actor_id", 2]]
                             QUERY PLAN
---------------------------------------------------------------------
 Seq Scan on castings  (cost=0.00..368.30 rows=1 width=28)
   Filter: ((movie_id = '249'::bigint) AND (actor_id = '2'::bigint))
(2 rows)
```

The first line of the result shows the SQL query that was run and how long it
took (`4.8ms`). This time depends on many factors and will vary if you run the
command multiple times. Nevertheless, the time for this un-indexed query will be
the largest that you will see in these examples by far.

The rest of the result shows the plan that PostgreSQL used to resolve the query.
In this case it planned to run a `Seq(uential) Scan on castings`, meaning that
it would proceed through every row in the `castings` table in sequence looking
for the specified `movie_id` and `actor_id` (i.e., the `Filter`). It estimated
that this plan would have a `cost` of `368.30` and would find 1 `row`. Finally,
the result concludes by telling you that the `QUERY PLAN` takes up 2
`rows`/lines.

The `cost` factor in this plan is an arbitrary time unit, so you can't use it to
calculate how long a given operation will take. It does, however, provide a
useful relative gauge. The first number (here, `0.00`) represents the estimated
_start-up cost_, or how long it is likely to take before this operation can
start producing output. The second number represents the estimated _total cost_
of the operation. Note that these numbers are both estimates; they can vary a
bit if you run the command multiple times.

For more details on analyzing this `EXPLAIN` output, see the [PostgreSQL
docs][postgresql-explain].

## Single-column indexes

Adding a single-column index on both `movie_id` and `actor_id` changes the
relevant part of the schema to this:

```rb
create_table "castings", force: :cascade do |t|
    t.bigint "actor_id", null: false
    t.bigint "movie_id", null: false
    t.index ["actor_id"], name: "index_castings_on_actor_id"
    t.index ["movie_id"], name: "index_castings_on_movie_id"
end
```

Now if you run the query from above again, you will see that PostgreSQL changes
its planned approach:

```rb
[1] pry(main)> Casting.where(movie: 249, actor: 2).explain
  Casting Load (0.7ms)  SELECT "castings".* FROM "castings" WHERE "castings"."movie_id" = $1 AND "castings"."actor_id" = $2  [["movie_id", 249], ["actor_id", 2]]
=> EXPLAIN for: SELECT "castings".* FROM "castings" WHERE "castings"."movie_id" = $1 AND "castings"."actor_id" = $2 [["movie_id", 249], ["actor_id", 2]]
                                           QUERY PLAN
------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on castings  (cost=10.07..14.09 rows=1 width=44)
   Recheck Cond: ((movie_id = '249'::bigint) AND (actor_id = '2'::bigint))
   ->  BitmapAnd  (cost=10.07..10.07 rows=1 width=0)
         ->  Bitmap Index Scan on index_castings_on_movie_id  (cost=0.00..4.91 rows=83 width=0)
               Index Cond: (movie_id = '249'::bigint)
         ->  Bitmap Index Scan on index_castings_on_actor_id  (cost=0.00..4.91 rows=83 width=0)
               Index Cond: (actor_id = '2'::bigint)
(7 rows)
```

Here you can see that the SQL query remains the same (first line), but this time
PostgreSQL tackles it by using two `Index Scan`s instead of a `Seq Scan`. In
short, it searches the `movie_id` index (`index_castings_on_movie_id`) for the
specified `movie_id` and the `actor_id` index (`index_castings_on_actor_id`) for
the `actor_id`. Each of these operations has an estimated cost of only
`4.91`. The `Heap Scan` then checks the rows returned from the two Index Scans.
All of these operations together have an estimated cost of
`14.09`--significantly better than the `368.30` required for the Sequential Scan
above!

## Single-column vs. composite indexes

How will PostgreSQL handle the query if you combine the single-column indexes
with a composite index on `movie_id` and `actor_id`? The schema now looks like
this:

```rb
create_table "castings", force: :cascade do |t|
    t.bigint "actor_id", null: false
    t.bigint "movie_id", null: false
    t.index ["actor_id"], name: "index_castings_on_actor_id"
    t.index ["movie_id", "actor_id"], name: "index_castings_on_movie_id_and_actor_id", unique: true
    t.index ["movie_id"], name: "index_castings_on_movie_id"
  end
```

It will be instructive to run the two parts of the test query individually
before running the full composite query.

### Querying columns individually

Querying for just the `movie_id` produces the following:

```rb
[1] pry(main)> Casting.where(movie: 249).explain
  Casting Load (0.5ms)  SELECT "castings".* FROM "castings" WHERE "castings"."movie_id" = $1  [["movie_id", 249]]
=> EXPLAIN for: SELECT "castings".* FROM "castings" WHERE "castings"."movie_id" = $1 [["movie_id", 249]]
                                              QUERY PLAN
------------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on castings  (cost=4.35..30.85 rows=8 width=44)
   Recheck Cond: (movie_id = '249'::bigint)
   ->  Bitmap Index Scan on index_castings_on_movie_id_and_actor_id  (cost=0.00..4.34 rows=8 width=0)
         Index Cond: (movie_id = '249'::bigint)
(4 rows)
```

This result shows that PostgreSQL will use the **composite index**--not the
single-column index--to find rows with the selected `movie_id`. It can do this
because the composite index lists `movie_id` as the **first column**. If you
instead search for the `actor_id`, PostgreSQL will not use the composite index.
It will use the single-column index (or a Sequential Scan if the specified
column has no index):

```rb
[4] pry(main)> Casting.where(actor: 2).explain
  Casting Load (0.6ms)  SELECT "castings".* FROM "castings" WHERE "castings"."actor_id" = $1  [["actor_id", 2]]
=> EXPLAIN for: SELECT "castings".* FROM "castings" WHERE "castings"."actor_id" = $1 [["actor_id", 2]]
                                         QUERY PLAN
---------------------------------------------------------------------------------------------
 Index Scan using index_castings_on_actor_id on castings  (cost=0.29..9.47 rows=20 width=44)
   Index Cond: (actor_id = '2'::bigint)
(2 rows)
```

To understand why this happens, think about a phone book. If you had a phone
book and wanted to find everyone with the last name "King", you could quickly
search for "King" in the phone book and find your answer. You wouldn't need a
separate index of last names because a phone book is itself ordered by last
name. If, however, you wanted to look up everyone with the first name "Jane",
the phone book would not help you quickly arrive at an answer: because a phone
book is not organized by first name, you would have to scan every line to find
all the "Jane"s.

Composite indexes work the same way as a phone book, which is why you do not
need a separate single-column index for the first column in a composite index.
Indeed, since indexes increase the time / number of operations required to write
to the database, you should **not** include a single-column index on the first
column of a composite index: it will slow down your database and provide no
benefit because it will never get used.

### Composite queries

With regard to the full composite query, PostgreSQL will, unsurprisingly,
use the composite index:

```rb
[1] pry(main)> Casting.where(movie: 249, actor: 2).explain
  Casting Load (0.7ms)  SELECT "castings".* FROM "castings" WHERE "castings"."movie_id" = $1 AND "castings"."actor_id" = $2  [["movie_id", 249], ["actor_id", 2]]
=> EXPLAIN for: SELECT "castings".* FROM "castings" WHERE "castings"."movie_id" = $1 AND "castings"."actor_id" = $2 [["movie_id", 249], ["actor_id", 2]]
                                               QUERY PLAN
---------------------------------------------------------------------------------------------------------
 Index Scan using index_castings_on_movie_id_and_actor_id on castings  (cost=0.29..8.31 rows=1 width=44)
   Index Cond: ((movie_id = '249'::bigint) AND (actor_id = '2'::bigint))
(2 rows)
```

As just illustrated, however, order matters when accessing an index. So what
happens if you switch the order of the conditions in the `where` clause so that
`actor` comes first? The result is perhaps unexpected:

```rb
[1] pry(main)> Casting.where(actor: 2, movie: 249).explain
  Casting Load (0.4ms)  SELECT "castings".* FROM "castings" WHERE "castings"."actor_id" = $1 AND "castings"."movie_id" = $2  [["actor_id", 2], ["movie_id", 249]]
=> EXPLAIN for: SELECT "castings".* FROM "castings" WHERE "castings"."actor_id" = $1 AND "castings"."movie_id" = $2 [["actor_id", 2], ["movie_id", 249]]
                                               QUERY PLAN
---------------------------------------------------------------------------------------------------------
 Index Scan using index_castings_on_movie_id_and_actor_id on castings  (cost=0.29..8.30 rows=1 width=44)
   Index Cond: ((movie_id = '249'::bigint) AND (actor_id = '2'::bigint))
(2 rows)
```

PostgreSQL still uses the composite index! If PostgreSQL processed the
conditions in the specified order, then it wouldn't be able to use the composite
index, or, more precisely, it would be able to use it only for the `movie` part
of the query. PostgreSQL, however, is optimized to recognize when changing the
order of a query's elements would result in better performance. Note that it not
only plans to use the composite index, it also reverses the order of the two
conditions to make the composite index usable.

This observation leads to an important point. The [Rails join table
generator][join] suggests the possibility of using two composite indexes for a
join table so that each foreign key can serve as a first column:

```rb
# from https://guides.rubyonrails.org/active_record_migrations.html#creating-a-standalone-migration

class CreateJoinTableCustomerProduct < ActiveRecord::Migration[7.0]
  def change
    create_join_table :customers, :products do |t|
      # t.index [:customer_id, :product_id]
      # t.index [:product_id, :customer_id]
    end
  end
end
```

If you are using PostgreSQL as your database, this is unnecessary. In fact, if
you do set up two composite indexes on the same two columns, PostgreSQL will
use only one of them. Observe:

```rb
# Schema
# create_table "castings", force: :cascade do |t|
#   t.bigint "actor_id", null: false
#   t.bigint "movie_id", null: false
#   t.index ["actor_id", "movie_id"], name: "index_castings_on_actor_id_and_movie_id", unique: true
#   t.index ["actor_id"], name: "index_castings_on_actor_id"
#   t.index ["movie_id", "actor_id"], name: "index_castings_on_movie_id_and_actor_id", unique: true
#   t.index ["movie_id"], name: "index_castings_on_movie_id"
# end

[1] pry(main)> Casting.where(movie: 249, actor: 2).explain
  Casting Load (1.3ms)  SELECT "castings".* FROM "castings" WHERE "castings"."movie_id" = $1 AND "castings"."actor_id" = $2  [["movie_id", 249], ["actor_id", 2]]
=> EXPLAIN for: SELECT "castings".* FROM "castings" WHERE "castings"."movie_id" = $1 AND "castings"."actor_id" = $2 [["movie_id", 249], ["actor_id", 2]]
                                               QUERY PLAN
---------------------------------------------------------------------------------------------------------
 Index Scan using index_castings_on_movie_id_and_actor_id on castings  (cost=0.29..8.30 rows=1 width=44)
   Index Cond: ((movie_id = '249'::bigint) AND (actor_id = '2'::bigint))
(2 rows)

[2] pry(main)> Casting.where(actor: 2, movie: 249).explain
  Casting Load (0.4ms)  SELECT "castings".* FROM "castings" WHERE "castings"."actor_id" = $1 AND "castings"."movie_id" = $2  [["actor_id", 2], ["movie_id", 249]]
=> EXPLAIN for: SELECT "castings".* FROM "castings" WHERE "castings"."actor_id" = $1 AND "castings"."movie_id" = $2 [["actor_id", 2], ["movie_id", 249]]
                                               QUERY PLAN
---------------------------------------------------------------------------------------------------------
 Index Scan using index_castings_on_movie_id_and_actor_id on castings  (cost=0.29..8.30 rows=1 width=44)
   Index Cond: ((movie_id = '249'::bigint) AND (actor_id = '2'::bigint))
(2 rows)
```

This schema has four indexes on the `castings` table, but PostgreSQL uses only
one: `index_castings_on_movie_id_and_actor_id`. You accordingly need only one
composite index for a specific group of columns.

Given this PostgreSQL optimization, does it matter, then, which column comes
first? Yes, at least potentially. For example, if only one column of the
composite index would normally require an index, listing that column first in
the composite will keep you from needing to maintain a second index. If all the
columns are equally indexable, then the usual advice is to put the most
selective column first. In other words, choose the column that will best narrow
down the number of rows that must be searched once its value is located. If all
the columns have roughly the same selectivity, then the order won't matter.

## Takeaways

The examples in this reading illustrate the following points:

1. You **should not** have a single-column index on the first column of a
   composite index.
2. You **should** include a single-column index on any column **after** the
   first column in a composite index if queries are likely to frequently access
   that subsequent column independently of the first column.
3. When using PostgreSQL, you do not need to worry about matching the order of
   columns in a composite index to the order of your queries. Order **does**
   matter for determining which indexes can be used and how long a query will
   take, but PostgreSQL will take care of the order behind the scenes. (Other
   databases might perform differently.)
4. Because of #3, you do not need to include additional composite indexes that
   simply switch the order of the indexed columns **if you are using
   PostgreSQL**. (Once again, other databases might perform differently.)
5. Also because of #3, you can order the columns in a composite index in
   whatever order will help your program run the fastest. Selectivity is usually
   the prime consideration.

[`explain`]: https://guides.rubyonrails.org/active_record_querying.html#running-explain
[postgresql-explain]: https://www.postgresql.org/docs/current/using-explain.html
[join]: https://guides.rubyonrails.org/active_record_migrations.html#creating-a-standalone-migration
