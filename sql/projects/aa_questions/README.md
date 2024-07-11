# AA Questions

**Read the entire project description before beginning**.

Today, we're going to build an application that will help us handle questions
from students.  To do this, we will set up the database and then overlay Ruby
code to map the data from the database into Ruby objects in memory that we can
work with. Our database queries (written in SQL) will live within our Ruby code.

## Learning Goals

* Know how to use a SQL script to construct a database
    * Be able to debug SQL syntax errors
* Be able to use queries, written in SQL, in your Ruby code
* Know how a basic ORM (Object-Relational Mapping) system works
* Be able to write SQL queries to solve problems without using Ruby code
    * Be able to use joins instead of Ruby code
    * Be able to use `GROUP BY` and `ORDER BY` instead of Ruby code

## SQL

We'll first construct a series of tables. Write the table definitions
in a SQL script named `import_db.sql`.

* Add a `users` table.
    * Track the `fname` and `lname` attributes.
* Add a `questions` table.
    * Track the `title`, the `body`, and the associated author (a foreign key).
* Add a `question_follows` table.
    * This should support the many-to-many relationship between `questions` and
      `users` (a user can have many questions she is following, and a question
      can have many followers).
    * This is an example of a ***join table***; the rows in `question_follows`
      are used to join `users` to `questions` and vice versa.
* Add a `replies` table.
    * Each reply should contain a reference to the subject question.
    * Each reply should have a reference to its parent reply.
    * Each reply should have a reference to the user who wrote it.
    * Don't forget to keep track of the `body` of a reply.
    * "Top level" replies don't have any parent, but all replies have
      a subject question.
    * It's okay for a column to be **self referential**; a foreign key can point
      to a primary key in the same table.
* Add a `question_likes` table.
    * Users can like a question.
    * Have references to the user and the question in this table

At the top of your `import_db.sql` file, make sure you add the line `PRAGMA
foreign_keys = ON;`. This statement makes sqlite3 actually respect the foreign
key constraints you've added in your `CREATE TABLE` statements. Whenever we have
a foreign key column in a table we want to make sure that the id we provide
actually references a record in the corresponding table. If you plan on putting
`DROP TABLE` statements at the top of your `import_db.sql` file, you need to
make sure you're dropping the tables in the right order. If you drop a table
that is referenced by a foreign key in another table, you will get an error
telling you that you've violated the foreign key constraint.

You will probably also want to write some `INSERT` statements at the bottom of
your `import_db.sql` file so that you have some data in each table to play
with. We call this '*seeding the database*'.

After you've written the SQL file, don't forget to run the SQL commands and
create the db - in terminal, run:

```sh
cat import_db.sql | sqlite3 questions.db
```

Now go into your shiny, new sqlite database and try making some basic queries to
ensure that seeding proceeded as planned. Use `sqlite3 questions.db` to open the
sqlite3 console with *questions.db* loaded.

**NB** Running `.headers on` and `.mode column` will greatly enhance the
readability of the outputs:

```sql
sqlite> SELECT * FROM questions;
1|Ned Question|NED NED NED|1
2|Kush Question|KUSH KUSH KUSH|2
3|Earl Question|MEOW MEOW MEOW|3
sqlite> .headers on
sqlite> .mode column
sqlite> SELECT * FROM questions;
id          title         body         author_id
----------  ------------  -----------  ----------
1           Ned Question  NED NED NED  1
2           Kush Questio  KUSH KUSH K  2
3           Earl Questio  MEOW MEOW M  3
```

## Gemfile

We're going to be using the sqlite3 gem for this project, so we'll
need to create a gemfile to include it. Start by initting bundler:

```bash
bundle init
```

This will create a starter `Gemfile`. Open it up and add a line to
include the `sqlite3` gem:

```ruby
gem 'sqlite3'
```

Finally, run `bundle install` to install `sqlite3`. This gem will now
be available when you run `pry`.

## Ruby

Keep a tab open with the sqlite3 gem's [documentation][sqlite3-docs]. Use these
docs to help you figure out what methods are available and how to use them!

Write a `QuestionsDatabase` class similar to one created in last night's demo:
[PlaysDatabase][plays.rb]. This class should inherit from `SQLite3::Database`;
you will only need one instance. If you use the Singleton module this will be
available through a `QuestionsDatabase::instance` method.

*NB: Remember that a singleton is a general programming pattern that describes a
scenario in which you will only have a single instance of a particular class.
Ruby's [Singleton module][ruby-singleton] helps implement this pattern - it
ensures that only one instance of that class is ever created (make sure you use
the `instance` method).*

