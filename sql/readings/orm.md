# Object Relational Mapping

You've learned how to manage changes to a SQL database through migrations. Now
you'd like to start using the records stored in that database.

You've previously worked directly with a database by writing SQL. One downside
was that this embedded SQL code is in your Ruby code. Though this works, it
would be nice to use Ruby syntax as much as possible.

Also, when you fetched data from your SQL database, the data was returned in
generic `Hash` objects. For instance, if your database was setup like this:

```sql
  CREATE TABLE cars (make VARCHAR(255), model VARCHAR(255), year INTEGER);
  INSERT INTO cars (model, make, year)
    ("Toyota", "Camry", 1997),
    ("Toyota", "Land Cruiser", 1989),
    ("Citroen", "DS", 1969);
```

Then you could write the following ruby code to fetch the data:

```ruby
require 'sqlite3'
db = SQLite3::Database.new('cars.db')
db.results_as_hash = true
db.type_translation = true

cars = db.execute('SELECT * FROM cars')
# => [
#  {"make" => "Toyota", "model" => "Camry", "year" => 1997},
#  {"make" => "Toyota", "model" => "Land Cruiser", "year" => 1989},
#  {"make" => "Citroen", "model" => "DS", "year" => 1969}
# ]
```

That works nicely, but what if you wanted to store and load objects of a `Car`
class? Instead of retrieving generic `Hash` objects, you want to get back
instances of your `Car` class. Then you could call `Car` methods like `go` and
`vroom`. How would you translate between the world of Ruby classes and rows in
your database?

## What is an ORM?

An *object relational mapping* is the system that translates between SQL records
and Ruby (or Java, or Lisp...) objects. The Active Record ORM translates rows
from your SQL tables into Ruby objects on fetch, and translates your Ruby
objects back to rows on save. The ORM also empowers your Ruby classes with
convenient methods to perform common SQL operations.

For instance, if the table `physicians` contains a foreign key referring to
`offices`, Active Record will be able to provide your `Physician` class a
method, `#office`, which will fetch the associated record. Using ORM, the
properties and relationships of the objects in an application can be easily
stored and retrieved from a database without writing SQL statements directly and
with less overall database access code.

## Model classes and `ActiveRecord::Base`

For each table, you will define a Ruby *model* class; an instance of the
model will represent an individual row in the table. For instance, a
`physicians` table will have a corresponding `Physician` model class;
when you fetch rows from the `physicians` table, you will get back
`Physician` objects. All model classes extend `ApplicationRecord`, which
in turn extends `ActiveRecord::Base`. Methods in `ActiveRecord::Base`
will allow you to fetch and save Ruby objects from/to the table.

Rails comes with the following __application_record.rb__ in your `models`
folder:

```ruby
class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
end
```

Your `ApplicationRecord` will act as an intermediary class that you can use
to extend your model classes with `ActiveRecord::Base`. (Rails uses this
intermediary class to avoid being in situations where you would have to
include modules directly on `ActiveRecord::Base`. `ApplicationRecord`
essentially keeps `ActiveRecord::Base` clean.)

If you had a table named `physicians`, you would create a model class like so:

```ruby
# app/models/physician.rb
class Physician < ApplicationRecord
end
```

By convention, you define this class in __app/models/physician.rb__. The
__app/models__ directory is where Rails looks for model classes.

The `ActiveRecord::Base` class has lots of magic within it. For one, the name of
the class is important: Active Record is able to infer from the class name
`Physician` that the associated table is `physicians`. Model classes are always
singular (just like tables are always plural). Respect the convention so
Active Record knows how to connect the two worlds.

### `::find` and `::all`

The first methods you'll learn are for fetching records from the DB:

```ruby
# return an array of Physician objects, one for each row in the
# physicians table
Physician.all

# lookup the Physician with primary key (id) 101
Physician.find(101)
```

### `::where` queries

Often you will want to look up records by some criteria other than primary
key. To do this, you can use `::where`:

```ruby
# return an array of Physicians based in La Jolla
Physician.where('home_city = ?', 'La Jolla')
# Executes:
#   SELECT *
#     FROM physicians
#    WHERE physicians.home_city = 'La Jolla'
```

Note the **SQL fragment** that is passed to `::where`. This condition
will form the `WHERE` SQL condition. You can continue to use the `?`
interpolation character so as to avoid the Bobby Tables (colloquially
called **SQL injection**) attack.

#### WHERE Rails = Magic

Active Record lets you query without SQL fragments:

```ruby
Physician.where(home_city: 'La Jolla')
```

ActiveRecord will look at the hash and construct a `WHERE` fragment
requiring `home_city = 'La Jolla'`. Here's some other cool versions:

```ruby
# physicians at any of these three schools
Physician.where(college: ['City College', 'Columbia', 'NYU'])
# => SELECT * FROM physicians WHERE college IN ('City College', 'Columbia', 'NYU');
# physicians with 3-9 years experience
Physician.where(years_experience: (3..9))
# => SELECT * FROM physicians WHERE years_experience BETWEEN 3 AND 9
```

These extra features are really handy when you need to dynamically generate
complex queries. The queries can get a little crazy, however, so there's no
shame in writing SQL fragments instead; just be sure you interpolate properly!

### Updating and inserting rows

By extending `ActiveRecord::Base` through `ApplicationRecord`, your model class
will automatically receive getter/setter methods for each of the database
columns. This is convenient, since you won't have to write `attr_accessor` for
each column. Here's how you would construct a new `Physician` and set some
appropriate fields:

```ruby
# create a new Physician object
jonas = Physician.new

# set some fields
jonas.name = 'Jonas Salk'
jonas.college = 'City College'
jonas.home_city = 'La Jolla'
```

Great! As you know from your previous AA Questions project, this will not have
saved `jonas` to the Database. To do so, you need to call the
`ActiveRecord::Base#save!` method:

```ruby
# save the record to the database
jonas.save!
```

Notice that this code uses `#save!`; you may have also seen the plain ol'
`#save`. The difference between the two is that `#save!` will warn you if you
fail to save the object, whereas `#save` will quietly return `false` (it returns
`true` on success).

To save some steps, you can use `#create!` to create a new record and
immediately save it to the db:

```ruby
Physician.create!(
  name: 'Jonas Salk',
  college: 'City College',
  home_city: 'La Jolla'
)
```

### Destroying data

Finally, you can destroy a record and remove it from the table through
`#destroy`:

```ruby
physician.destroy
```

## The Rails console

Okay! Suppose you want to start playing with your Rails application. With
other applications, you could started up a REPL by running the `pry` command.

To do likewise in Rails, run `rails console` (or `rails c` for the impatient).
If you've added the `pry-rails` gem as suggested, you still get the `pry`
sweetness you've become accustomed to. (If not, the console will load `irb`.)

The only big difference between `rails console` and `pry`/`irb` is that the
console will take care of loading your Rails application so you won't have to
`require` your model classes manually. It will also open a connection to the DB
for you. This is handy because you can immediately start playing with your app
rather than first requiring and loading a bunch of supporting classes.

Another trick: you're used to using `load` to re-load source code from the
console. In the Rails console, run the `reload!` command; this will re-load all
the model classes.

If you want to access a SQL console, you may conveniently run `rails
dbconsole`.
