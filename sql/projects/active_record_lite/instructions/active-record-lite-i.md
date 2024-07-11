# Building Active Record Lite

In this project, you will build your own lite version of Active Record.

## Learning Goals

* Know when to write class methods and when to write instance methods
* Know how to use `define_method` inside a class method to add instance methods
* Be able to create a generic SQLObject class that abstracts table-specific
  logic away
* Understand how Active Record interfaces with the database
* Be able to write generic query methods that any class inheriting from
  `SQLObject` can use (e.g., `all`, `where`)

## Setup

Download the [skeleton].

[skeleton]: https://assets.aaonline.io/fullstack/sql/projects/active_record_lite/skeleton.zip?raw=true

There are specs in it which will guide you through the project. Because they're
using a database, they run a little slow, so it might be helpful to run them one
file at a time:

```sh
$ rspec spec/01_sql_object_spec.rb
```

To aid in debugging, we've also coded an option into the skeleton so you can
print all the queries and interpolation arguments that get sent to the SQL
engine. To enable this, pass `PRINT_QUERIES=true` as an ENV variable when you
run the `rspec` command.

```sh
$ PRINT_QUERIES=true rspec spec/01_sql_object_spec.rb
```

## Phase 0: Implement `my_attr_accessor`

This phase will get your gears turning on these new metaprogramming concepts
before we dive into the project. You already know what the standard Ruby method
`attr_accessor` does. What if Ruby didn't provide this convenient method for
you?

In the `lib/00_attr_accessor_object.rb` file, implement a `::my_attr_accessor`
macro, which should do exactly the same thing as the real `attr_accessor`: it
should define setter/getter methods.

To do this, use `define_method` inside `::my_attr_accessor` to define getter and
setter instance methods. You'll want to investigate and use the
`instance_variable_get` and `instance_variable_set` methods described
[here][ivar-get].

[ivar-get]: http://ruby-doc.org/core-2.0.0/Object.html#method-i-instance_variable_get

There is a corresponding `spec/00_attr_accessor_object_spec.rb` spec file. Run
it using `bundle exec rspec` to check your work.

## Phase I: `SQLObject`: Overview

Our job is to write a class, `SQLObject`, that will interact with the database.
By the **end** of this phase, our ActiveRecord Lite will behave just like the
real `ActiveRecord::Base`, with methods including:

* `::all`: return an array of all the records in the DB
* `::find`: look up a single record by primary key
* `#insert`: insert a new row into the table to represent the `SQLObject`.
* `#update`: update the row with the `id` of this `SQLObject`
* `#save`: convenience method that either calls `insert`/`update` depending on
  whether or not the `SQLObject` already exists in the table.

## Phase Ia: `::table_name` and `::table_name=`

Before we begin writing methods that interact with the DB, we need to be able to
figure out which table the records should be fetched from, inserted into, etc.
We should write a class getter method `::table_name` which will get the name of
the table for the class. We should also write a `::table_name=` setter to set
the table. Since our `SQLObject` class is itself an object (an instance of
`Class`), we can store that as a instance variable on the class
*#everythingisanobject*.

**N.B.:** I know you're itching to exercise your newly-acquired metaprogramming
chops, but there's no need to use fancy methods like
`#instance_variable_get`/`_set` for this step when a simple, normal instance
variable will do. Never make things more complicated than they need to be. This
is a great rule for programming, and for life.

Example:

```ruby
class Human < SQLObject
  self.table_name = "humans"
end

Human.table_name # => "humans"
```

It would also be nice if, in the absence of an explicitly set table name, we
would have `::table_name` by default convert the class name to snake\_case and
pluralize:

```ruby
class BigDog < SQLObject
end

BigDog.table_name # => "big_dogs"
```

ActiveSupport (part of Rails) has an inflector library that adds methods to
`String` to help you do this. In particular, look at the `String#tableize`
method. You can require the inflector with `require 'active_support/inflector'`.

**NB**: you cannot always infer the name of the table. For example: the
`inflector` library will, by default, pluralize `human` into `humen`, not
`humans`. That's what your `::table_name=` is for: so users of `SQLObject` can
override the default, inferred table name.

Make sure the `::table_name` specs in `spec/01_sql_object_spec` are working and
move onward!

## Phase Ib: Listing Columns

In our sample database, the `cats` table has `id`, `name`, and `owner_id`
columns. When we define a model class `Cat < SQLObject`, it should automatically
have setter and getter methods for each of the columns. For instance, we want to
be able to write:

```ruby
class Cat < SQLObject
  # We'll explain finalize! later!
  self.finalize!
end

c = Cat.new
c.name = "Gizmo"
c.owner_id = 123

c.name #=> "Gizmo"
c.owner_id #=> 123
```

