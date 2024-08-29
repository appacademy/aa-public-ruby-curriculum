# Polymorphism and Concerns

Today you'll make an app that gives toys to cute animals. You'll start with
corgis and cats. The skeleton--available from the `Download Project` button
below--already has `Corgi` and `Cat` models. Here's the schema:

**Corgis**

|  column name |  data type  |  details                |
| :----------- | :---------- | :---------------------- |
|  id          |  integer    |  not null, primary key  |
|  name        |  string     |  not null               |

**Cats**

|  column name |  data type  |  details               |
| :----------- | :---------- | :--------------------- |
|  id          |  integer    |  not null, primary key |
|  name        |  string     |  not null              |

## Phase 1: Create a `toys` table

First create a migration that implements the following schema:

**Toys**

|  column name  |  data type  |  details               |
| :------------ | :---------- | :--------------------- |
|  id           |  integer    | not null, primary key  |
|  name         |  string     | not null, indexed, unique with respect to \[toyable_type, toyable_id] |
|  toyable_type |  string     | not null, indexed with toyable_id |
|  toyable_id   |  bigint     | not null |

Use the `references` column type with a `polymorphic: true` modifier to generate
the last two columns:

```ruby
t.references :toyable, polymorphic: true, null: false
```

(You can generate the line above from the command line with
`toyable:references{polymorphic}`.)

> Note: Since a polymorphic `_id` column can refer to more than one table, it
> cannot have a foreign key constraint.

To ensure that all toys are unique by their `name`, `toyable_id`, and
`toyable_type` properties, add the following composite index to the migration:

```ruby
add_index :toys, [:name, :toyable_id, :toyable_type], unique: true
```

This will assure that each cute animal can have a (single) toy named, e.g.,
"ball", but no cute animal can have more than one toy with the same name.

When you have finished setting up your migration, run `rails db:migrate`.

## Phase 2: Create polymorphic associations

The purpose of a polymorphic association is to allow one model to belong to
multiple models on a single association. Using as little code as possible, you
want to give a `toys` association to `Corgi`s, `Cat`s, and whatever other cute
animals you choose.

First, create a `Toy` model and build a polymorphic `belongs_to` association on
`toyable`. (If you used the model generator, this will already have been done
for you.) You should also validate a `Toy`'s `uniqueness` constraint on `:name`
and `:toyable` (`toyable_type` and `toyable_id` in the database). Refer to the
Rails guides for help with [polymorphic syntax] and [scoped `uniqueness`
checks].

Next, build corresponding `has_many` associations in the `Corgi` and `Cat`
models. These should both be named `toys`.

Add some `Toy`s to the seed file and run `rails db:seed`. Check that your
associations work as expected.

[polymorphic syntax]: http://guides.rubyonrails.org/association_basics.html#polymorphic-associations
[scoped `uniqueness` checks]: http://guides.rubyonrails.org/active_record_validations.html#uniqueness

## Phase 2: Create a Toyable Concern

What if you want to give more toys to more cute animals? You'd want each new
class to have a `#receive_toy(name)` method and a `toys` association. Sounds
like a perfect opportunity to use a concern!

A concern (see the reading for more details) is just a [module][module] that
extends `ActiveSupport::Concern`. Like other modules, a concern permits shared
functionality across classes.

Create a file called __toyable.rb__ in the __app/models/concerns__ directory.
Paste the following into your file:

```ruby
module Toyable
  extend ActiveSupport::Concern

  included do

  end

  def receive_toy(name)

  end
end
```

Write the code for the `toys` association within the `included` block. Whenever
the module is included in a class, all code inside this block is executed
within the context of the class that includes it.

Next write a `#receive_toy(name)` method. Any animal instance whose class
includes the `Toyable` concern can call this method. This method should first
find or create a toy whose name matches the argument. Next it should add this
toy to `self`'s `toys`. For both steps, you may wish to use the Active Record
`#find_or_create_by` [method].

After you've created your `Toyable` concern, go back to your `Corgi` and `Cat`
models and `include` your new `Toyable` concern. You can delete the associations
you wrote previously.

Test your code and call it a night!

[module]: https://ruby-doc.com/docs/ProgrammingRuby/html/tut_modules.html
[method]: https://api.rubyonrails.org/classes/ActiveRecord/Relation.html#method-i-find_or_create_by