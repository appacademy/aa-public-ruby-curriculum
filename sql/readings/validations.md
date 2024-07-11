# Validations I: Basics

This guide teaches you how to validate that objects are correctly filled out
before they go into the database. Validations are used to ensure that only valid
data is saved into your database. For example, it may be important to your
application to ensure that every user provides a valid email address and mailing
address. Validations keep garbage data out.

## Validations vs. constraints

An important distinction needs to be made at this point. Rails _validations_
are **not** the same as database _constraints_, although they are conceptually
similar. Both try to ensure data integrity and consistency, but **validations**
operate in your Ruby code, while **constraints** operate in the database. So the
basic rule is:

* **Validations** are defined inside **models**.
* **Constraints** are defined inside **migrations**.

### Use constraints

You've seen how to write some database constraints in SQL (`NOT NULL`, `FOREIGN
KEY`, `UNIQUE INDEX`). These are enforced by the database and are very strong.
Not only will they keep bugs in your Rails app from putting bad data into the
database, they'll also stop bad data coming from other sources (SQL scripts, the
database console, etc). You will frequently use simple DB constraints like these
to ensure data consistency.

However, for complicated validations, DB constraints can be tortuous to write in
SQL. Also, when a DB constraint fails, a generic error is thrown to Rails
(`SQLException`). In general, Rails will not handle errors like these, and a web
user's request will fail with an ugly `500 Internal Server Error`.

### Use validations

For this reason, DB constraints are not appropriate for validating user input.
If a user chooses a previously chosen username, they should not get a 500 error
page; Rails should nicely ask for another name. This is what *model-level
validations* are good at.

Model-level validations live in the Rails world. Because you write them in Ruby,
they are very flexible, database agnostic, and convenient to test, maintain, and
reuse. Rails provides built-in helpers for common validations, making them easy
to add. Many things you can validate in the Rails layer would be very difficult
to enforce at the DB layer.

### Use both!

Often you will use both together. For example, you might use a `NOT NULL`
constraint to guarantee good data while also taking advantage of the user
messaging provided by a corresponding `presence: true` validation.

Perhaps a better example of this would be uniqueness. A `uniqueness: true`
validation is good for displaying useful feedback to users, but it cannot
actually guarantee uniqueness. It operates inside a single server process and
doesn't know what any other servers are doing. Two servers could submit queries
to the DB with conflicting data at the same time and the validation would not
catch it. (This happens **surprisingly often**.) Because a `UNIQUE` constraint
operates in the database and not in the server, it will cause one of those
requests to fail (albeit gracelessly), preserving the integrity of your data.

## When does validation happen?

Whenever you call `save`/`save!` on a model, ActiveRecord will first run the
validations to make sure the data is valid before permanently persisting it to
the DB. If any validations fail, the object will be marked as invalid and
Active Record will not perform the `INSERT` or `UPDATE` operation. This keeps
invalid data from being inserted into the database.

To signal success saving the object, `save` will return `true`; otherwise
`false` is returned. `save!` will instead raise an error if the validations
fail, which is often helpful in development.

## `valid?`

Before saving, Active Record calls the `valid?` method; this is what actually
triggers the validations to run. If any fail, `valid?` returns `false`. Of
course, when `save`/`save!` call `valid?`, they are expecting to get `true`
back. If not, Active Record won't actually perform the SQL `INSERT`/`UPDATE`.

You can also use this method on your own. `valid?` triggers your validations and
returns `true` if no errors were found in the object, `false` otherwise.

```ruby
class Person < ApplicationRecord
  validates :name, presence: true
end

Person.create(name: 'John Doe').valid? # => true
Person.create(name: nil).valid? # => false
```

## `errors.messages`

Okay, so you know an object is invalid, but what exactly is wrong with it? You
can get a Hash of the error messages through the `#errors.messages` method. The
keys are attribute names, the values are arrays of all the errors for each
attribute. If there are no errors on the specified attribute, an empty array is
returned.

