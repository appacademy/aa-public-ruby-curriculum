# Migrations

We've discussed SQL databases, so we know that programs can store and
pull out data from them. Data fetched from the DB can then be used to
populate the attributes of Ruby objects.

As a program is written, the structure of the database will evolve. We
would like some way to track the evolution of the database schema, so
that this is tracked along with our code in our git repository.

Additionally, because we develop our app on our own machine, with our
own local development database, but later deploy our application to a
server running a production database, we need a way to record the
transformations we've made locally, so that they may be "played back"
and performed on the server database when we deploy our code.

Database *migrations* are a solution to these problems. A migration is
a file containing Ruby code that describes a set of changes applied to
the database. It may create or drop tables; it may add or remove
columns from a table. Each new set of changes is written inside a new
migration file, which is checked into the repository. Active Record
will take responsibility for performing the necessary migrations when
you ask it.

In this reading, you will learn

* How to generate a migration
* Which methods to use when writing migrations
* How to perform migrations
* How migrations relate to __schema.rb__

## Basics

Let's show a first migration. A migration is a Ruby class that extends
`ActiveRecord::Migration`. The parent class takes care of the behind-the-scenes
work, you are responsible only for describing your change in the `up/down`
methods.

```ruby
class CreateProducts < ActiveRecord::Migration[7.0]
  def up
    create_table :products do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end

  def down
    drop_table :products
  end
end
```

This migration adds a table called `products` with a string column called `name`
(this will mean a `VARCHAR(255)`; the length can be specified as an option) and
a `TEXT` column called `description`. A primary key column called `id` will also
be added; this is the default, you do not need to explicitly specify it. The
timestamp columns `created_at` and `updated_at`, which Active Record populates
automatically, will also be added because of `t.timestamps` (more later!).

You also define how to undo the migration in `down`: you drop the table. We'll
talk about why you might want to roll back a migration later.

### Using the `change` method

It is often unnecessary to write the `down` method; the opposite of
adding a column is always to drop the column; the opposite of creating
a table is to drop the table.

Rails makes migrations smarter by providing a `change` method. This method is
preferred for writing constructive migrations (i.e., when adding columns or
tables). The migration knows how to migrate your database and reverse it when
the migration is rolled back without the need to write a separate `down` method.

```ruby
class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
```

The default `up` and `down` methods will use the `change` method to know what to
do (`up` will run the `change` code; `down` will reverse it).

This won't help for migrations which remove a column:

```ruby
class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    remove_column :products, :description
  end
end
```

You can still run `up`, but running `down`, the migration won't know how to add
back the `description` column; it hasn't recorded the type of this column, so it
doesn't know what kind of column to restore. If you try to roll back this
migration, Active Record will yell at you.

## Generating migrations

To create a new migration named `AddPartNumberToProducts` you run the
command:

```shell
rails generate migration AddPartNumberToProducts
```

This will create an empty but appropriately named migration:

```ruby
class AddPartNumberToProducts < ActiveRecord::Migration[7.0]
  def change
  end
end
```

Migrations are stored as files in the `db/migrate` directory, one for each
migration class. The name of the file is of the form
__YYYYMMDDHHMMSS_create_products.rb__: the first part is a UTC timestamp
followed by an underscore followed by the name of the migration. The name of the
migration class (CamelCased version) should match the latter part of the file
name; otherwise Active Record will be confused. For example
__20080906120000_create_products.rb__ should define class `CreateProducts` and
__20080906120001_add_details_to_products.rb__ should define
`AddDetailsToProducts`.

Now that you've created your migration, you will be able to edit it and add code
that actually performs the actions you desire.

## Writing a migration

Inside your `up/down` or `change` methods, you may call methods of the parent
class `ActiveRecord::Migration[7.0]`. Here we go through some of the most
common.

### Creating tables

The migration method `create_table` will be one of your workhorses. A typical
use would be:

```ruby
create_table :products do |t|
  t.string :name
  t.float :price

  t.timestamps
end
```

which creates a `products` table with columns called `name` and `price`. It will
also add the `id` column (as discussed above) and also timestamps.

The object yielded to the block allows you to create columns on the table. The
migration calls a method like `string` or `integer` on the table to create a
column of that type. You then pass a symbol which supplies the name. In general,
the format is

```ruby
  t.data_type :column_name, { option1: :option_value, option2: :option_value }
```

Supported column types include:

* `:boolean`
* `:bigint`
* `:date`
* `:datetime`
* `:float`
* `:integer`
* `:string`
* `:text`
* `:time`

### Changing tables

After you create a table, you may wish to modify it. Here are some of the most
common methods:

* `add_column :table_name, :column_name, :type, options_hash`
* `remove_column :table_name, :column_name`
* `rename_column :table_name, :old_column_name, :new_column_name`
* `rename_table :old_table_name, :new_table_name`
* `add_index :table_name, [:column1, :column2], options_hash`
* `change_column :table_name, :column_name, :type, options_hash`; you can:  
    1. Change the data type of a column
    2. Add the option `null: false` to add a `NOT NULL` constraint
    3. Add the option `default: value` to specify a default value

For example, to add `user_id` to the `applications` table:

```ruby
def change
  add_column :applications, :user_id, :integer
end
```

