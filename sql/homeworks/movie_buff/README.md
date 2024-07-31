# Active Record Warmup: Movie Buff In Training!

This homework is a chance to dip your toes into Active Record and explore the
data before you have to handle more complicated queries tomorrow.

## How to Run the Project

* Clone the skeleton repo accessed through the `Download Project` button below.
* Navigate to your local version of the skeleton.
* Make sure Postgres is running.
* Run `bundle install` and `./setup`.
  * If you get a permission error, run `chmod +x setup` and then `./setup`
    again.

Do your work in __movie_novice/queries.rb__. Information on the tables you will
be querying can be found at the top of the file.

Run `bundle exec rspec` to test.

You can manually test queries in the rails console. All queries should be
written in Active Record. If you want to test some SQL code directly, run `rails
dbconsole` to pull up a `psql` session with your development database loaded.
(See below for an example.)

**Note:**

* Active Record queries have two methods, `to_sql` and `as_json`, that you might
  find helpful for debugging.
  * `to_sql` outputs the raw SQL query that Rails will generate from your Active
    Record query. You can then use this SQL query in your `psql` console for
    testing. When using `to_sql` in pry, precede your query with `puts`: this
    will remove formatting characters for easy copy-pasting and will allow you
    to paste multi-line, chained expressions. So, e.g., you could run the
    following command in the Rails console (`rails c`):

    ```ruby
    [1] pry(main)> puts Actor.where(name: "Harrison Ford").to_sql
    SELECT "actors".* FROM "actors" WHERE "actors"."name" = 'Harrison Ford'
    => nil
    ```

    You could then copy the `SELECT` line, run `rails dbconsole`, and paste it
    in:

    ```sql
    movie_buff_in_training_development=# SELECT "actors".* FROM "actors" WHERE "actors"."name" = 'Harrison Ford';
     id |     name      |         created_at         |         updated_at         
    ----+---------------+----------------------------+----------------------------
      6 | Harrison Ford | 2021-12-02 05:30:59.543374 | 2021-12-02 05:30:59.543374
    (1 row)
    ```

  * `as_json` converts query results into more readable Arrays and Hashes; the
    specs use this method -- feel free to refer to them while writing your
    queries.
* `find`, `find_by`, `find_by_#{attribute}`, etc., all return the first matching
  instance from the database; `where` returns a collection of instances,
  regardless of the number. Be careful about whether you are expecting the
  object itself or a collection-wrapped object / set of objects.