(`#errors` returns an instance of `ActiveModel::Errors`. You can access an array
of the error messages for a specific attribute--e.g., `:name`--directly through
`errors` like this: `#errors[:name]`.)

The `errors.messages` method is only useful **after** validations have been run
because it only inspects the errors collection and does not trigger validations
itself. You should always first run `valid?` or `save` or some such method
before trying to access `errors`.

```ruby
# let's see some of the many ways a record may fail to save!

class Person < ApplicationRecord
  validates :name, presence: true
end

>> p = Person.new
#=> #<Person id: nil, name: nil>
>> p.errors.messages
#=> {}

>> p.valid?
#=> false
>> p.errors.messages
#=> {:name=>["can't be blank"]}
>> p.errors.messages[:name]
#=> ["can't be blank"]
>> p.errors[:name]
#=> ["can't be blank"]

>> p = Person.create
#=> #<Person id: nil, name: nil>
>> p.errors.messages
#=> {:name=>["can't be blank"]}

>> p.save
#=> false

>> p.save!
#=> ActiveRecord::RecordInvalid: Validation failed: Name can't be blank

>> Person.create!
#=> ActiveRecord::RecordInvalid: Validation failed: Name can't be blank
```

### `errors.full_messages`

To get an array of human readable messages, call `record.errors.full_messages`.

```rb
>> p = Person.create
#=> #<Person id: nil, name: nil>
>> p.errors.full_messages
#=> ["Name can't be blank"]
```

## Built-in validators

Okay, but how do you actually start telling Active Record what to validate?
Active Record offers many pre-defined validators that you can use directly
inside your class definitions. These helpers provide common validation rules.
Every time a validation fails, an error message is added to the object's
`errors` collection, and this message is associated with the attribute being
validated.

There are many many different validation helpers. This reading will focus on the
most common and important. Refer to the [Rails guides or
documentation][validation-guide] for a comprehensive list.

### `presence`

The most common validator by far, the `presence` helper validates that the
specified attributes are not empty. It uses the `blank?` method to check if the
value is either `nil` or a blank string, that is, a string that is either empty
or consists only of whitespace.

```ruby
class Person < ApplicationRecord
  # must have name, login, and email
  validates :name, :login, :email, presence: true
end
```

This demonstrates your first validation: you call the class method `validates`
on your model class, giving it a list of column names to validate followed by
the validation type mapping to `true`.

The default error message is "can't be empty".

(**N.B.:** You should **not** validate `presence` for `belongs_to` associations.
For more information, see "Warning!" and "Another Warning!" below.)

### uniqueness

This helper validates that the attribute's value is unique:

```ruby
class Account < ApplicationRecord
  # no two Accounts with the same email
  validates :email, uniqueness: true
end
```

There is a very useful `:scope` option that you can use to specify other
attributes that are used to limit the uniqueness check:

```ruby
class Holiday < ApplicationRecord
  # no two Holidays with the same name for a single year
  validates :name, uniqueness: {
    scope: :year,
    message: "'%{value}' should happen once per year"
  }
end
```

Notice how options for the validation can be passed as the value of the hash.

The default error message is "has already been taken".

### Database and model layer validation reference

Validation    |  Database Constraint  |  Model Validation
-----------   |-----------------------|------------------
Present       |  null: false          |  presence: true
All Unique    |  index: { unique: true }                  | uniqueness: true
Scoped Unique |  t.index \[:scoped_to_col, :col\], unique: true | uniqueness: { scope: :scoped_to_col }

### Less common helpers

Presence and uniqueness are super-common. But there are some others that are
often handy. Refer to the [documentation][validation-guide] for all the gory
details:

* `format`
  * Tests whether a string matches a given regular expression
* `length`
  * Tests whether a string or array has an appropriate length. Has
      options for `minimum` and `maximum`.
* `numericality`; options include:
  * `greater_than`/`greater_than_or_equal_to`
  * `less_than`/`less_than_or_equal_to`
* `inclusion`
  * `in` option lets you specify an array of possible values. All other values
    are invalid.

## Warning!

Rails automatically validates the presence of `belongs_to` associations. To
override this default behavior, you have to pass `optional: true` to the
association initialization.

