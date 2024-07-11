# Introduction To Rails

```ruby
class CreateFriends < ActiveRecord::Migration[7.0]
  def change
    create_table :friends do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
```

<quiz>
  <question>
  <p>The above migration is:</p>
    <answer>Creating a Friend model</answer>
    <answer>Creating a model's validations</answer>
    <answer correct>Creating a friends table</answer>
    <answer>Creating a new Rails project</answer>
    <explanation>The `create_table` block will create the specified `friends` table.</explanation>
  </question>
</quiz>

```ruby
class Dog < ApplicationRecord
  belongs_to :owner,
    class_name: :Person,
    foreign_key: :owner_id,
    primary_key: :id
end
```

<quiz>
  <question>
  <p>What class is the Dog class associated with?</p>
    <answer correct>Person</answer>
    <answer>`owner_id`</answer>
    <answer>Owner</answer>
    <answer>`.owner`</answer>
    <explanation>The `class_name` will always point to the name of the model that will be returned by that association.</explanation>
  </question>
</quiz>

<quiz>
  <question>
  <p>What is the difference between `belongs_to` and `has_one`?</p>
    <answer correct>The model that `belongs_to` the other model has a column holding the other model's `id`s</answer>
    <answer>The model that `has_one` of the other model has a column holding the other model's `id`s</answer>
    <answer>Both models in both relationships hold each other's `id`s</answer>
    <answer>`belongs_to` implies ownership of; a Car `belongs_to` a Human and not the other way around</answer>
    <explanation>The surefire way to know which model `belongs_to` another is if that model has a column holding the other model's `id`s. If a `Person` has a `cat_id` column then that Person model `belongs_to` a Cat model.</explanation>
  </question>
</quiz>

```ruby
class Newspaper < ApplicationRecord
  has_many :subscribers,
    class_name: :Human,
    foreign_key: :paper_id,
    primary_key: :id
end

class Human < ApplicationRecord
  belongs_to :newspaper,
    class_name: :Newspaper,
    foreign_key: :paper_id,
    primary_key: :id
end

sf_chronicle = Newspaper.create(name: 'sf_chronicle')
aaron_the_human = Human.create(name: 'aaron', newspaper: sf_chronicle)
```

<quiz>
  <question>
  <p>Which of the following would return `aaron_the_human`?</p>
    <answer>`Human.new(name: 'aaron')`</answer>
    <answer>`Newspaper.subscribers`</answer>
    <answer correct>`sf_chronicle.subscribers.find_by(name: 'aaron')`</answer>
    <answer>`aaron_the_human.newspaper`</answer>
    <explanation>You'd want to query the `subscribers` association on the `sf_chronicle` instance to find the particular `Human` you are seeking.</explanation>
  </question>
</quiz>

<quiz>
  <question multiple>
  <p>What do ORMs allow you to do? Select all that apply.</p>
    <answer correct>ORMs allow you to create instances of classes using information from a database</answer>
    <answer correct>ORMs allow you to use OOP techniques to handle your information</answer>
    <answer correct>ORMs allow you to persist state to a database</answer>
    <explanation>ORMs are so helpful!</explanation>
  </question>
</quiz>

``` ruby
class LibraryMember < ApplicationRecord
  has_many :book_checkouts,
    class_name: :BookCheckout,
    foreign_key: :library_member_id,
    primary_key: :id

  has_many :books, through: :book_checkouts, source: :book
end

class BookCheckout < ApplicationRecord
  belongs_to :book
    class_name: :Book
    foreign_key: :book_id
    primary_key: :id

  belongs_to :library_member
    class_name: :LibraryMember
    foreign_key: :library_member_id
    primary_key: :id
end

class Book < ApplicationRecord
  has_many :book_checkouts,
    class_name: :BookCheckout,
    foreign_key: :book_id,
    primary_key: :id

  has_many :readers, through: :book_checkouts, source: :library_member
end
```

<quiz>
  <question>
  <p>What is wrong with the above code?</p>
    <answer>Missing parentheses in the `has_many` associations</answer>
    <answer>The associations should use `=>` instead of `:`</answer>
    <answer correct>Missing commas in the `BookCheckout` associations</answer>
    <answer>Book's `readers` association should be called `library_member`</answer>
    <explanation>Those commas will get you! Always be watchful for syntax errors.</explanation>
  </question>
</quiz>