We'll get there eventually, but let's start by writing a `SQLObject` **class
method** `::columns`, which should return an array with the names of the table's
columns.  We want `Cat.columns == [:id, :name, :owner_id]`. To do this, we can
query the database using `DBConnection.execute2` to ask it what the columns are
for a table. Let's see how we might do this:

```ruby
DBConnection.execute2(<<-SQL)
  SELECT
    *
  FROM
    cats
SQL
# => [
#   ["id", "name", "owner_id"],
#   {"id"=>1, "name"=>"Breakfast", "owner_id"=>1},
#   {"id"=>2, "name"=>"Earl", "owner_id"=>2},
#   {"id"=>3, "name"=>"Haskell", "owner_id"=>3},
#   {"id"=>4, "name"=>"Markov", "owner_id"=>3}
# ]
```

The `DBConnection::execute2` method returns an array; the first element is a
list of the names of columns, while the rest of the items represent individual
records in the DB. (**Note:** We're using `execute2` to easily retrieve the
column names. You'll want to stick with the regular `execute` method for all
other queries.)

Now that you've seen how to use `DBConnection::execute2`, write a `::columns`
method which queries the DB (interpolating the class's `::table_name`), and
returns the array of columns as **symbols**. Remember that DB queries are
expensive, so we only want to make the query **once**, regardless of how often
`::columns` gets called.

Note: the `execute` and `execute2` methods **will not allow us to interpolate
into the `FROM` statement.**

```ruby
DBConnection.execute(<<-SQL, cats)
  SELECT
    *
  FROM
    ?
SQL
```

The above will not work. Use standard string interpolation instead: `#{}`.

## Phase Ic: Getters and Setters

Now that we can list columns, we'll write a class method `::finalize!` that
automatically adds getter and setter methods for each column. Here is how it's
intended to be used:

```ruby
class Cat < SQLObject
  # Finalize is called at the end of the subclass definition to
  # add the getters/setters.
  self.finalize!
end

cat = Cat.new
cat.name = "Gizmo"
cat.name #=> "Gizmo"
```

### `#attributes`

When we say `cat.name = "Gizmo"`, how should we store the value "Gizmo"? We
*could* save it in an instance variable that we dynamically call `@name` just
like we did with `my_attr_accessor`, but then we wouldn't know which instance
variables are associated with columns and which aren't. Remember that
`ActiveRecord::Base` gives us a handy method `#attributes` that hands us a hash
of all our model's columns and values.

Let's define `#attributes` in `SQLObject`. It should lazily initialize
`@attributes` to an empty hash in case it doesn't exist yet. After we set up the
`::finalize!` method properly, it should work like so:

```ruby
cat = Cat.new
cat.attributes #=> {}
cat.name = "Gizmo"
cat.attributes #=> { name: "Gizmo" }
```

### `::finalize!`

Now we can finally write `::finalize!`. It should iterate through all the
`::columns`, using `define_method` (twice) to create a getter and setter method
for each column, just like `my_attr_accessor`. But *this* time, instead of
dynamically creating an instance variable, store everything in the `#attributes`
hash.

**N.B.**: it's important that the user of `SQLObject` call `finalize!` at the end
of their subclass definition, otherwise the getter/setter methods don't get
defined. That's hacky, but it will have to do. :-)

Make sure the `::columns` and setter/getter specs now pass.

## Phase Id: `#initialize`

Write an `#initialize` method for `SQLObject`. It should take in a single
`params` hash. We want:

```ruby
cat = Cat.new(name: "Gizmo", owner_id: 123)
cat.name #=> "Gizmo"
cat.owner_id #=> 123
```

Your `#initialize` method should iterate through each of the `attr_name, value`
pairs. For each `attr_name`, it should first convert the name to a symbol, and
then check whether the `attr_name` is among the `columns`. If it is not, raise
an error:
```
    unknown attribute '#{attr_name}'
```

Set the attribute by calling the setter method. Use `#send`; avoid using
`@attributes` or `#attributes` inside `#initialize`.

**Hint**: we need to call `::columns` on a class object, not the instance. For
example, we can call `Dog::columns` but not `dog.columns`.

Note that `dog.class == Dog`. How can we use the `Object#class` method to access
the `::columns` **class method** from inside the `#initialize` **instance
method**?

Run the specs, Luke!

## Phase Ie: `::all`, `::parse_all`

We now want to write a method `::all` that will fetch all the records from the
database. The first thing to do is to try to generate the necessary SQL query to
issue. Generate SQL and print it out so you can view and verify it. Use the
heredoc syntax to define your query.

Example:

```ruby
class Cat < SQLObject
  finalize!
end

Cat.all
# SELECT
#   cats.*
# FROM
#   cats

class Human < SQLObject
  self.table_name = "humans"

  finalize!
end

Human.all
# SELECT
#   humans.*
# FROM
#   humans
```

Notice that the SQL is formulaic except for the table name, which we need to
insert. Use ordinary Ruby string interpolation (`#{whatevs}`) for this; SQL will
only let you use `?` to interpolate **values**, not table or column names.

Once we've got our query looking good, it's time to execute it. Use the provided
`DBConnection` class. You can use `DBConnection.execute(<<-SQL, arg1, arg2,
...)` in the usual manner.

Calling `DBConnection` will return an array of raw `Hash` objects where the keys
are column names and the values are column values. We want to turn these into
Ruby objects:

```ruby
class Human < SQLObject
  self.table_name = "humans"

  finalize!
end

Human.all
=> [#<Human:0x007fa409ceee38
  @attributes={:id=>1, :fname=>"Devon", :lname=>"Watts", :house_id=>1}>,
 #<Human:0x007fa409cee988
  @attributes={:id=>2, :fname=>"Matt", :lname=>"Rubens", :house_id=>1}>,
 #<Human:0x007fa409cee528
  @attributes={:id=>3, :fname=>"Ned", :lname=>"Ruggeri", :house_id=>2}>]
```

To turn each of the `Hash`es into `Human`s, write a `SQLObject::parse_all`
method. Iterate through the results, using `new` to create a new instance for
each.

`new` what? `SQLObject.new`? That's not right, we want `Human.all` to return
`Human` objects, and `Cat.all` to return `Cat` objects. **Hint**: inside the
`::parse_all` class method, what is `self`?

Now we can call `::parse_all` from inside `::all` and make all the specs pass!

## Phase If: `::find`

Write a `SQLObject::find(id)` method to return a single object with the given
id. You could write `::find` using `::all` and `Array#find` like so:

```ruby
class SQLObject
  def self.find(id)
    self.all.find { |obj| obj.id == id }
  end
end
```

That would be inefficient: we'd fetch all the records from the DB. Instead,
write a new SQL query that will fetch at most one record.

Yo dawg, I heard you like specs, so I spent a lot of time writing them. Please
run them again. :-)