The `QuestionsDatabase` class will handle the connection to the database, but
when we query the database, we get back a hash of data. That can be a bit ugly
to work with, especially when dealing with multiple tables.

What we'll do to make this easier on ourselves is abstract away the
communication to each of those tables into objects. We'll create a **model**
class for each table that will represent an item from each of the tables and
abstract away the SQL queries. This will give us an object-oriented way to
interact with the database.

*NB: This pattern of abstracting away data storage and manipulation is
a common one and an extremely helpful one. We will become much more
experienced with this pattern as we transition into Rails.*

* Write one class per table. E.g., for the `questions` table we will write a
  `Question` class.
* For each class, add a class method `find_by_id` which will lookup an `id` in
  the table and return an *object* representing that row. For example, our
  `Question::find_by_id` should return an **instance** of our `Question` class,
  **NOT** the data hash returned by the `QuestionsDatabase`! Your `::find_by_id`
  method should contain `Question.new` somewhere.
    * We'll add additional query class methods as needed. For instance, the user
      class will have `User::find_by_name(fname, lname)`.
* Your `initialize` method should take an options hash of attributes and
  construct an object **wrapping** that data. We do this because the DB query
  return value is an array of hashes in exactly this format.
    * E.g., `User.new('fname' => 'Ned', 'lname' => 'Ruggeri', 'is_instructor' =>
      true)` should return a `User` object with those attributes.
* Add attribute accessors to access the instance variables of our new
   classes. These instance variables have now been populated with the
   data from the database.
    * E.g., `User#fname` will return the `fname` of the user object
         that was populated from a row in the `users` database.

Before writing any more code, take some time to make sure what you've done so
far works by jumping into pry. Load the files you want to test and call your new
methods. Check that your queries return the correct results and that those
results are Ruby objects.

[sqlite3-docs]: http://www.rubydoc.info/github/luislavena/sqlite3-ruby/SQLite3/Database
[plays.rb]: https://assets.aaonline.io/fullstack/sql/homeworks/plays/plays.rb
[ruby-singleton]: http://www.ruby-doc.org/stdlib-1.9.3/libdoc/singleton/rdoc/Singleton.html


## Queries

Each query method should return *objects* of the appropriate type. For instance,
`user.authored_questions` should return an `Array` of `Question` objects.

### Easy

None of these involve joins.

* `Question::find_by_author_id(author_id)`
* `Reply::find_by_user_id(user_id)`
* `Reply::find_by_question_id(question_id)`
    * All replies to the question at any depth.
* `User::find_by_name(fname, lname)`
* `User#authored_questions` (use `Question::find_by_author_id`)
* `User#authored_replies` (use `Reply::find_by_user_id`)
* `Question#author`
* `Question#replies` (use `Reply::find_by_question_id`)
* `Reply#author`
* `Reply#question`
* `Reply#parent_reply`
* `Reply#child_replies`
    * Only do child replies one-deep; don't find grandchild comments.

Test out your newly written queries in the console. Don't move on until you have
everything working.

### Medium

All of these involve joins. Refer back to the [joins reading][joins-reading]
to clarify your understanding of joins.

* `QuestionFollow::followers_for_question_id(question_id)`
    * This will return an array of `User` objects.
* `QuestionFollow::followed_questions_for_user_id(user_id)`
    * Returns an array of `Question` objects.
* `User#followed_questions`
    * One-liner calling `QuestionFollow` method.
* `Question#followers`
    * One-liner calling `QuestionFollow` method.

Again, test your queries in the console before moving on.

[joins-reading]: https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/

### Hard

These involve `GROUP BY` and `ORDER`. **Use `JOIN`s to solve these; do
not use Ruby iteration methods**.

* `QuestionFollow::most_followed_questions(n)`
    * Fetches the `n` most followed questions.
* `Question::most_followed(n)`
    * Simple call to `QuestionFollow`

If you haven't already, add a `QuestionLike` class to use your join table
`question_likes`.  Some easy queries:

* `QuestionLike::likers_for_question_id(question_id)`
* `QuestionLike::num_likes_for_question_id(question_id)`
    * Don't just use `QuestionLike::likers_for_question_id` and count; use a SQL
      query to do this.
    * Computing this result using a SQL query is more efficient since the DB
      will return just the number and not the data for each of the likes.
* `QuestionLike::liked_questions_for_user_id(user_id)`

These instance methods are one-liners with the above:

* `Question#likers`
* `Question#num_likes`
* `User#liked_questions`

