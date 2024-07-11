# Active Record Warmup!

This homework is a chance to dip your toes into Active Record and explore the data before we throw more complicated queries at you tomorrow.

#### How to run:

* Download the [skeleton][skeleton].
* Navigate to your local version of the skeleton.
* Make sure Postgres is running.
* Run `bundle install` and `./setup`.
  * if you get a permission error, run `chmod +x setup` and then `./setup` again

Do your work in `skeleton/movie_novice/queries.rb`. Information on the tables you will be querying can be found at the top of the file.

Run `bundle exec rspec` to test.

You can manually test queries in the rails console. All queries should be written in
Active Record.

**Note:**

* ActiveRecord queries have two methods, `to_sql` and `as_json`, that you might find helpful for debugging. The specs use `as_json` -- feel free to refer to them while writing your queries.
* `find`, `find_by`, `find_by_#{attribute}`, etc. all return the first matching instance from
the database; `where` returns a collection of instances, regardless of the number. Be careful about whether you are expecting the object itself or a collection-wrapped object/set of objects.

[skeleton]: https://assets.aaonline.io/fullstack/sql/homeworks/active_record_warmup/skeleton.zip
