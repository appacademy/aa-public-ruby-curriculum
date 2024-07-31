# Movie Buff

For this project you will be writing Active Record queries against the actors,
movies, and castings tables from the SQL Zoo project. RSpec tests will check
that you both return the correct results and query the database the specified
number of times. Please run them to check your work.

It may be helpful to refer to the SQL Zoo exercises for guidance as you work
through these problems. Also make sure to reference the past Active Record
readings as well as the [Active Record docs][active-record-docs].

## Learning goals

By the end of this project you should be able to

* Use Active Record's various querying methods
* Write complex, chained Active Record queries
* Test and debug Active Record queries

## Setup

First, make sure Postgres is running:

* **Mac**: You should see an elephant icon in your menu bar; if you don't, start
  Postgres.app (it's in Applications). Click the icon. If you see a green
  checkmark in the dropdown menu, you're good; if not, click the `Start` button.
* **Windows (WSL) / Ubuntu**: Run `sudo service postgresql start` in your
  terminal.

Then clone the skeleton repo from the `Download Project` link at the bottom of
this page. Run `bundle install` and `./setup` to populate the database. (If you
get a permission error, run `chmod +x setup` and then `./setup` again.)

Run `bundle exec rspec` to test.

If you'd like to run specs for a particular problem, simply append the
corresponding line number to the spec file you want to run, like so:

```sh
bundle exec rspec spec/01_queries_spec.rb:66
```

You'll be working in the __movie_buff__ folder. Do the problems in
__01_queries.rb__ before moving on to __02_queries.rb__ and then
__03_queries.rb__. Information on the tables you will be working with can be
found below:

```rb
# == Schema Information
#
# Table name: actors
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Table name: movies
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  yr          :integer          not null
#  score       :float            not null
#  votes       :integer          not null
#  director_id :bigint           
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Table name: castings
#
#  id         :bigint           not null, primary key
#  actor_id   :bigint           not null
#  movie_id   :bigint           not null
#  ord        :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
```

## Notes on building Active Record queries

You can manually test queries in the `rails console`. Remember that appending
`to_sql`--which returns the SQL query Active Record makes under the hood--or
`as_json`--which converts a query's output into a regular Hash--to the end of a
query can help with debugging. See last night's "Movie Buff in Training"
homework for tips on how to use these two methods.

Also remember that Active Record can `joins` on a model's associations. The
models in the skeleton repo already have associations defined for actors,
castings, and movies. Please take a look at these associations before you begin.

Have fun and good luck!

[active-record-docs]: http://guides.rubyonrails.org/active_record_querying.html