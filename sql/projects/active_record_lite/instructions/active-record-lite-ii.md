# ActiveRecordLite: Associations

## Learning Goals

* Understand how `belongs_to` and `has_many` work in Rails
* Be able to metaprogram new methods
* Be able to write association methods that use joins (i.e. `has_many_through`)
* Know when to write code in a module versus a new class

## Phase III: `Associatable`

It's time to move into defining `belongs_to` and `has_many`. We're
going to add these methods to an `Associatable` module that we'll
mixin to `SQLObject`.

### Phase IIIa: `AssocOptions`

The first step is to build classes that will store the essential
information needed to define the `belongs_to` and `has_many`
associations:

* `#foreign_key`
* `#class_name`
* `#primary_key`

We will write `BelongsToOptions` and `HasManyOptions` classes. Both
will extend `AssocOptions`. The main responsibility of these classes
is to provide default values for the three important attributes:

```ruby
options = BelongsToOptions.new(:owner)
options.foreign_key # => :owner_id
options.primary_key # => :id
# this is not the class name...
options.class_name # => "Owner"

# override defaults
options = BelongsToOptions.new(:owner, :class_name => "Human")
options.class_name # => "Human"
```

Use the inflector's `String#camelcase`,`String#singularize`,
`String#underscore` to aid you in your quest.

After you have these basic defaults working, write `#model_class`,
which should use `String#constantize` to go from a class name to the
class object. Likewise, write `#table_name` to give the name of the
table:

```ruby
options = BelongsToOptions.new(:owner, :class_name => "Human")
options.model_class # => Human
# should call `Human::table_name`
options.table_name # => "humans"
```

### Phase IIIb: `belongs_to`, `has_many`

Begin writing a `belongs_to` method for `Associatable`. This method
should take in the association name and an options hash. It should
build a `BelongsToOptions` object; save this in a local variable named
`options`.

Within `belongs_to`, call `define_method` to create a new method to
access the association. Within this method:

* Use `send` to get the value of the foreign key.
* Use `model_class` to get the target model class.
* Use `where` to select those models where the `primary_key` column is
  equal to the foreign key value.
* Call first (since there should be only one such item).

Throughout this method definition, use the `options` object so that
defaults are used appropriately.

Do likewise for `has_many`.

## Phase IV: `has_one_through`

This is the last phase! We want to write a `has_one_through` method
that will combine two `belongs_to` associations. For example:

```ruby
class Cat < SQLObject
  belongs_to :human, :foreign_key => :owner_id
  has_one_through :home, :human, :house

  finalize!
end

class Human < SQLObject
  self.table_name = "humans"

  belongs_to :house

  finalize!
end

class House < SQLObject
  finalize!
end

cat.home # => house the cat's owner lives in.
```

Our goal is to generate SQL that looks like this:

```sql
SELECT
  houses.*
FROM
  humans
JOIN
  houses ON humans.house_id = houses.id
WHERE
  humans.id = ?
```

### Phase IVa: storing `AssocOptions`

`has_one_through` is going to need to make a join query that uses and
combines the options (`table_name`, `foreign_key`, `primary_key`) of
the two constituent associations. This requires us to store the
options of a `belongs_to` association so that `has_one_through` can
later reference these to build a query.

Modify your `03_associatiable.rb` file and implement the
`::assoc_options` class method. It lazily-initializes a class instance
variable with a blank hash. Modify your `belongs_to` method to save
the `BelongsToOptions` in the `assoc_options` hash, setting the
options as the value for the key `name`:

```ruby
class Cat < SQLObject
  belongs_to :human, :foreign_key => :owner_id

  finalize!
end

human_options = Cat.assoc_options[:human]
human_options.foreign_key # => :owner_id
human_options.class_name # => "Human"
human_options.primary_key # => :id
```

### Part IVb: writing `has_one_through`

Okay, now that we are saving the `BelongsToOptions`, we can access
them later to build the `has_one_through(name, through_name,
source_name)` query.

As before, use `define_method` to define a method that will fetch the
associated object. To get the necessary options objects:

* Lookup `through_name` in `assoc_options`; call this
  `through_options`.
* Using `through_options.model_class`, lookup `source_name` in
  `assoc_options`; call this `source_options`.
    * Why can we not lookup `source_name` in
      `self.class.assoc_options`?

Once you have these two sets of options, it's time to write the
query. Look at the above sample query to inspire your building of the
query from the constituent association options.

Unlike when you used `where` in the `belongs_to`/`has_many`, you'll
have to `::parse_all` yourself.

### A Common Mistake

There's a common mistake that most people make:

```ruby
module Associatable
  def has_one_through(name, through_name, source_name)
    # "self" is the class
    through_options = self.assoc_options[through_name]
    # no! too early!
    source_options =
      through_options.model_class.assoc_options[source_name]

    define_method(name) do
      # "self" is the instance
      # ...
    end
  end
end
```

Why is this bad? Let's see:

```ruby
class Cat < SQLObject
  belongs_to :human, :foreign_key => :owner_id
  # `Human` class not defined yet!
  has_one_through :home, :human, :house

  finalize!
end

class Human < SQLObject
  # ...
end
```

The problem is that at the time we call `has_one_through` in `Cat`, we
haven't yet defined the `Human` class. But `has_one_through` calls
`through_options.model_class`, which is going to try to call
`"Human".constantize`. This will fail, because `Human` is not defined
yet.

The solution to this problem is to move the fetching of the options
**inside the defined method**. Presumably someone will only call
`cat.house` **after** the declaration of both `Human` and `House`
classes. That means that at the time `#house` is called,
`has_one_through` will be able to constantize `"Human"` and `"House"`
successfully.

## Extension Ideas

* Write `where` so that it is lazy and stackable. Implement a `Relation` class.
* Validation methods/validator class.
* `has_many :through`
    * This should handle both `belongs_to => has_many` and `has_many => belongs_to`.
* Write an `includes` method that does pre-fetching.
* Write a `joins` method.
