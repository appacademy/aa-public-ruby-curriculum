# Better Fixtures With FactoryBot And Faker

To test the functionality of your models, you will first need to create
instances. You could do something like this:

```ruby
# BAD
cat = Cat.create(
  name: 'Fluffy',
  color: 'Dark Brown',
  email: 'meow@meow.com',
  owner_id: 1,
  active: true,
  temperament: 'mild'
)
# ... test stuff about the cat object
```

However, you want to avoid having all of that clutter in your test code each
time you need to work with a cat for testing purposes. One solution to this
problem is Rails's built-in fixtures, but they have [some
downsides][factories-bad] of their own.

## FactoryBot

The best solution is to use factories. **FactoryBot** is [the top
library][factories-good] for replacing fixtures. It allows you to write:

```ruby
# GOOD
cat = FactoryBot.build(:cat)
```

The cat object will be created using default values for its attributes, which
are defined by a factory like so:

```ruby
# spec/factories/cats.rb

FactoryBot.define do
  factory :cat do # The name matters. A :cat factory returns a Cat object.
    name 'Fluffy'
    color 'Dark Brown'
    email 'meow@meow.com'
    owner_id 1
    active true
    temperament 'mild'
  end
end
```

These default values can be selectively overridden:

```ruby
evil_cat = FactoryBot.build(:cat, temperament: 'malicious')
# evil_cat.temperament => "malicious"
# evil_cat.name => "Fluffy"
```

This allows you to write to-the-point tests:

```ruby
# spec/models/cat_spec.rb

RSpec.describe Cat, type: :model do
  it 'is valid when required attributes are present' do
    expect(FactoryBot.build(:cat)).to be_valid
  end

  context 'is invalid' do
    specify 'when name is blank' do
      expect(FactoryBot.build(:cat, name: '')).not_to be_valid
    end
    # ...
  end
end
```

[factories-bad]:
  https://semaphoreci.com/blog/2014/01/14/rails-testing-antipatterns-fixtures-and-factories.html
[factories-good]:
  https://www.ruby-toolbox.com/categories/rails_fixture_replacement

## Faker

All of your cats will be named Fluffy, have the same email, color, etc., unless
you individually override these attributes. This homogeneity might be
undesirable. **Faker** gem to the rescue! It generates filler data like names,
phone numbers, and Lorem Ipsum. You can use it to make your factories dynamic
rather than static.

You'll see more examples soon, but, first, let's get set up.

## Setting up FactoryBot and Faker

You can set up FactoryBot and Faker in just three steps:

1. Set up RSpec for your Rails application (see the "RSpec and Rails Setup"
   reading).
2. In the **Gemfile**, add `gem 'factory_bot_rails'` and `gem 'faker'` under
   `group :development, :test`:

  ```ruby
  # Gemfile
  group :development, :test do
    gem 'factory_bot_rails'
    gem 'faker'
  end
  ```

  (If you only want to use Faker in testing--and **NOT**, e.g., in your
  __seeds.rb__ file--then you can just include it under `group :test` instead.)

3. Run `bundle install` to install the `faker` and `factory_bot_rails` gems.

Finally, if you don't want to prefix each FactoryBot method call with
`FactoryBot`, add `config.include FactoryBot::Syntax::Methods` in your
__rails_helper.rb__ file:

```ruby
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
```

Then you can call, e.g., `build(:user)` instead of `FactoryBot.build(:user)` in
your specs.

## Using FactoryBot and Faker

In this section, you will learn how to use FactoryBot and Faker.

### Setting up Factories

To use FactoryBot with RSpec, define each factory in a separate file inside the
__spec/factories__ directory. If you have set up RSpec, the model generator will
automatically create a factory spec file __<pluralized_model_name>.rb__ for the
generated model (e.g., __spec/factories/users.rb__). Otherwise, create your own
file with a similarly formatted name.

Suppose you have a `Post` model with `title`, `subtitle`, `random_num`, and
`published` attributes. When defining attributes on a factory, you must pass
the attribute's value in a block so that each attribute will be generated
dynamically. (For the reason FactoryBot takes this approach, see
[here][deprecating-static-attributes].)

A typical factory setup would accordingly look like this:

```ruby
# spec/factories/posts.rb

FactoryBot.define do
  factory :post do # Again, the name matters. A :post factory returns a Post object.
    title { 'It\'s a title!' } # Enclose all attribute values inside blocks
    subtitle { '~also has a subtitle~' }
    random_num { 1 + rand(100) }

    # Child of :post factory since it's nested in the `factory :post` block
    # :published_post inherits the preceding attributes from :post
    factory :published_post do
      published { true }
    end
  end
end
```

The above code would enable you to create published posts like this:

```rb
published_post = FactoryBot.build(:published_post)
published_post.title # => "It's a title!"
published_post.published # => true
```

Note that, in the above code, `published` is not defined on `:post`.
`FactoryBot.build(:post).published` will therefore be `nil`.

For more information on FactoryBot, see the [docs].

[deprecating-static-attributes]: https://thoughtbot.com/blog/deprecating-static-attributes-in-factory_bot-4-11
[docs]: https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md

### Using Faker