## Phase Ig: `#insert`

Write a `SQLObject#insert` instance method. It should build and execute a SQL
query like this:

```sql
INSERT INTO
  table_name (col1, col2, col3)
VALUES
  (?, ?, ?)
```

To simplify building this query, I made two local variables:

* `col_names`: I took the array of `::columns` of the class and joined it with
  commas.
* `question_marks`: I built an array of question marks (`["?"] * n`) and joined
  it with commas. What determines the number of question marks?

Lastly, when you call `DBConnection.execute`, you'll need to pass in the values
of the columns. Two hints:

* I wrote a `SQLObject#attribute_values` method that returns an array of the
  values for each attribute. I did this by calling `Array#map` on
  `SQLObject::columns`, calling `send` on the instance to get the value.
* Once you have the `#attribute_values` method working, I passed this into
  `DBConnection.execute` using the splat operator.

When the DB inserts the record, it will assign the record an ID. After the
`INSERT` query is run, we want to update our `SQLObject` instance with the
assigned ID. Check out the `DBConnection` file for a helpful method.

Again with the specs please.

## Phase Ih: `#update`

Next we'll write a `SQLObject#update` method to update a record's attributes.
Here's a reminder of what the resulting SQL should look like:

```sql
UPDATE
  table_name
SET
  col1 = ?, col2 = ?, col3 = ?
WHERE
  id = ?
```

This is very similar to the `#insert` method. To produce the "SET line", I
mapped `::columns` to `#{attr_name} = ?` and joined with commas.

I again used the `#attribute_values` trick. I additionally passed in the `id` of
the object (for the last `?` in the `WHERE` clause).

Every day I'm testing.

## Phase Ii: `#save`

Finally, write an instance method `SQLObject#save`. This should call `#insert`
or `#update` depending on whether `id.nil?`. It is not intended that the user
call `#insert` or `#update` directly (leave them public so the specs can call
them :-)).

You did it! Good work!

## Phase II: `Searchable`

Let's write a module named `Searchable` which will add the ability to search
using `::where`. By using `extend`, we can mix in `Searchable` to our
`SQLObject` class, adding all the module methods as class methods.

So let's write `Searchable#where(params)`. Here's an example:

```ruby
haskell_cats = Cat.where(:name => "Haskell", :color => "calico")
# SELECT
#   *
# FROM
#   cats
# WHERE
#   name = ? AND color = ?
```

I used a local variable `where_line` where I mapped the `keys` of the `params`
to `"#{key} = ?"` and joined with `AND`.

To fill in the question marks, I used the `values` of the `params` object.
