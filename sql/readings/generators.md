# Generators

Yesterday you learned how to use the Rails migration generator to generate
migration files that set up your database. Rails generators, however, can do
much more work for you. This reading explores some of that additional
functionality. By the end, you should know how to

* Use command-line arguments to pre-fill much of your Rails migrations
* Use a model generator to generate skeleton model files in addition to your
  migrations

## Command line shortcuts

As you know, running `rails generate migration`--which can be abbreviated `rails
g migration`--will create a timestamped migration file inside __db/migrate__.
How you name the migration class on the command line--e.g., whether it starts
with `Create`, `Add`, or `Remove`--affects how Rails will set up the file. So,
for instance, running

```sh
rails g migration CreateUsers
```

will build a migration file to create a new `users` table:

```rb
# db/migrate/20220518134651_create_users.rb

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|

      t.timestamps
    end
  end
end
```

Rails supplies the `timestamps` macro, but the table is otherwise blank, waiting
for you to fill in the various columns with their types, names, and modifiers.
Rails also gives you the option, however, to pre-fill the table from the command
line. After the migration class name, you simply add a list of the desired
column names. Follow each name with a `:` and its type, and separate the columns
with spaces (**no commas!**). So, e.g.,

```sh
rails g migration CreateUsers name:string email:string age:integer
```

will create the following migration file:

```rb
# db/migrate/20220518140141_create_users.rb

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.integer :age

      t.timestamps
    end
  end
end
```

### `index` and `uniq`

You can do even more from the command line. Suppose you want to add an index to
`name` and make `email` unique. You can do that by appending `index` and `uniq`
to the appropriate columns on the command line:

```sh
rails g migration CreateUsers name:string:index email:string:uniq age:integer
```

This command will generate a migration that looks like this:

```rb
# db/migrate/20220518140703_create_users.rb
class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.integer :age

      t.timestamps
    end
    add_index :users, :name
    add_index :users, :email, unique: true
  end
end
```

Nice! Rails not only generates the appropriate columns for you, it also adds the
appropriate indexes, **even indexing the column you specified only as `uniq`**.
(Remember that `unique` constraints require an index.)

### Adding type modifiers

You can also use `{ }`s to pass values for certain type modifiers such as
`limit` (for integer, string, text, and binary types) or, for decimal types,
`precision` (total number of digits) and `scale` (total number of digits after
the decimal):

```sh
rails g migration CreateProducts name:string{10} 'price:decimal{5,2}'
```

> Note: specifying `precision` and `scale` with a comma requires that you wrap
> the whole column in quotation marks. Otherwise, some shells will misinterpret
> the `{ }`s and incorrectly expand the argument before passing it to the Rails
> generator. (The quotation marks essentially escape the `{ }`s.) Alternatively,
> you could use `price:decimal{5.2}` or `price:decimal(5-2)` without quotation
> marks.

This command will produce the following migration:

```rb
# db/migrate/20220518152500_create_products.rb
class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name, limit: 10
      t.decimal :price, precision: 5, scale: 2

      t.timestamps
    end
  end
end
```

Unfortunately, Rails does not allow you to set `null` or `default` from the
command line, so you will always have to add those column modifiers to your
migrations manually.

### Other migrations

These command line options work for other types of migrations, too. For example,

```sh
rails g migration AddAddressToUsers address:string
```

will generate

```rb
# db/migrate/20220518141712_add_address_to_users.rb

class AddAddressToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :address, :string
  end
end
```

### Modifying migrations

You are, of course, free to modify the generated migration files however you
want, just as before. You can add more columns, remove columns, add `null:
false` or other modifiers, specify composite indexes, and so forth. When you are
happy with the migration, just run `rails db:migrate` to migrate the changes to
your database!

## Model generator

Rails provides generators for more than just migrations. (To see a full list,
run `rails g`.) You can even write your own, although doing so goes beyond
the scope of this curriculum.

A common generator that you will often have occasion to use is the _model
generator_. The syntax is similar to the syntax for generating migrations with
two main differences:

1. You specify that you are generating a model instead of a migration
2. You provide the (singular) model name instead of the migration name

So, to create a `User` model just like above, you could run this command:

```sh
rails g model User name:string:index email:string:uniq age:integer
```

which will produce this migration:

```rb
# db/migrate/20220518144601_create_users.rb

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.integer :age

      t.timestamps
    end
    add_index :users, :name
    add_index :users, :email, unique: true
  end
end
```

This file looks exactly like the migration file generated above using `rails g
migration`, so how is this new generator helpful? It is helpful because it tells
Rails that your migration is actually creating a model. This enables Rails to do
a little bit more setup for you!

In addition to creating the migration file, a model generator will also create a
__user.rb__ file in __app/models__ and fill it with a basic model skeleton:

```rb
# app/models/user.rb

class User < ApplicationRecord
end
```

(If your application was not created with the -T flag, then the model generator
will also create appropriate test files inside __test/models__ and
__test/fixtures__.)

For more information on this generator, run `rails g model --help`.

## What you've learned

In this reading you've learned how to use command line arguments with Rails
generators to pre-fill much of your Rails migrations. You also learned how to
generate a skeleton model file automatically by using a model generator.