The `faker` gem is a module of methods that generate randomized fake data in
specific formats. It can generate names, addresses, phone numbers, business and
product names, and more. Some quick examples:

```ruby
[1] pry(main)> require 'faker'
=> true

[2] pry(main)> Faker::Commerce.product_name
=> "Ergonomic Steel Shoes"

[3] pry(main)> Faker::Internet.domain_name
=> "haley.org"

[4] pry(main)> Faker::Name.name
=> "Neal Deckow"
```

The [`faker` documentation][faker-docs] has details about all the data types
available.

[faker-docs]: https://www.rubydoc.info/gems/faker

### Testing model validations

Start with the most basic factory to satisfy your model validations. In other
words, if you have no required attributes for `cat`, then your factory could
look like this:

```ruby
# spec/factories/cats.rb

FactoryBot.define do
  factory :cat do
  end
end
```

And your test could look like this:

```ruby
#spec/cat_spec.rb

require 'rails_helper'

RSpec.describe Cat, type: :model do
  it 'has no required attributes' do
    expect(FactoryBot.build(:cat)).to be_valid
  end
end
```

What if your model has many specific validations and required attributes?
Consider this case:

```ruby
# app/models/cat.rb

class Cat < ApplicationRecord
  validates :name, presence: true, format: { with:  /\A[a-zA-Z\s\.]+\z/,
    message: 'only allows letters and spaces' }, length: { minimum: 3 },
    uniqueness: true
  validates :color, presence: true, inclusion: { in: %w(red blue green yellow brown black white orange),
    message: "%{value} is not a valid color for a cat." }
  validates :age, presence: true, numericality: { only_integer: true,
    less_than: 100, message: 'Cat age must be a number below 100.' }
  validates :temperament, presence: true, exclusion: { in: %w(evil mean),
    message: 'No bad cats allowed!' }
end
```

In this case, you need to explicitly create attributes in the factory which
satisfy the validations, like this:

```ruby
# spec/factories/cats.rb

FactoryBot.define do
  factory :cat do
    name 'Garfield'
    color 'orange'
    age 53
    temperament 'sarcastic'
  end
end
```

#### Overwriting attributes in your test

A valid model factory can easily be overwritten to test invalid instances of the
model:

```ruby
# spec/models/cat_spec.rb

# ...
it 'must have a name' do
  expect(FactoryBot.build(:cat, name: nil)).not_to be_valid
end
# ...
```

Passing in a hash of attributes and values for the second argument of
`FactoryBot#build`, `FactoryBot#create`, and similar methods will overwrite
those attributes for the model.

```ruby
# spec/models/cat_spec.rb

require 'rails_helper'

# fully testing the name validations
RSpec.describe Cat, type: :model do
  context 'when name is invalid' do
    it 'should require a name' do
      expect(FactoryBot.build(:cat, name: '')).not_to be_valid
    end

    it 'should only accept letters and spaces in name' do
      expect(FactoryBot.build(:cat, name: '1337-H4x0r')).not_to be_valid
    end

    it 'should require a name longer than 2 letters' do
      expect(FactoryBot.build(:cat, name: "Bo")).not_to be_valid
    end
  end
 # ... (more validation tests would follow)
end
```

### Generating many randomly populated instances of a model

If you want to generate a large batch of test data, you most likely want
different attributes for each entry (rather than having 100 users with the name
'John Doe').

To generate random names for your test users, you must pass a block that
generates a random name string. This is where Faker comes in handy:

```ruby
# spec/factories/puppies.rb

FactoryBot.define do
  factory :puppy do
    name { Faker::Name.name }
  end
end
```

You can even ensure that the random names will be unique by passing
`Faker::Name.unique.name` inside the block instead. (For more on generating
unique values with Faker, see [here][unique].)

In the RSpec test, you can now [generate or build multiple
records][mult-records].

[unique]: https://github.com/faker-ruby/faker#ensuring-unique-values
[mult-records]:
  https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md#building-or-creating-multiple-records

### Models with associations

Using a sequence is an easy way to generate associated models with unique
values because sequences give you an iterator.

Example: Creating a cat with an associated hat.

(This assumes you have already set up the __hat.rb__ model file, the
`create_hats...` table migration, and the one-to-one association between cats
and hats.)

```ruby
# spec/factories/cats.rb

FactoryBot.define do
  factory :cat do
    sequence :hat do |n|
      FactoryBot.build(:hat, hat_name: "top-hat #{n}")
    end
  end
end
```

This example also uses FactoryBot [sequences][seqs] to add an iterator.

You can test the association in this case by calling `#hat` on the generated
cat:

```ruby
# spec/cat_spec.rb

RSpec.describe Cat, type: :model do
  # ...
  it 'may wear a hat' do
     expect(FactoryBot.build(:cat).hat).to be_instance_of(Hat)
  end
end
```

[seqs]:
  https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md#sequences

### `FactoryBot.build` vs. `FactoryBot.create`

`FactoryBot.build(:factory_name)` returns an object that is not written to the
database. `FactoryBot.create(:factory_name)` will write the created record to
the database; it is therefore slower than `build`. Prefer `build` unless you
have a need to write to the database.
