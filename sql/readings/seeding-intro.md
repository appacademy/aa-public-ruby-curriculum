# Seeding 101

A seed file makes it easy to load sample data into your database for testing
purposes. In this reading, you will learn the basics of setting up a seed file
in Rails. Later on, you will learn more advanced techniques for mass-producing
seed data.

By the end of this article, you should be able to

* Construct a basic Rails seed file from scratch
* Use normal Active Record methods to create sample data
* Destroy the current data in tables before seeding
* Reset each table's primary key sequence before seeding
* Use a `transaction` to prevent partial changes to the database

## Seeding a Rails database

When you create a Rails project, Rails inserts a __seeds.rb__ file inside the
__db__ directory. All of your seed code will go inside this file.

To create some seed data, simply open __db/seeds.rb__ and use normal Active
Record methods. For example, if your application has `movies` and `actors`
tables that are linked by a `castings` join table, then you might do something
like this:

```rb
m1 = Movie.create!(title: 'Star Wars', yr: 1977)
a1 = Actor.create!(name: 'Harrison Ford')
Casting.create!(movie_id: m1.id, actor_id: a1.id)
```

When the seed file runs--more on that in a minute--the above code will create a
`Star Wars` entry in your `movies` table, a `Harrison Ford` entry in your
`actors` table, and a `Casting` entry that joins the `Harrison Ford` actor entry
with the `Star Wars` movie entry.

The code above could also have used `create`--i.e., without the `!`--but using
`create!` will cause the file to stop loading and give you an explicit error
message if any validations fail. `create!` thus provides you with an easy way to
test validations. It also keeps you from running into the kind of mystery errors
that could result if some of your sample data fails to load. With `create!`, if
your data fails to load, you'll know about it.

Once you have all of your sample data entered into your seed file, you tell
Rails to run the file by typing the following command into your terminal:

```sh
rails db:seed
```

Alternatively, if you have already loaded some sample data into your database
and want to clear all of your tables before loading your seeds afresh--usually a
good idea!--you can run

```sh
rails db:seed:replant
```

That's it! Now you know how to make a basic seed file and load its sample data
into your database.

## Good seeding practices

Here are some additional good practices to keep in mind as you make your seed
file.

### Drop tables first

As mentioned above, you typically want to seed into an empty database. In other
words, you will usually want to clear the tables of any pre-existing data before
filling them with your seed data. (This helps avoid, e.g., failing `unique`
validations when reloading the same seed data.)

There are two main ways to accomplish this:

1. One way is simply to begin the seeding transaction by destroying all the
   tables:

   ```rb
   # db/seeds.rb

   Movie.destroy_all
   Actor.destroy_all
   # Destroy other tables
   # ...
   # Create seed data 
   ```

   This ensures that every time you run `rails db:seed`, it will empty the
   tables before filling them.

2. You could also just run `rails db:seed:replant`, which will empty the
   necessary tables behind the scenes before it loads your seed data. If you use
   `replant`, then you don't need to have the `destroy_all`s at the beginning of
   your seed file. (Even if you have the `destroy_all`s in your seed file, you
   can still run `replant`. It will not cause any issues other than a slightly
   extended execution time.)

### Reset the primary key sequence

When you destroy your tables and reseed the database--using either
`destroy_all`s or `replant`--this will not reset the primary key sequence for
the tables. For instance, if you initially seeded 5 `User`s into the `users`
table of your database, they would be assigned `id`s (i.e., their primary key)
from 1-5. If you then destroy the tables and reseed those 5 `User`s, they would
be assigned `id`s from 6-10.

For testing and debugging purposes, it is often helpful to have consistent `id`s
assigned every time you seed the database. You can accomplish this by resetting
the primary key sequence on each table before loading the new seed data. For
PostgreSQL, you can accomplish this by using
`ApplicationRecord.connection.reset_pk_sequence!(<table_name>)`:

```rb
# db/seeds.rb

# Destroy tables (if desired)
# ...
%w(actors movies castings).each do |table_name|
  ApplicationRecord.connection.reset_pk_sequence!(table_name)
end
# ...
# Create seed data
```

### Wrap all of your seeding code in a `transaction`

It is always a good practice to wrap related database operations--such as
everything you need to do to seed your database--inside a [`transaction`]:

```rb
# db/seeds.rb

ApplicationRecord.transaction do
  # Destroy tables (if desired)
  # Reset primary keys
  # Create seed data
end
```

A `transaction` treats the enclosed commands as all or nothing. That is to say,
if any part of the `transaction` fails, then nothing will be persisted to the
database: any changes that had already been made to the database at the time of
the failure will be rolled back. This way, when a `transaction` fails, you don't
have to investigate which changes were persisted to the database and which
weren't. While that may not be so crucial for a seed file--you could always just
drop the tables and start again--it will be a helpful pattern to know in other
situations.

### Keep it simple

Finally, it is easy to get caught up trying to devise clever seed data and
build out an overly extensive seed file. Remember what this step is for: testing
your code. Don't let this step become a time sink. Create enough entries to test
all your code and move on!

## Sample seed file

Here's an example of a seed file that incorporates all of the above elements:

```rb
# db/seeds.rb

ApplicationRecord.transaction do
  # Destroy tables (not necessary if using `rails db:seed:replant`)
  puts 'Destroying tables...'
  Actor.destroy_all
  Movie.destroy_all
  Casting.destroy_all
  
  # Reset primary keys (i.e., ids) 
  puts 'Resetting id sequences...'
  %w(actors movies castings).each do |table_name|
    ApplicationRecord.connection.reset_pk_sequence!(table_name)
  end

  # Create seed data
  puts 'Creating seed data...'
  m1 = Movie.create!(title: 'Star Wars', yr: 1977)
  a1 = Actor.create!(name: 'Harrison Ford')
  a2 = Actor.create!(name: 'Carrie Fisher')
  Casting.create!(movie_id: m1.id, actor_id: a1.id)
  Casting.create!(movie: m1, actor: a2)

  puts 'Done!'
end
```

## What you've learned

In this reading, you have learned how to construct a basic Rails seed file that
uses normal Active Record methods to load sample data into your database. You
also learned how to destroy the existing tables and reset the primary keys
before loading new seed data. Finally, you learned to prevent partial changes to
the database by wrapping your code in a `transaction`, a pattern that will prove
useful even outside of seeding.