Active Record will be able to reverse many of these commands. If in a migration
you only use reversible commands, you need only write a change method. However,
if you use `remove_column` or `change_column`, Active Record will not be sure
how to reverse this without your help; you need to write `up` and `down` in
these cases.

### Timestamps

Active Record provides some shortcuts for common functionality. It is, for
example, very common to add both the `created_at` and `updated_at` columns, so
Rails provides a method that does exactly that:

```ruby
create_table :products do |t|
  t.timestamps
end
```

The `created_at` and `updated_at` columns will be automagically populated when
you create a record; later, each time you update the row, Rails will update the
`updated_at` attribute, too. This can help you keep track of the evolution of
your data when trying to debug problems later.

Including `t.timestamps` is good practice, so good, in fact, that Rails will
automatically include `t.timestamps` in your generated migrations. The resulting
columns may well be useful later, and it would be a premature optimization to
remove them until necessary.

## Running migrations

To actually perform the migrations you have written but not yet run, use the
command `rails db:migrate`. This will look in the __db/migrate__ directory, find
all unexecuted migrations, and run their `up` or `change` methods in order of
creation time. The database is not actually modified until you run this command.

### What migrations are run?

How does Rails know what migrations to run? It runs all "pending" migrations,
i.e., migration files in __db/migrate__ that have not been previously run. Which
migrations have been run are tracked in the database. Active Record creates a
table, `schema_migrations`, which stores the timestamp of each run migration.
When a migration is run, a row with the migration timestamp is added to
`schema_migrations`. Rails will not run any migration whose timestamp is in
`schema_migrations`.

To see the status of your migrations, use the command `rails db:migrate:status`.

### Don't edit old migrations

Occasionally you will make a mistake when writing a migration. If you have
already run the migration then you cannot just edit the migration and run the
migration again: Rails will think it has already run the migration and so will
do nothing when you run `rails db:migrate`. That's because the timestamp is in
`schema_migrations`.

If you did need to change a migration you might be tempted to try and edit your
old migration in an attempt to make your table look ideal. However, **you should
never, ever edit old migrations**. After you have written a migration and
migrated it, treat that as a permanent part of the historical record of your
schema's evolution.

Here's one reason why. Say you write a migration to create a `users` table; it
contains `username` and `password` information. You push your code, run the
migration and start running your web application.

A few weeks later, you decide that you want to add a new column. If you tried to
edit the previous migration, you would have to first drop your database and then
re-run the migrations. This would involve dropping the `users` table and all of
its data. You could then edit and re-run, but all of your data will be gone!

Even if you only push your code to development ("development" means the git
branch that consists of recent code not yet deployed to the "production",
user-facing application), you will frustrate other developers if you edit old
migrations. Say I run your original `users` migration. You then edit it and push
your code. When I fetch your code, running `rails db:migrate` will not run your
changed migration. Instead, I have to myself reverse the **old** version of the
migration (which I will have to recover; you checked in the edited version...),
then re-run the new version.

The answer is simple in these cases: you should write a new migration that
performs the changes you require. **Edit migrations by creating new migrations
to change your table**.

## Bonus Round!

This information is not essential at this stage, but you should review it.

### The Schema File

Migrations, mighty as they may be, are not the authoritative source for your
database schema. That role falls to __db/schema.rb__, which is essentially one
big migration that Active Record generates. Each time you run a migration,
Active Record will examine the resulting schema of the entire database and dump
this description into __db/schema.rb__ This file is not designed to be edited by
humans, it just represents the current state of the database.

There is no need (and it is error prone) to initialize a new database by
replaying the entire migration history. It is much simpler and faster to just
load into the database a description of the current schema (`rails
db:schema:load`). For this reason, the schema file should be checked into source
control and tracked.

Schema files are also useful if you want a quick look at what attributes an
Active Record object has. This information is not in the model's code and is
frequently spread across several migrations, but the information is nicely
summed up in the schema file. The [annotate] gem automatically adds and updates
comments at the top of each model summarizing the schema if you desire that
functionality.

You shouldn't worry too much about the __schema.rb__ file for quite a while.
Just do one thing: **check in the changes that result from running `rails
db:migrate` whenever you write a new migration**. That will keep it from
cluttering up your git status, and your repo will always have an up-to-date,
authoritative description of the database schema.

### Running arbitrary code

Migrations are not limited to changing the schema. You can run arbitrary code in
your migration. This is helpful to fix bad data in the database or populate new
fields.

```ruby
class AddReceiveNewsletterToUsers < ActiveRecord::Migration[7.0]
  def up
    change_table :users do |t|
      t.boolean :receive_newsletter, default: false
    end
    User.each do |user|
      # sign up existing users for the newsletter
      user.receive_newsletter = true
      user.save!
    end
  end

  def down
    remove_column :users, :receive_newsletter
  end
end
```

This migration adds a `receive_newsletter` column to the `users` table. You want
it to default to `false` for new users, but existing users are considered to
have already opted in, so you can use the User model to set the flag to `true`
for existing users.

## References

* [SchemaStatements API][schema-statements]
* [Rails Migrations Guide][ror-migrations]

[schema-statements]: http://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html
[ror-migrations]: http://guides.rubyonrails.org/migrations.html
[annotate]: https://github.com/ctran/annotate_models