And some harder queries with likes:

* `QuestionLike::most_liked_questions(n)`
* `Question::most_liked(n)`
    * Fetches `n` most liked questions.
* `User#average_karma`
    * Average number of likes for a `User`'s questions.

`#average_karma` is pretty tough. **Here are some hints:**

First, write a single query that returns two things: 1) the number of questions
asked by a user and 2) the number of likes on those questions.

* I used a `LEFT OUTER JOIN` to combine the `questions` and `question_likes`
  table.
    * You need `questions` so you can filter by the author, and you need
      `question_likes` so you can count the number of likes.
* I used a `COUNT(DISTINCT(...))` to count the number of questions.
    * Note that a question that is liked multiple times will be repeated in the
      joined table.
* I used a `COUNT(column)` to count the number of non-`NULL` entries in a
  column.
    * Note that a question that is never liked will take up one row in the
      joined table. How do we use `COUNT(column)` to not count this toward the
      total number of likes?

Next, divide the number of likes by the number of questions. Because `COUNT`
returns an integer, and because integer division rounds down (`3 / 2 == 1`),
we need to `CAST` one of the numbers to `FLOAT`. We can do this like so:
`CAST(value AS FLOAT)`.

Test your queries before moving on to the next phase.

## Updating/saving records

So far we haven't created any new records; we've only been parsing data fetched
from the database and performing queries.

Let's see how to create a new object. Let's add a `#save` method to our models
(`User`, `Question`, and `Reply` are enough to get the point). If the model has
not been saved (i.e., its `id` attribute is `nil`), we should perform an
`INSERT` of the record's fields into the DB. After the insert, we can use
`SQLite3::Database#last_insert_row_id` to get the newly issued `id` for the
inserted row. Save this in an `@id` instance variable in your object. Future
calls to `#save` on this object should issue an `UPDATE`.

If a model already exists in the DB, it should have a non-nil `id` attribute.
Calls to `#save` should issue an `UPDATE` SQL command for the row with the
object's id. Update all the columns with the current version of the values in
your object.

A user should be able to get and set the attributes on the object you hand
them through reader and writer methods (`attr_accessor`).

## Bonus I

### ModelBase class

So you've probably noticed that these classes share a lot of functionality.
Let's extract some common methods into a superclass. Easy stuff first, let's
take `::find_by_id` out of the individual classes and put it into our
superclass. Let's also add a `::all` method while we're at it.

Now for the fun part. Your `#save` method is very similar in each model. Let's
refactor that into the base class as well.

Hint: you can use the `Object#instance_variables` method to get a list of
instance variable names that represent columns.

For the purposes of this project, it's necessary to interpolate the name of the
table directly into your SQL queries (i.e., `#{table}` instead of `?`).

ActiveSupport (part of Rails) has an inflector library that adds methods to 
`String` to help you do this. In particular, look at the `String#tableize` 
method. You can require the inflector with `require 'active_support/inflector'`.

The sqlite3 gem does not support the `?` interpolation for table names. In this
case, we don't need to worry about SQL injection on table names but still need
to sanitize our `WHERE` values. How are these interpolated values different? Why
is one safe while the other is not?

### where

Add a class method `where` which accepts an options hash as an argument and
searches the database for records whose column matches the options key and whose
value matches the options value. It should return all the records which match
the criteria:

```ruby
Question.where({author_id: 2})
User.where({fname: "Tywin", lname: "Lannister"})
```
Add this to your base class.

### find_by

Implement a flexible `find_by` which allows users to find records with any
number of arguments. Let's see an example:

```ruby
User.find_by(lname: "Oberyn", fname: "Martell")
Question.find_by(title: "Who is Jon Snow's mother?")
Reply.find_by(question_id: 3, author_id: 1)
```

### Improve your `where`

Allow `where` to accept a string fragment as well. The string fragment will be
used to define the `WHERE` statement directly in the SQL query:

```ruby
User.where("lname = 'Stark'")
Question.where("title LIKE '%Who%' AND title LIKE '%Arstan Whitebeard%'")
```

### Write specs for your queries

Go back and write specs for your queries using your RSpec knowledge from before.

Apart from testing that your queries return the correct information, also test
that they hit the database the correct number of times. Test that methods
call queries written in other classes as well.

Then write tests for your `save` and `update` methods. Think of a way to reset
the database after specs are run to ensure that your test data doesn't persist
to the database.

## Bonus II

Go through all of [SQLZoo][sql-zoo] again.

[sql-zoo]: https://sqlzoo.net/