For example, consider the following models:

```ruby
class Home < ApplicationRecord
  has_many :cats,
    primary_key: :id,
    foreign_key: :home_id,
    class_name: :Cat
end

class Cat < ApplicationRecord
  belongs_to :home,
    primary_key: :id,
    foreign_key: :home_id,
    class_name: :Home
end
```

Assume that you want to allow for cats to be without a home (😞). Because
Rails validates the presence of `belongs_to` associations, if you try to `save`
a cat without a home, you'll get a validation error.

```rb
cat = Cat.new
cat.save!
#=> (0.3ms)  BEGIN
# (0.4ms)  ROLLBACK
# ActiveRecord::RecordInvalid: Validation failed: Home must exist
```

In order to allow for homeless cats, you would have to add `optional: true` like
so:

```ruby
class Cat < ApplicationRecord
  belongs_to :home,
    primary_key: :id,
    foreign_key: :home_id,
    class_name: :Home,
    optional: true
end
```

With that, you get the following:

```rb
cat = Cat.new
cat.save!
#=>    (0.3ms)  BEGIN
#  SQL (5.0ms)  INSERT INTO "cats" ("created_at", "updated_at") VALUES ($1, $2) RETURNING "id"  [["created_at", "2017-07-05 20:24:43.182051"], ["updated_at", "2017-07-05 20:24:43.182051"]]
#    (2.6ms)  COMMIT
```

## Another Warning!

Because Rails automatically validates the presence of `belongs_to` associations,
you don't actually want to validate such an association explicitly. (Validating
the presence of a `belongs_to` association checks not only that the foreign key
exists but also that it points to a valid record.) Imagine that you want to have
cats that belong to homes, and the presence of a home for each cat is, in fact,
validated. Imagine you approached that by doing the following:

```ruby
class Home < ApplicationRecord
  has_many :cats,
    primary_key: :id,
    foreign_key: :home_id,
    class_name: :Cat
end

class Cat < ApplicationRecord
  validates :home, presence: true

  belongs_to :home,
    primary_key: :id,
    foreign_key: :home_id,
    class_name: :Home
end
```

This seems like the right way of going about it, but it's not! Remember, Rails
automatically validates the presence of your `belongs_to` associations. By
writing your own validation of `validates :home, presence: true`, you are
actually validating it twice! That might seem harmless enough, but that gives
you errors that you don't want. Notice the resulting errors in the following
example:

```rb
irb(main):001:0> c = Cat.new(name: 'Callie')
=> #<Cat id: nil, name: "Callie", home_id: nil, created_at: nil, updated_at: nil>
irb(main):002:0> c.save!
   (0.1ms)  begin transaction
   (0.1ms)  rollback transaction
ActiveRecord::RecordInvalid: Validation failed: Home can't be blank, Home must exist
```

Notice that you get `Home can't be blank` in addition to `Home must exist`.
What's the problem with that, you ask? Later you might want to display the
errors to the users of your application; displaying both of these error messages
for the same error would likely confuse your users. Because of this, **you
should refrain from explicitly validating your `belongs_to` associations (or the
underlying foreign key, which amounts to the same thing)**.

What you should do instead is:

```ruby
class Home < ApplicationRecord
  has_many :cats,
    primary_key: :id,
    foreign_key: :home_id,
    class_name: :Cat
end

class Cat < ApplicationRecord
  belongs_to :home,
    primary_key: :id,
    foreign_key: :home_id,
    class_name: :Home
end
```

Now when you try to `save` a cat without a home, you get a single, appropriate
error:

```ruby
irb(main):001:0> c = Cat.new(name: 'Callie')
=> #<Cat id: nil, name: "Callie", home_id: nil, created_at: nil, updated_at: nil>
irb(main):002:0> c.save!
   (0.2ms)  begin transaction
   (0.1ms)  rollback transaction
ActiveRecord::RecordInvalid: Validation failed: Home must exist
```

[validation-guide]: https://guides.rubyonrails.org/active_record_validations.html
